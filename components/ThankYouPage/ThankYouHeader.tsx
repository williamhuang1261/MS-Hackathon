"use client";

import Image from "next/image";
import {
  type CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSearchParams } from "next/navigation";
import { ROUTES } from "@/lib/constants";

import facebookIcon from "@/public/facebookLogo.svg";
import instagramIcon from "@/public/instagramLogo.svg";
import linkedinIcon from "@/public/linkedinLogo.png";
import xIcon from "@/public/xLogo.jpg";

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

type ThankYouHeaderProps = {
  primaryColor?: string;
  accentColor?: string;
  softBackgroundColor?: string;
  gradientBackground?: string;
};

const ThankYouHeader = ({
  primaryColor = FALLBACK_PALETTE.accent,
  accentColor = FALLBACK_PALETTE.stroke,
  softBackgroundColor = FALLBACK_PALETTE.colors[0],
  gradientBackground,
}: ThankYouHeaderProps) => {
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
  const computedGradient =
    gradientBackground ??
    `linear-gradient(135deg, ${paletteColors[0]}, ${paletteColors[1]})`;
  const themeVariables = useMemo(
    () =>
      ({
        "--thank-primary": primaryColor,
        "--thank-accent": accentColor,
        "--thank-soft": softBackgroundColor,
        "--thank-gradient": computedGradient,
      } as CSSProperties),
    [accentColor, computedGradient, primaryColor, softBackgroundColor]
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
    <section
      className="relative isolate flex w-full flex-col items-center gap-6 text-center lg:items-start lg:text-left"
      style={themeVariables}
    >
      <div className="absolute inset-0 -z-10 blur-3xl" aria-hidden>
        <div
          className="mx-auto h-64 w-64 rounded-full opacity-70"
          style={{ background: "var(--thank-gradient)" }}
        />
      </div>

      <div
        className="inline-flex items-center gap-3 rounded-full border px-6 py-2 text-sm font-semibold shadow-sm"
        style={{
          borderColor: "var(--thank-primary)",
          color: "var(--thank-primary)",
          backgroundColor: "var(--thank-soft)",
        }}
      >
        <span className="text-2xl" aria-hidden>
          {heroEmoji}
        </span>
        Hope Blossom Unlocked
      </div>

      <div
        className="w-full rounded-3xl border bg-white/90 p-8 shadow-2xl"
        style={{ borderColor: "var(--thank-primary)" }}
      >
        <div className="flex gap-8">
          <div
            className="flex flex-col items-center rounded-3xl px-6 py-8 text-center min-w-120"
            style={{
              backgroundColor: "var(--thank-soft)",
              border: "1px solid var(--thank-accent)",
            }}
          >
            <div
              className="rounded-[32px] p-[3px]"
              style={{ backgroundImage: "var(--thank-gradient)" }}
            >
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
            <p
              className="mt-4 text-2xl font-semibold"
              style={{ color: "var(--thank-primary)" }}
            >
              {sticker.label}
            </p>
            <p
              className="mt-2 text-sm"
              style={{ color: "var(--thank-primary)", opacity: 0.85 }}
            >
              {sticker.tagline}
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {traitList.map((trait) => (
                <span
                  key={`${trait}-${sticker.seed}`}
                  className="rounded-full border bg-white/70 px-3 py-1 text-xs font-medium"
                  style={{
                    borderColor: "var(--thank-accent)",
                    color: "var(--thank-primary)",
                  }}
                >
                  {trait}
                </span>
              ))}
            </div>
            <div
              className="mt-4 text-xs uppercase tracking-[0.3em]"
              style={{ color: "var(--thank-accent)" }}
            >
              Palette
              <span
                className="ml-2 font-semibold tracking-normal"
                style={{ color: "var(--thank-primary)" }}
              >
                {sticker.palette?.name ?? FALLBACK_PALETTE.name}
              </span>
            </div>
            <div
              className="mt-2 h-2 w-24 rounded-full"
              style={{ backgroundImage: "var(--thank-gradient)" }}
            />
            {isStickerLoading && (
              <p
                className="mt-3 text-sm"
                style={{ color: "var(--thank-primary)", opacity: 0.8 }}
                aria-live="polite"
              >
                Summoning a fresh Blossom...
              </p>
            )}
            {stickerError && (
              <p
                className="mt-3 text-sm"
                style={{ color: "var(--thank-primary)" }}
                aria-live="assertive"
              >
                {stickerError}
              </p>
            )}
          </div>
          <div className="flex flex-col justify-between gap-8">
            <div className="flex flex-col gap-4">
              <button
                type="button"
                onClick={handleCopy}
                className="mt-6 w-full rounded-full bg-accent px-6 py-3 text-base font-semibold text-light-background shadow-md transition hover:bg-[color:var(--thank-primary)] hover:text-white"
              >
                {copied ? "Copied to clipboard ✨" : "Copy sticker & message"}
              </button>
              {shareError && (
                <p
                  className="mt-3 text-sm"
                  style={{ color: "var(--thank-primary)" }}
                >
                  {shareError}
                </p>
              )}
              {!shareError && (
                <p
                  className="mt-3 text-sm"
                  style={{ color: "var(--thank-primary)", opacity: 0.8 }}
                >
                  {shareMessage}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-4 mt-4">
              <p
                className="text-left text-sm font-semibold uppercase tracking-widest"
                style={{ color: "var(--thank-primary)" }}
              >
                Share with one tap
              </p>
              <div className="flex gap-4">
                <Image
                  src={facebookIcon}
                  alt="Facebook logo"
                  width={36}
                  height={36}
                  className="inline-block"
                />
                <Image
                  src={instagramIcon}
                  alt="Instagram logo"
                  width={36}
                  height={36}
                  className="inline-block"
                />
                <Image
                  src={linkedinIcon}
                  alt="LinkedIn logo"
                  width={36}
                  height={36}
                  className="inline-block"
                />
                <Image
                  src={xIcon}
                  alt="X logo"
                  width={36}
                  height={36}
                  className="inline-block"
                />
              </div>
              <div
                className="rounded-2xl border border-dashed px-5 py-4 text-left text-sm"
                style={{
                  borderColor: "var(--thank-primary)",
                  color: "var(--thank-primary)",
                  backgroundColor: "var(--thank-soft)",
                }}
              >
                💡 Tip: Drop the Blossom into your stories with #HopeBlossoms so
                we can celebrate you publicly (with your permission).
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThankYouHeader;
