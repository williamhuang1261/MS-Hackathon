"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ROUTES } from "@/lib/constants";

const FALLBACK_SITE_URL = "https://athena-shelter.org";
const HERO_EMOJI = "🌸";

type PaletteInfo = {
  name: string;
  colors: [string, string];
  accent: string;
  stroke: string;
};

type StickerState = {
  emoji: string;
  label: string;
  tagline: string;
  prompt: string;
  imageDataUrl?: string;
  source: "generated" | "fallback";
  seed: number;
  palette: PaletteInfo;
  traits: string[];
};

const FALLBACK_PALETTE: PaletteInfo = {
  name: "Rose Dawn",
  colors: ["#FCE7F3", "#FFE4E6"],
  accent: "#DB2777",
  stroke: "#FDA4AF",
};

const FALLBACK_STICKER: StickerState = {
  emoji: HERO_EMOJI,
  label: "Hope Blossom",
  tagline: "Soft petals carrying brave stories",
  prompt: "",
  source: "fallback",
  seed: 0,
  palette: FALLBACK_PALETTE,
  traits: ["gentle glow", "soft bravery orbit"],
};

const ThankYouHeader = () => {
  const searchParams = useSearchParams();
  const defaultShareUrl = useMemo(() => {
    const origin = process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL;
    return `${origin.replace(/\/$/, "")}${ROUTES.donate}`;
  }, []);
  const [shareUrl, setShareUrl] = useState(defaultShareUrl);
  const manualSeed = useMemo(() => {
    if (!searchParams) return null;
    const seedParam = searchParams.get("emojiSeed");
    if (!seedParam) return null;
    const parsed = Number(seedParam);
    return Number.isFinite(parsed) ? Math.floor(parsed) : null;
  }, [searchParams]);
  const [copied, setCopied] = useState(false);
  const [shareError, setShareError] = useState<string | null>(null);
  const [sticker, setSticker] = useState<StickerState>(FALLBACK_STICKER);
  const [stickerError, setStickerError] = useState<string | null>(null);
  const [isStickerLoading, setIsStickerLoading] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setShareUrl(`${window.location.origin.replace(/\/$/, "")}${ROUTES.donate}`);
  }, []);

  const paletteColors = sticker.palette?.colors ?? FALLBACK_PALETTE.colors;
  const traitList =
    sticker.traits && sticker.traits.length > 0
      ? sticker.traits
      : FALLBACK_STICKER.traits;
  const gradientBorderStyle = useMemo(
    () => ({
      backgroundImage: `linear-gradient(135deg, ${paletteColors[0]}, ${paletteColors[1]})`,
    }),
    [paletteColors]
  );

  const heroEmoji = sticker?.emoji || HERO_EMOJI;

  const generateSeed = useCallback(() => {
    if (manualSeed !== null) {
      return manualSeed;
    }

    if (typeof window !== "undefined" && window.crypto?.getRandomValues) {
      const array = new Uint32Array(1);
      window.crypto.getRandomValues(array);
      return array[0] || Date.now();
    }

    return Date.now();
  }, [manualSeed]);

  const fetchSticker = useCallback(
    async (options?: { signal?: AbortSignal }) => {
      setIsStickerLoading(true);
      try {
        const seed = generateSeed();
        const response = await fetch(`/api/emoji?seed=${seed}`, {
          method: "GET",
          signal: options?.signal,
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch emoji sticker: ${response.status}`);
        }

        const data = (await response.json()) as Partial<StickerState>;
        setSticker({
          ...FALLBACK_STICKER,
          ...data,
          emoji: data.emoji || HERO_EMOJI,
          label: data.label || FALLBACK_STICKER.label,
          tagline: data.tagline || FALLBACK_STICKER.tagline,
          prompt: data.prompt || FALLBACK_STICKER.prompt,
          palette: data.palette || FALLBACK_PALETTE,
          traits:
            Array.isArray(data.traits) && data.traits.length
              ? data.traits
              : FALLBACK_STICKER.traits,
          seed:
            typeof data.seed === "number" ? data.seed : FALLBACK_STICKER.seed,
          source: data.source === "generated" ? "generated" : "fallback",
        });
        setStickerError(null);
      } catch (error) {
        if ((error as Error)?.name === "AbortError") {
          return;
        }
        console.error("Unable to load sticker", error);
        setSticker(FALLBACK_STICKER);
        setStickerError(
          "We couldn't craft a fresh Blossom. Showing a classic instead."
        );
      } finally {
        setIsStickerLoading(false);
      }
    },
    [generateSeed]
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchSticker({ signal: controller.signal });
    return () => controller.abort();
  }, [fetchSticker]);

  const leadingTrait = sticker.traits?.[0] ?? "gentle glow";

  const shareMessage = useMemo(
    () =>
      `I just unlocked the ${sticker.label} ${heroEmoji} (${leadingTrait}) with Athena Network so more families can feel safe tonight. Join me and spark another act of care: ${shareUrl}`,
    [heroEmoji, leadingTrait, shareUrl, sticker.label]
  );

  const encodedMessage = useMemo(
    () => encodeURIComponent(shareMessage),
    [shareMessage]
  );
  const encodedUrl = useMemo(() => encodeURIComponent(shareUrl), [shareUrl]);

  const shareTargets = useMemo(
    () => [
      {
        name: "Share on X",
        icon: "✕",
        href: `https://twitter.com/intent/tweet?text=${encodedMessage}`,
      },
      {
        name: "Share on Facebook",
        icon: "📘",
        href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedMessage}`,
      },
      {
        name: "Share on LinkedIn",
        icon: "💼",
        href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      },
      {
        name: "Share on WhatsApp",
        icon: "📱",
        href: `https://api.whatsapp.com/send?text=${encodedMessage}`,
      },
    ],
    [encodedMessage, encodedUrl]
  );

  const handleCopy = useCallback(async () => {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      setShareError("Clipboard is unavailable on this device");
      return;
    }

    try {
      await navigator.clipboard.writeText(shareMessage);
      setCopied(true);
      setShareError(null);
      setTimeout(() => setCopied(false), 2500);
    } catch (error) {
      console.error("Unable to copy share message", error);
      setShareError("Could not copy message. Try a different share option.");
    }
  }, [shareMessage]);

  const handleNativeShare = useCallback(async () => {
    if (typeof navigator === "undefined" || !navigator.share) {
      return handleCopy();
    }

    try {
      await navigator.share({
        title: "Athena Network",
        text: shareMessage,
        url: shareUrl,
      });
      setShareError(null);
    } catch (error) {
      if ((error as DOMException)?.name !== "AbortError") {
        console.error("Native share failed", error);
        setShareError(
          "Sharing was interrupted. Try again or copy the message."
        );
      }
    }
  }, [handleCopy, shareMessage, shareUrl]);

  return (
    <section className="relative isolate flex w-full flex-col items-center gap-8 text-center">
      <div className="absolute inset-0 -z-10 blur-3xl">
        <div className="mx-auto h-64 w-64 rounded-full bg-rose-200/40" />
      </div>

      <div className="inline-flex items-center gap-3 rounded-full border border-rose-200 bg-white/80 px-6 py-2 text-sm font-semibold text-rose-600 shadow-sm">
        <span className="text-2xl" aria-hidden>
          {heroEmoji}
        </span>
        Hope Blossom Unlocked
      </div>

      <div className="space-y-5">
        <h1 className="text-4xl font-semibold text-primary sm:text-5xl">
          Your kindness is contagious
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-accent">
          Survivors will feel tonight what you chose to give today. Invite your
          circle to keep the chain of care alive—every shared emoji sparks a new
          act of courage.
        </p>
      </div>

      <div className="w-full max-w-4xl rounded-3xl border border-rose-100 bg-white/90 p-8 shadow-2xl">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
          <div className="flex flex-col items-center rounded-3xl bg-rose-50 px-6 py-8 text-center">
            <div className="rounded-[32px] p-[3px]" style={gradientBorderStyle}>
              <div className="rounded-[28px] bg-white p-4">
                {sticker.imageDataUrl ? (
                  <Image
                    src={sticker.imageDataUrl}
                    alt={`${sticker.label} sticker`}
                    width={160}
                    height={160}
                    className="h-36 w-36 rounded-2xl object-cover"
                    priority
                  />
                ) : (
                  <span
                    className="text-6xl"
                    role="img"
                    aria-label="share sticker"
                  >
                    {heroEmoji}
                  </span>
                )}
              </div>
            </div>
            <p className="mt-4 text-2xl font-semibold text-rose-700">
              {sticker.label}
            </p>
            <p className="mt-2 text-sm text-rose-500">{sticker.tagline}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {traitList.map((trait) => (
                <span
                  key={`${trait}-${sticker.seed}`}
                  className="rounded-full border border-rose-100 bg-white/70 px-3 py-1 text-xs font-medium text-rose-500"
                >
                  {trait}
                </span>
              ))}
            </div>
            <div className="mt-4 text-xs uppercase tracking-[0.3em] text-rose-300">
              Palette
              <span className="ml-2 font-semibold tracking-normal text-rose-500">
                {sticker.palette?.name ?? FALLBACK_PALETTE.name}
              </span>
            </div>
            <div
              className="mt-2 h-2 w-24 rounded-full"
              style={{
                backgroundImage: `linear-gradient(135deg, ${paletteColors[0]}, ${paletteColors[1]})`,
              }}
            />
            {isStickerLoading && (
              <p className="mt-3 text-sm text-rose-400" aria-live="polite">
                Summoning a fresh Blossom...
              </p>
            )}
            {stickerError && (
              <p className="mt-3 text-sm text-rose-500" aria-live="assertive">
                {stickerError}
              </p>
            )}
            <button
              type="button"
              onClick={handleCopy}
              className="mt-6 w-full rounded-full bg-rose-600 px-6 py-3 text-base font-semibold text-white shadow-md transition hover:bg-rose-500"
            >
              {copied ? "Copied to clipboard ✨" : "Copy sticker & message"}
            </button>
            {shareError && (
              <p className="mt-3 text-sm text-rose-500">{shareError}</p>
            )}
            {!shareError && (
              <p className="mt-3 text-sm text-rose-400">{shareMessage}</p>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-left text-sm font-semibold uppercase tracking-widest text-rose-400">
              Share with one tap
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {shareTargets.map((target) => (
                <a
                  key={target.name}
                  href={target.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-rose-100 bg-white px-4 py-4 text-left text-base font-semibold text-primary shadow-sm transition hover:-translate-y-0.5 hover:border-rose-300 hover:shadow-lg"
                >
                  <span className="flex items-center gap-3">
                    <span aria-hidden>{target.icon}</span>
                    {target.name}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 6.75L6.75 17.25M17.25 6.75H9.75M17.25 6.75V14.25"
                    />
                  </svg>
                </a>
              ))}
            </div>

            <button
              type="button"
              onClick={handleNativeShare}
              className="mt-2 flex items-center justify-center gap-2 rounded-2xl border border-rose-200 px-4 py-4 text-base font-semibold text-rose-600 transition hover:border-rose-400 hover:bg-rose-50"
            >
              <span role="img" aria-hidden>
                🚀
              </span>
              Share from this device
            </button>

            <div className="rounded-2xl border border-dashed border-rose-200 bg-rose-50/70 px-5 py-4 text-left text-sm text-rose-500">
              💡 Tip: Drop the Blossom into your stories with #HopeBlossoms so
              we can celebrate you publicly (with your permission).
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThankYouHeader;
