import { NextRequest, NextResponse } from "next/server";

type Palette = {
  name: string;
  colors: [string, string];
  accent: string;
  stroke: string;
};

type BlossomTheme = {
  label: string;
  emoji: string;
  tagline: string;
  promptFragments: string[];
  palettes: Palette[];
  vibes: string[];
};

type StickerPayload = {
  emoji: string;
  label: string;
  tagline: string;
  prompt: string;
  imageDataUrl: string;
  source: "generated";
  seed: number;
  palette: Palette;
  traits: string[];
};

const BLOSSOM_THEMES: BlossomTheme[] = [
  {
    label: "Hope Blossom",
    emoji: "🌸",
    tagline: "Soft petals carrying brave stories",
    promptFragments: [
      "kawaii sticker",
      "single cherry blossom with smiling face",
      "gentle glow",
      "cozy gradients",
    ],
    palettes: [
      {
        name: "Rose Dawn",
        colors: ["#FCE7F3", "#FFE4E6"],
        accent: "#DB2777",
        stroke: "#FDA4AF",
      },
      {
        name: "Petal Glow",
        colors: ["#FDE1EE", "#FBCFE8"],
        accent: "#EC4899",
        stroke: "#F472B6",
      },
    ],
    vibes: ["calm", "bright"],
  },
  {
    label: "Luminous Lotus",
    emoji: "🪷",
    tagline: "She rises so others can rest",
    promptFragments: [
      "pastel lotus flower",
      "sparkling water droplets",
      "subtle halo",
      "studio ghibli sticker style",
    ],
    palettes: [
      {
        name: "Lagoon Mist",
        colors: ["#CCFBF1", "#E0E7FF"],
        accent: "#0F766E",
        stroke: "#5EEAD4",
      },
      {
        name: "Dawn Tide",
        colors: ["#BAE6FD", "#FDE68A"],
        accent: "#0891B2",
        stroke: "#7DD3FC",
      },
    ],
    vibes: ["serene", "calm"],
  },
  {
    label: "Guardian Fern",
    emoji: "🌿",
    tagline: "Tiny leaves, giant courage",
    promptFragments: [
      "hand-drawn fern with heart cutout",
      "playful shading",
      "thick outline",
      "whimsical emoji badge",
    ],
    palettes: [
      {
        name: "Forest Whisper",
        colors: ["#DCFCE7", "#BBF7D0"],
        accent: "#15803D",
        stroke: "#4ADE80",
      },
      {
        name: "Moss Harbor",
        colors: ["#D9F99D", "#A7F3D0"],
        accent: "#166534",
        stroke: "#86EFAC",
      },
    ],
    vibes: ["grounded", "fresh"],
  },
  {
    label: "Radiant Starling",
    emoji: "🌟",
    tagline: "Spark after spark, the sky stays bright",
    promptFragments: [
      "cute star character",
      "glitter trail",
      "gradient core",
      "die-cut sticker",
    ],
    palettes: [
      {
        name: "Solar Flare",
        colors: ["#FEF3C7", "#FDE68A"],
        accent: "#D97706",
        stroke: "#FACC15",
      },
      {
        name: "Gilded Dusk",
        colors: ["#FDE68A", "#FBCFE8"],
        accent: "#B45309",
        stroke: "#FCD34D",
      },
    ],
    vibes: ["celebratory", "bright"],
  },
  {
    label: "Aurora Ribbon",
    emoji: "🌈",
    tagline: "Threads of care across every sky",
    promptFragments: [
      "lively ribbon",
      "soft gradient bands",
      "floating hearts",
      "storybook decal",
    ],
    palettes: [
      {
        name: "Sky Loom",
        colors: ["#C7D2FE", "#FBCFE8"],
        accent: "#7C3AED",
        stroke: "#A5B4FC",
      },
      {
        name: "Polar Sweep",
        colors: ["#A5F3FC", "#CBD5F5"],
        accent: "#0EA5E9",
        stroke: "#93C5FD",
      },
    ],
    vibes: ["uplifting", "bright"],
  },
  {
    label: "Ember Lantern",
    emoji: "🏮",
    tagline: "Warm watchlight for late arrivals",
    promptFragments: [
      "paper lantern",
      "warm ember core",
      "tiny sparkles",
      "protective tassels",
    ],
    palettes: [
      {
        name: "Lantern Glow",
        colors: ["#F87171", "#FDBA74"],
        accent: "#EA580C",
        stroke: "#FB923C",
      },
      {
        name: "Amber Night",
        colors: ["#FED7AA", "#F4A261"],
        accent: "#C2410C",
        stroke: "#F97316",
      },
    ],
    vibes: ["warm", "steady"],
  },
  {
    label: "Harbor Shell",
    emoji: "🐚",
    tagline: "Gentle tide to steady her breath",
    promptFragments: [
      "pastel seashell",
      "tide foam edges",
      "glossy finish",
      "beach glass freckles",
    ],
    palettes: [
      {
        name: "Tide Whisper",
        colors: ["#E0E7FF", "#FFE4E6"],
        accent: "#6366F1",
        stroke: "#A5B4FC",
      },
      {
        name: "Sandbar Glow",
        colors: ["#F5D0FE", "#BFDBFE"],
        accent: "#3B82F6",
        stroke: "#C4B5FD",
      },
    ],
    vibes: ["soothing", "grounded"],
  },
  {
    label: "Kindred Kite",
    emoji: "🪁",
    tagline: "Lift one voice, lift them all",
    promptFragments: [
      "flying kite",
      "embroidered tail",
      "paper texture",
      "cloudlet companions",
    ],
    palettes: [
      {
        name: "Skyline Drift",
        colors: ["#BFDBFE", "#A5F3FC"],
        accent: "#2563EB",
        stroke: "#38BDF8",
      },
      {
        name: "Festival Breeze",
        colors: ["#FDE68A", "#F9A8D4"],
        accent: "#9333EA",
        stroke: "#F472B6",
      },
    ],
    vibes: ["playful", "uplifting"],
  },
  {
    label: "Silver Compass",
    emoji: "🧭",
    tagline: "Guiding light toward shelter doors",
    promptFragments: [
      "vintage compass",
      "soft metallic gleam",
      "guiding spark",
      "inked outline",
    ],
    palettes: [
      {
        name: "Northwind",
        colors: ["#E2E8F0", "#C7D2FE"],
        accent: "#1E3A8A",
        stroke: "#CBD5F5",
      },
      {
        name: "Moonlit Chart",
        colors: ["#F1F5F9", "#E0F2FE"],
        accent: "#0F172A",
        stroke: "#94A3B8",
      },
    ],
    vibes: ["steady", "bright"],
  },
];

const AURA_TRAITS = [
  "starlit shimmer",
  "gentle ember halo",
  "morning dew glow",
  "harbor mist veil",
  "aurora blush",
  "lantern pulse",
  "compass glint",
];

const DETAIL_TRAITS = [
  "hand-stitched outline",
  "tiny heart sparks",
  "constellation freckles",
  "paper-cut edging",
  "rain-kissed speckles",
  "protective braid frame",
  "glass-bead accents",
];

const MOTION_TRAITS = [
  "updraft swirl",
  "still-water hush",
  "safety orbit",
  "courage ripple",
  "soft-wing flutter",
  "steady north pull",
  "tideline sway",
];

const DEFAULT_PALETTE: Palette = {
  name: "Rose Dawn",
  colors: ["#FCE7F3", "#FFE4E6"],
  accent: "#DB2777",
  stroke: "#FDA4AF",
};
const DEFAULT_TRAITS = ["gentle glow", "soft bravery orbit"];

const MAX_PROMPT_LENGTH = 350;

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store",
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const seedParam = Number(searchParams.get("seed"));
  const vibe = searchParams.get("vibe") ?? undefined;

  const payload = await createStickerPayload({
    seed: Number.isFinite(seedParam) ? seedParam : undefined,
    vibe,
  });

  return NextResponse.json(payload, { headers: NO_STORE_HEADERS });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const payload = await createStickerPayload({
    seed: typeof body?.seed === "number" ? body.seed : undefined,
    vibe: typeof body?.vibe === "string" ? body.vibe : undefined,
  });

  return NextResponse.json(payload, { headers: NO_STORE_HEADERS });
}

async function createStickerPayload({
  seed,
  vibe,
}: {
  seed?: number;
  vibe?: string;
}): Promise<StickerPayload> {
  const resolvedSeed = normalizeSeed(seed);
  const theme = pickTheme(resolvedSeed, vibe);
  const palette =
    selectFrom(theme.palettes, resolvedSeed + 7) ?? DEFAULT_PALETTE;
  const traits = buildTraits(resolvedSeed);
  const prompt = buildPrompt(theme, palette, traits);
  const imageDataUrl = renderStickerSvg(theme, palette, traits, resolvedSeed);

  return {
    emoji: theme.emoji,
    label: theme.label,
    tagline: theme.tagline,
    prompt,
    imageDataUrl,
    source: "generated",
    seed: resolvedSeed,
    palette,
    traits,
  };
}

function normalizeSeed(seed?: number): number {
  if (typeof seed === "number" && Number.isFinite(seed)) {
    return Math.abs(Math.floor(seed));
  }
  return Date.now();
}

function pickTheme(seed: number, vibe?: string): BlossomTheme {
  const filtered = vibe
    ? BLOSSOM_THEMES.filter((theme) => theme.vibes.includes(vibe))
    : BLOSSOM_THEMES;
  const pool = filtered.length > 0 ? filtered : BLOSSOM_THEMES;
  const index = Math.floor(mulberry32(seed) * pool.length) % pool.length;
  return pool[index];
}

function buildPrompt(
  theme: BlossomTheme,
  palette: Palette,
  traits: string[]
): string {
  const vibe = theme.vibes[0];
  const fragments = theme.promptFragments.join(" / ");
  const traitSummary = traits.join(", ");
  const basePrompt = `Sticker concept: ${theme.label} ${
    theme.emoji
  } with ${traitSummary}. Palette ${palette.name} (${palette.colors.join(
    " -> "
  )}), vibe ${vibe}. Details: ${fragments}.`;
  return basePrompt.slice(0, MAX_PROMPT_LENGTH);
}

function selectFrom<T>(collection: T[], seed: number): T {
  if (!collection.length) {
    throw new Error("Cannot select from an empty collection");
  }
  const index =
    Math.floor(mulberry32(seed) * collection.length) % collection.length;
  return collection[index];
}

function mulberry32(seed: number): number {
  let t = seed + 0x6d2b79f5;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

function buildTraits(seed: number): string[] {
  const selections = [
    selectFrom(AURA_TRAITS, seed + 101),
    selectFrom(DETAIL_TRAITS, seed + 211),
    selectFrom(MOTION_TRAITS, seed + 307),
  ];
  return Array.from(new Set(selections.length ? selections : DEFAULT_TRAITS));
}

function renderStickerSvg(
  theme: BlossomTheme,
  palette: Palette,
  traits: string[],
  seed: number
): string {
  const gradientId = `gradient-${seed % 10000}`;
  const glowId = `glow-${seed % 10000}`;
  const [start, end] = palette.colors;
  const traitText = traits[0] ?? "gentle glow";
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="256" height="256" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${escapeForSvg(
    theme.label
  )} sticker">
  <defs>
    <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${start}" />
      <stop offset="100%" stop-color="${end}" />
    </linearGradient>
    <filter id="${glowId}" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="6" flood-color="${
        palette.stroke
      }" flood-opacity="0.5" />
    </filter>
  </defs>
  <rect x="16" y="16" width="224" height="224" rx="48" fill="white" />
  <rect x="24" y="24" width="208" height="208" rx="44" fill="url(#${gradientId})" filter="url(#${glowId})" />
  <text x="50%" y="115" text-anchor="middle" font-size="80" dominant-baseline="middle">
    ${theme.emoji}
  </text>
  <text x="50%" y="160" text-anchor="middle" font-size="20" font-family="'DM Serif Display', serif" fill="${
    palette.accent
  }" dominant-baseline="middle">
    ${escapeForSvg(theme.label)}
  </text>
  <text x="50%" y="188" text-anchor="middle" font-size="14" font-family="'Inter', sans-serif" fill="${
    palette.stroke
  }" dominant-baseline="middle">
    ${escapeForSvg(traitText)}
  </text>
</svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

function escapeForSvg(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
