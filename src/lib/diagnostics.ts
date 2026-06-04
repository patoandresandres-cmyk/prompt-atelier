import type { PromptState } from "./types";
import { textWordCount } from "./buildPrompt";

export type DiagnosticLevel = "error" | "warn" | "info" | "ok";

export interface Diagnostic {
  level: DiagnosticLevel;
  title: string;
  detail?: string;
}

// "Magic words" that don't actually add realism (the classic mistake).
const MAGIC_WORDS = [
  "8k",
  "4k",
  "16k",
  "ultra hd",
  "uhd",
  "ultra detailed",
  "ultra-detailed",
  "hyperdetailed",
  "hyper detailed",
  "masterpiece",
  "best quality",
  "highly detailed",
  "award winning",
  "award-winning",
  "trending on artstation",
];

// Illustration vocabulary that contradicts a photo prompt.
const ILLUSTRATION_WORDS = [
  "illustration",
  "anime",
  "cartoon",
  "drawing",
  "sketch",
  "painting",
  "concept art",
  "digital art",
  "vector",
  "cel shaded",
  "cel-shaded",
  "watercolor",
];

const RANK: Record<DiagnosticLevel, number> = {
  error: 0,
  warn: 1,
  info: 2,
  ok: 3,
};

const quote = (items: string[]) => items.map((i) => `"${i}"`).join(", ");

/** The "Prompt Doctor": encodes the common mistakes to avoid. */
export function diagnose(s: PromptState): Diagnostic[] {
  const out: Diagnostic[] = [];
  const allText = [s.framing, s.subject, s.layers, s.light, s.camera, s.render]
    .join(" ")
    .toLowerCase();
  const words = textWordCount(s);
  const isPhoto = s.params.version !== "niji 6";

  if (!s.subject.trim()) {
    out.push({
      level: "warn",
      title: "No subject yet",
      detail:
        "Add a specific, concrete subject — the clearer it is, the stronger the result.",
    });
  }

  if (!s.light.trim()) {
    out.push({
      level: "error",
      title: "Light is undefined",
      detail:
        "Light is the single biggest driver of realism. Set a time of day, weather or atmosphere (golden hour, blue hour, mist, god rays).",
    });
  } else {
    out.push({ level: "ok", title: "Light is defined" });
  }

  if (isPhoto && !s.params.raw) {
    out.push({
      level: "warn",
      title: "Missing --style raw",
      detail:
        "For photographic realism, turn on --style raw so Midjourney applies less stylization.",
    });
  } else if (isPhoto && s.params.raw) {
    out.push({ level: "ok", title: "--style raw is on" });
  }

  if (words > 40) {
    out.push({
      level: "warn",
      title: `Long prompt — ${words} words`,
      detail:
        "Past ~40 words Midjourney starts diluting focus. Trim to the essentials.",
    });
  } else if (words > 0) {
    out.push({ level: "ok", title: `Concise — ${words} words` });
  }

  const foundMagic = MAGIC_WORDS.filter((w) => allText.includes(w));
  if (foundMagic.length) {
    out.push({
      level: "warn",
      title: 'Stacked "magic words"',
      detail: `Drop ${quote(
        foundMagic,
      )} — they don't add realism. Define light and camera instead.`,
    });
  }

  if (isPhoto) {
    const foundIllus = ILLUSTRATION_WORDS.filter((w) => allText.includes(w));
    if (foundIllus.length) {
      out.push({
        level: "warn",
        title: "Mixed vocabulary",
        detail: `${quote(
          foundIllus,
        )} read as illustration, not photography. Keep the vocabulary consistent, or switch to Niji.`,
      });
    }
  }

  if (s.params.stylize > 250) {
    out.push({
      level: "info",
      title: `High stylize — --s ${s.params.stylize}`,
      detail:
        "More cinematic, but it drifts further from your prompt. Use 0–100 for literal, 150–250 for cinematic.",
    });
  }

  return out.sort((a, b) => RANK[a.level] - RANK[b.level]);
}
