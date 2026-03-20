import {
  generatedCharacters,
  type CharacterEntry,
} from "./assets.generated";

export type { CharacterEntry } from "./assets.generated";

/**
 * Site image paths (optimised JPEGs in public/images/).
 * Populated by scripts/optimize-assets.sh from /content (see script for naming rules).
 */
export const siteImages = {
  heroDj: "/images/01_hero_dj.jpg",
  lifestyleSwim: "/images/02_lifestyle_swim.jpg",
  destinationComo: "/images/03_destination_como.jpg",
} as const;

/**
 * Used only when `public/images/characters/` has no JPGs yet (e.g. before first optimise run).
 * After `npm run optimize:assets`, the manifest is rebuilt from disk and replaces this.
 */
const DEV_FALLBACK_CHARACTERS: CharacterEntry[] = [
  { name: "HELM", image: "/images/characters/05_helm_rider.jpg", video: "/videos/characters/vid_05_helm.mp4" },
  { name: "MORI", image: "/images/characters/06_mori_forest.jpg", video: "/videos/characters/vid_06_mori.mp4" },
  { name: "REEF", image: "/images/characters/09_reef_deep_sea.jpg" },
  { name: "STATIC", image: "/images/characters/11_static_tvhead.jpg", video: "/videos/characters/vid_11_static.mp4" },
  { name: "ORCHID", image: "/images/characters/12_orchid_alien.jpg", video: "/videos/characters/vid_12_orchid.mp4" },
  { name: "EMBER", image: "/images/characters/14_ember_fire.jpg", video: "/videos/characters/vid_14_ember.mp4" },
  { name: "POLLEN", image: "/images/characters/19_pollen_mushroom.jpg", video: "/videos/characters/vid_19_pollen.mp4" },
  { name: "HALO", image: "/images/characters/22_halo_angel.jpg", video: "/videos/characters/vid_22_halo.mp4" },
  { name: "KOI", image: "/images/characters/23_koi_water.jpg" },
  { name: "ZEPHYR", image: "/images/characters/25_zephyr_cloud.jpg" },
  { name: "GUMM", image: "/images/characters/26_gumm_gummy.jpg" },
  { name: "BISCUIT", image: "/images/characters/27_biscuit_dog.jpg" },
  { name: "CHOMP", image: "/images/characters/28_chomp_dino.jpg" },
  { name: "DUSTY", image: "/images/characters/29_dusty_bunny.jpg" },
  { name: "RAGDOLL", image: "/images/characters/29_dusty_ragdoll.jpg" },
  { name: "SOCK", image: "/images/characters/30_sock_puppet.jpg" },
  { name: "CLAY", image: "/images/characters/36_clay_sculpture.jpg" },
];

export const characters: CharacterEntry[] =
  generatedCharacters.length > 0 ? generatedCharacters : DEV_FALLBACK_CHARACTERS;

/** Hero icon-cloud roster (names align with `CharacterEntry.name` from manifest). */
export const PREMIUM_CHARACTER_NAMES = [
  "HELM",
  "MORI",
  "REEF",
  "ORCHID",
  "EMBER",
  "POLLEN",
  "HALO",
  "KOI",
  "ZEPHYR",
  "STATIC",
] as const;

export function getPremiumCharacterImages(
  list: CharacterEntry[] = characters,
): string[] {
  return PREMIUM_CHARACTER_NAMES.map((name) => {
    const found = list.find(
      (c) => c.name.trim().toUpperCase().replace(/\s+/g, " ") === name,
    );
    return found?.image;
  }).filter((src): src is string => Boolean(src));
}

/** Mood Network mosaic: only premium roster entries with defined images (avoids broken tiles). */
export function getMoodNetworkMosaicCharacters(
  list: CharacterEntry[] = characters,
): CharacterEntry[] {
  return PREMIUM_CHARACTER_NAMES.map((name) => {
    const found = list.find(
      (c) => c.name.trim().toUpperCase().replace(/\s+/g, " ") === name,
    );
    return found?.image ? found : undefined;
  }).filter((c): c is CharacterEntry => Boolean(c));
}

/** Scrolling gallery: same as manifest (includes salt_flat etc. when present on disk). */
export const charactersForGallery: CharacterEntry[] = characters;

export const charactersWithVideo = characters.filter(
  (c): c is CharacterEntry & { video: string } => Boolean(c.video),
);

export const productDemoGrid = characters.slice(0, 6);

export const productDemoVideoPhones = charactersWithVideo.slice(0, 3);

/** Footer / texture: prefer a strong still, else hero key art. */
export const footerTextureImage =
  characters.find((c) => c.name === "STATIC")?.image ?? siteImages.heroDj;

/** Under-the-hood fan cards */
export const pipelineFanCharacterImage =
  characters.find((c) => c.name === "STATIC")?.image ?? siteImages.heroDj;
