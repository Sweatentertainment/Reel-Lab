"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type EarlyAccessFormProps = {
  variant: "light" | "dark";
  className?: string;
  /** Disables submit (e.g. while a request is in flight). */
  disabled?: boolean;
};

function ShimmerSubmitButton({
  children,
  disabled,
}: {
  children: ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={cn(
        "group relative inline-block shrink-0 cursor-pointer rounded-full bg-slate-800 p-px font-semibold text-sm leading-6 text-white no-underline shadow-2xl shadow-zinc-900",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-45",
      )}
    >
      <span className="relative block overflow-hidden rounded-full ring-1 ring-white/10">
        <span className="absolute inset-0 rounded-full bg-zinc-950" aria-hidden />
        <span
          className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 group-disabled:opacity-0"
          style={{
            background:
              "radial-gradient(75% 110% at 50% 0%, rgba(108,92,231,0.55) 0%, rgba(108,92,231,0.18) 42%, transparent 72%)",
          }}
          aria-hidden
        />
        <span
          data-shimmer-content
          className="relative z-10 flex items-center gap-2 px-6 py-2.5"
        >
          <span>{children}</span>
          <svg
            className="shrink-0"
            fill="none"
            height={16}
            viewBox="0 0 24 24"
            width={16}
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="M10.75 8.75L14.25 12L10.75 15.25"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </svg>
        </span>
      </span>
      <span
        className="pointer-events-none absolute bottom-0 left-[1.125rem] z-20 h-px w-[calc(100%-2.25rem)] opacity-0 transition-opacity duration-500 group-hover:opacity-[0.55] group-disabled:opacity-0"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(192, 132, 252, 0.95) 50%, transparent)",
        }}
        aria-hidden
      />
    </button>
  );
}

export function EarlyAccessForm({ variant, className, disabled }: EarlyAccessFormProps) {
  const emailId = useId();
  const dark = variant === "dark";
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (disabled || status === "loading") return;

    const form = e.currentTarget;
    const email = new FormData(form).get("email");
    const emailStr = typeof email === "string" ? email.trim() : "";

    if (!emailStr || !emailStr.includes("@")) {
      setStatus("error");
      setFeedback("Please enter a valid email.");
      return;
    }

    setStatus("loading");
    setFeedback(null);

    try {
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailStr }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        success?: boolean;
        message?: string;
      };

      if (!res.ok) {
        setStatus("error");
        setFeedback(data.error ?? "Something went wrong. Try again.");
        return;
      }

      setStatus("success");
      if (data.message === "already_subscribed") {
        setFeedback("You're already registered. We'll be in touch before launch.");
      } else {
        setFeedback("Thanks — we'll be in touch before launch.");
      }
      form.reset();
    } catch {
      setStatus("error");
      setFeedback("Network error. Check your connection and try again.");
    }
  };

  const busy = status === "loading";
  const locked = disabled || busy;

  if (status === "success") {
    return (
      <div
        className={cn("flex w-full max-w-md items-center gap-3", className)}
        role="status"
        aria-live="polite"
      >
        <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500">
          <svg
            className="size-3 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <span
          className={cn(
            "text-sm",
            dark ? "text-gray-300" : "text-gray-600",
          )}
        >
          {feedback}
        </span>
      </div>
    );
  }

  return (
    <div className={cn("w-full max-w-md", className)}>
      <form
        className="flex w-full flex-col gap-3 sm:flex-row sm:items-center"
        onSubmit={onSubmit}
        noValidate
      >
        <label htmlFor={emailId} className="sr-only">
          Email address
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          required
          disabled={locked}
          placeholder="you@label.com"
          autoComplete="email"
          className={cn(
            "min-h-11 flex-1 rounded-xl border px-4 py-2.5 text-base outline-none transition-[box-shadow,border-color]",
            dark
              ? "border-white/15 bg-white/5 text-white placeholder:text-gray-500 focus:border-purple-400/50 focus:ring-1 focus:ring-purple-400/40 disabled:opacity-50"
              : "border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:border-[#6C5CE7] focus:ring-1 focus:ring-[#6C5CE7]/30 disabled:opacity-50",
          )}
        />
        <ShimmerSubmitButton disabled={locked}>
          {busy ? "Sending…" : "Register Interest"}
        </ShimmerSubmitButton>
      </form>
      {status === "error" && feedback ? (
        <p
          className="mt-2 text-center text-sm text-red-600 sm:text-left"
          role="alert"
        >
          {feedback}
        </p>
      ) : null}
    </div>
  );
}
