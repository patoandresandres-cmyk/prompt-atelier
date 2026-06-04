// Core data model for a Midjourney prompt, composed layer by layer.

export type Version = "8.1" | "7" | "6.1" | "niji 6";

export interface Params {
  version: Version;
  raw: boolean; // --style raw
  ar: string; // --ar  e.g. "16:9"
  stylize: number; // --s   0–1000 (default 100)
  chaos: number; // --c   0–100  (default 0)
  quality: number; // --q   0.5 | 1 | 2 | 4 (default 1)
  seed: string; // --seed (optional)
  sref: string; // --sref style reference (url or code)
  sw: number; // --sw  style weight 0–1000 (default 100)
  hd: boolean; // --hd  (V8.1, 2048px)
  draft: boolean; // --draft (cheap exploration)
}

export interface PromptState {
  framing: string; // shot / composition
  subject: string; // the specific subject
  layers: string; // foreground → background
  light: string; // ⭐ time / weather / atmosphere
  camera: string; // body / lens / film
  render: string; // 2–3 render terms
  negative: string; // --no
  params: Params;
}

export interface SavedPrompt {
  id: string;
  text: string;
  createdAt: number;
}

export const DEFAULT_PARAMS: Params = {
  version: "7",
  raw: true,
  ar: "16:9",
  stylize: 100,
  chaos: 0,
  quality: 1,
  seed: "",
  sref: "",
  sw: 100,
  hd: false,
  draft: false,
};

export const EMPTY_STATE: PromptState = {
  framing: "",
  subject: "",
  layers: "",
  light: "",
  camera: "",
  render: "",
  negative: "",
  params: { ...DEFAULT_PARAMS },
};
