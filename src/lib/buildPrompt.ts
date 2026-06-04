import type { PromptState } from "./types";

const TEXT_FIELDS = (s: PromptState): string[] => [
  s.framing,
  s.subject,
  s.layers,
  s.light,
  s.camera,
  s.render,
];

/** Assemble the final, copy-paste-ready Midjourney prompt string. */
export function buildPrompt(s: PromptState): string {
  const text = TEXT_FIELDS(s)
    .map((part) => part.trim())
    .filter(Boolean)
    .join(", ");

  const p = s.params;
  const flags: string[] = [];

  if (p.ar) flags.push(`--ar ${p.ar}`);

  if (p.version === "niji 6") flags.push("--niji 6");
  else flags.push(`--v ${p.version}`);

  if (p.raw && p.version !== "niji 6") flags.push("--style raw");
  if (p.stylize !== 100) flags.push(`--s ${p.stylize}`);
  if (p.chaos > 0) flags.push(`--c ${p.chaos}`);
  if (p.quality !== 1) flags.push(`--q ${p.quality}`);

  if (p.sref.trim()) {
    flags.push(`--sref ${p.sref.trim()}`);
    if (p.sw !== 100) flags.push(`--sw ${p.sw}`);
  }
  if (p.hd && p.version === "8.1") flags.push("--hd");
  if (p.draft) flags.push("--draft");

  const negatives = s.negative
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean)
    .join(", ");
  if (negatives) flags.push(`--no ${negatives}`);

  if (p.seed.trim()) flags.push(`--seed ${p.seed.trim()}`);

  return [text, flags.join(" ")].filter(Boolean).join(" ").trim();
}

/** Word count of the descriptive text only (parameters excluded). */
export function textWordCount(s: PromptState): number {
  const text = TEXT_FIELDS(s).join(" ").trim();
  if (!text) return 0;
  return text.split(/\s+/).filter(Boolean).length;
}
