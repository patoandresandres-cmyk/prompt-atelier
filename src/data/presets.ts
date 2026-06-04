import { DEFAULT_PARAMS, type PromptState } from "../lib/types";

export interface Preset {
  id: string;
  name: string;
  tagline: string;
  state: PromptState;
}

export const PRESETS: Preset[] = [
  {
    id: "photoreal-landscape",
    name: "Photoreal landscape",
    tagline: "The signature recipe — light-led and layered.",
    state: {
      framing: "wide establishing shot",
      subject: "a glacial valley with a still alpine lake",
      layers: "rocky foreground, mirror-like lake mid-ground, snow-capped peaks behind",
      light: "golden hour, low warm sun, soft mist, faint god rays",
      camera: "Sony A7R IV, 16–35mm wide-angle, f/11",
      render: "photorealistic, sharp focus, natural color",
      negative: "people, text",
      params: { ...DEFAULT_PARAMS, ar: "16:9", stylize: 150 },
    },
  },
  {
    id: "cinematic-portrait",
    name: "Cinematic portrait",
    tagline: "Shallow depth, soft directional light.",
    state: {
      framing: "intimate close-up",
      subject: "a weathered fisherman, deep wrinkles, salt-and-pepper beard",
      layers: "soft out-of-focus harbor behind",
      light: "soft window light, blue hour, gentle rim light",
      camera: "Canon EOS R5, 85mm f/1.8, shallow depth of field",
      render: "photorealistic, subtle film grain, Kodak Portra 400",
      negative: "extra limbs, distortion",
      params: { ...DEFAULT_PARAMS, ar: "4:5", stylize: 150 },
    },
  },
  {
    id: "architecture-interior",
    name: "Architecture & interior",
    tagline: "Clean lines, diffused daylight.",
    state: {
      framing: "wide interior shot",
      subject: "a minimalist Scandinavian living room",
      layers: "armchair in foreground, large windows mid-ground, garden glimpsed outside",
      light: "soft diffused daylight, large windows, gentle shadows",
      camera: "Sony A7R IV, 16–24mm, f/8",
      render: "architectural photography, photorealistic, natural color",
      negative: "people, clutter, distortion",
      params: { ...DEFAULT_PARAMS, ar: "3:2" },
    },
  },
  {
    id: "product-still-life",
    name: "Product still life",
    tagline: "Controlled studio light, crisp edges.",
    state: {
      framing: "macro detail",
      subject: "a faceted glass perfume bottle on wet slate",
      layers: "soft gradient backdrop, subtle reflection in the foreground",
      light: "studio softbox, crisp rim light, controlled highlights",
      camera: "100mm macro, f/8",
      render: "product photography, photorealistic, sharp focus",
      negative: "text, watermark, dust",
      params: { ...DEFAULT_PARAMS, ar: "1:1", stylize: 80 },
    },
  },
];
