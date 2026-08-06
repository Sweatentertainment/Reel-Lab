# sweat.fm daily ad report — reporting rules

Spec for the internal daily advertising report posted to Slack `#internal-daily-report`
(`C0BBM6VR7RA`) at 03:00 Europe/London by the `sweat.fm daily ad report` Routine.

Data source: Supabase project **sweat.fm** (`kxbmzrbvcwkencdxagct`).

**Target date** = the calendar day before today, Europe/London ("yesterday").

Core tables:

| Table | Role |
| --- | --- |
| `data_advertising_meta_ads_insights` | Daily Meta insights. One row per `snapshot_date` × `level` (`campaign`/`adset`/`ad`) × `object_id`. Metrics live in the `metrics` jsonb. |
| `launchpad_adsets` | Ad sets as launched. `type='test'`, `end_date` = the scheduled test end, written at launch. |
| `launchpad_campaigns` | Parent campaign (`campaign_name`, `artist_id`). |
| `launchpad_assets` | Per-creative test record (`test_status`, `cost_per_result`). |

Joins: `launchpad_adsets.meta_adset_id` → insights `object_id` at `level='adset'`, and
insights `parent_id` at `level='ad'`.

"Results" is the campaign's optimisation result — `metrics->>'content_views'` for
streaming/DSP campaigns, `metrics->>'purchases'` for live/ticketing campaigns.
Cost per result = spend ÷ results. All money is GBP.

---

## 1. Campaigns with no results — minimum spend £2.50

Only report a zero-result campaign if it spent **at least £2.50 on the target date**.
Below that the campaign has barely delivered and the zero is noise, not a problem.

```sql
select i.name,
       round((i.metrics->>'spend')::numeric, 2) as spend
from data_advertising_meta_ads_insights i
where i.level = 'campaign'
  and i.snapshot_date = :target_date
  and coalesce((i.metrics->>'content_views')::numeric, 0) = 0
  and coalesce((i.metrics->>'purchases')::numeric, 0) = 0
  and coalesce((i.metrics->>'spend')::numeric, 0) >= 2.50
order by spend desc;
```

## 2. Scaling campaigns that ended — minimum total spend £250

A campaign qualifies for the "scaling campaigns ended" section when its
`campaign_end_date` is the target date. Only report it if its **lifetime spend is at
least £250**. Test campaigns almost always total less than that, so the threshold keeps
them out of a section that is meant to cover real scaling spend.

Lifetime spend is the sum of daily campaign-level spend across every `snapshot_date` —
the `lifetime_spend` column is not populated.

```sql
with ended as (
  select distinct object_id, name
  from data_advertising_meta_ads_insights
  where level = 'campaign'
    and campaign_end_date = :target_date
)
select e.name,
       round(sum((i.metrics->>'spend')::numeric), 2) as lifetime_spend,
       sum((i.metrics->>'content_views')::numeric)   as results,
       round(sum((i.metrics->>'spend')::numeric)
             / nullif(sum((i.metrics->>'content_views')::numeric), 0), 4) as cost_per_result
from ended e
join data_advertising_meta_ads_insights i
  on i.level = 'campaign' and i.object_id = e.object_id
group by e.name
having sum((i.metrics->>'spend')::numeric) >= 250
order by lifetime_spend desc;
```

## 3. Tests concluded — end date drives inclusion

Report a test **only when its scheduled end date is the target date**. The end date is
written to `launchpad_adsets.end_date` when the test is launched; it is the single source
of truth for when a test concludes.

An ad set or ad is a test when `launchpad_adsets.type = 'test'` or its name contains
"test".

Do **not** use `launchpad_assets.evaluated_at`, `test_status`, or ad-set pause state to
decide whether to report a test. A test can be evaluated as winner/loser days before it
finishes, and a paused ad set may still have days left on the clock — both cause tests to
be reported early. A test ending tonight is reported tomorrow, not today.

Per-day spend and cost per result come from ad-level insights joined on the test ad set:

```sql
with ended_tests as (
  select s.meta_adset_id, s.adset_name, c.campaign_name, c.artist_id
  from launchpad_adsets s
  join launchpad_campaigns c on c.id = s.campaign_id
  where s.end_date = :target_date
    and (s.type = 'test' or s.adset_name ilike '%test%')
)
select t.campaign_name,
       t.adset_name,
       i.snapshot_date,
       round((i.metrics->>'spend')::numeric, 2)      as day_spend,
       (i.metrics->>'content_views')::numeric        as day_results,
       case when coalesce((i.metrics->>'content_views')::numeric, 0) > 0
            then round((i.metrics->>'spend')::numeric
                       / (i.metrics->>'content_views')::numeric, 4) end as day_cost_per_result
from ended_tests t
left join data_advertising_meta_ads_insights i
  on i.level = 'ad' and i.parent_id = t.meta_adset_id
order by t.campaign_name, t.adset_name, i.snapshot_date;
```

Totals per test are summed across the days it ran: `sum(spend) / sum(results)`. A test
that ended without any insight rows spent nothing and is reported as no delivery.

### Worked check — target date 2026-08-05

One test qualified: *Together - 2026 · Test 3 - SPT - Driving Sunset (3:01-3:22 - instr2)*
— £9.80 over three days (30 Jul – 1 Aug), 30 results, £0.3267 cost per result. That
matches the `cost_per_result` stored on the asset.

The six *BOY LOCO — Closer* tests have `end_date = 2026-08-06`, so they belong in the
report published on 7 Aug, not the one published on 6 Aug.

---

## Routine prompt

The Routine `sweat.fm daily ad report` (`trig_01FTdxGu19biRtHJtKavnnV8`, `0 3 * * *`)
fires into a persistent session. Its prompt should read:

> Generate and post the daily sweat.fm advertising report for yesterday (the calendar day
> before today, Europe/London — call this the target date) to Slack #internal-daily-report
> (channel ID C0BBM6VR7RA).
>
> Follow exactly the report structure, formatting, message-splitting and posting order
> established earlier in this conversation (header + troubleshooting message,
> scaling-campaigns-ended message, then one message per artist for concluded tests,
> alphabetical, final message ends with "Keep crushing it! :comet::rocket:").
>
> Data comes from the Supabase project "sweat.fm" (kxbmzrbvcwkencdxagct). Results = the
> campaign's optimisation result metric (metrics->>'content_views' for streaming/DSP
> campaigns, metrics->>'purchases' for live/ticketing campaigns). Cost per result =
> spend ÷ results. All money is GBP.
>
> Apply these rules — they REPLACE any earlier version of the same rule:
>
> 1. CAMPAIGNS WITH NO RESULTS — MINIMUM SPEND £2.50. Only list a zero-result campaign if
>    it spent at least £2.50 on the target date (campaign-level insights, snapshot_date =
>    target date, content_views = 0 and purchases = 0, spend >= 2.50). Anything below
>    £2.50 has barely delivered — skip it silently.
>
> 2. SCALING CAMPAIGNS THAT ENDED — MINIMUM TOTAL SPEND £250. A campaign belongs in this
>    section when its campaign_end_date equals the target date. Only report it if its
>    LIFETIME spend is at least £250 — sum daily campaign-level spend across all
>    snapshot_dates for that object_id (the lifetime_spend column is not populated).
>    Campaigns under £250 are test campaigns; leave them out.
>
> 3. TESTS CONCLUDED — THE END DATE IN launchpad_adsets DECIDES. Report a test only when
>    its scheduled end date IS the target date, i.e. launchpad_adsets.end_date = target
>    date. That end date is written when the test is launched and is the single source of
>    truth. An ad set or ad is a test when launchpad_adsets.type = 'test' or its name
>    contains "test" (case-insensitive).
>    Do NOT use launchpad_assets.evaluated_at, test_status, or ad-set pause/active state to
>    decide whether to report a test — a test can be evaluated winner/loser days before it
>    finishes, and a paused ad set may still have days left on the clock. Both cause tests
>    to be reported early. A test ending tonight is reported in TOMORROW'S report, never
>    today's.
>    For each qualifying test, get per-day spend and cost per result by joining
>    launchpad_adsets.meta_adset_id to data_advertising_meta_ads_insights at level='ad' on
>    parent_id (level='adset' on object_id also works), across every snapshot_date the test
>    ran. Totals per test = sum(spend) ÷ sum(results). A test with no insight rows spent
>    nothing — report it as no delivery.
>
> Post only report content to Slack — no methodology notes. Report any caveats back in
> chat instead.
>
> The full spec, with the canonical SQL for each of the three rules, is committed at
> docs/daily-ad-report-routine.md in the sweatentertainment/reel-lab repo.
