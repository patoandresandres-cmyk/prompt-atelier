// Curated modifier libraries, distilled from a proven photorealism formula.
// The chips are deliberately opinionated — quality over quantity.

export type FieldKey =
  | "framing"
  | "subject"
  | "layers"
  | "light"
  | "camera"
  | "render"
  | "negative";

export interface FieldDef {
  key: FieldKey;
  label: string;
  hint: string;
  placeholder: string;
  chips: string[];
  star?: boolean; // visually highlighted as the high-impact layer
}

export const FIELDS: FieldDef[] = [
  {
    key: "framing",
    label: "Framing & shot",
    hint: "Open with the shot — it sets scale and composition.",
    placeholder: "wide establishing shot",
    chips: [
      "wide establishing shot",
      "extreme wide shot",
      "panoramic vista",
      "aerial drone view",
      "top-down flat lay",
      "low-angle shot",
      "eye-level",
      "intimate close-up",
      "macro detail",
    ],
  },
  {
    key: "subject",
    label: "Subject",
    hint: "Be specific and concrete — vague subjects dilute the image.",
    placeholder: "a lone oak on a windswept ridge",
    chips: [
      "a lone tree",
      "a jagged mountain range",
      "a coastal cliff above the sea",
      "a river winding through a valley",
      "a misty pine forest",
      "a desert dune field",
      "a weathered fisherman",
      "a quiet cobblestone street",
      "an abandoned greenhouse",
    ],
  },
  {
    key: "layers",
    label: "Scene layers",
    hint: "Foreground → mid-ground → background. Depth reads as realism.",
    placeholder: "rocky foreground, lake mid-ground, peaks behind",
    chips: [
      "rocky foreground",
      "wildflowers in the foreground",
      "a path leading the eye in",
      "reflective lake in the mid-ground",
      "layered ridges fading back",
      "low fog rolling between hills",
      "trees framing the edges",
      "a distant village on the horizon",
    ],
  },
  {
    key: "light",
    label: "Light & atmosphere",
    hint: "The #1 driver of realism. Define time, weather and mood.",
    placeholder: "golden hour, low warm sun, soft mist",
    star: true,
    chips: [
      "golden hour",
      "blue hour",
      "soft overcast light",
      "volumetric god rays",
      "morning mist",
      "dramatic storm light",
      "warm backlit rim light",
      "moonlit night",
      "harsh midday sun",
      "long shadows, low sun",
    ],
  },
  {
    key: "camera",
    label: "Camera, lens & film",
    hint: "Signals a real photograph: body + focal length + aperture (+ film).",
    placeholder: "Sony A7R IV, 16–35mm, f/11",
    chips: [
      "Sony A7R IV",
      "Canon EOS R5",
      "Nikon Z7",
      "16–35mm wide-angle",
      "24mm",
      "85mm f/1.8",
      "tilt-shift lens",
      "f/11 deep focus",
      "shallow depth of field",
      "Kodak Portra 400",
      "Fujifilm Velvia",
    ],
  },
  {
    key: "render",
    label: "Render & finish",
    hint: "Two or three terms, no more. Quality words don't add realism — light does.",
    placeholder: "photorealistic, sharp focus",
    chips: [
      "photorealistic",
      "sharp focus",
      "high dynamic range",
      "natural color grade",
      "cinematic color",
      "fine detail",
      "subtle film grain",
    ],
  },
  {
    key: "negative",
    label: "Exclude — --no",
    hint: "Things to keep out of the frame.",
    placeholder: "people, text, blur",
    chips: [
      "people",
      "text",
      "watermark",
      "logo",
      "blur",
      "oversaturated",
      "distortion",
      "low contrast",
    ],
  },
];

export interface AspectRatio {
  value: string;
  note: string;
}

export const ASPECT_RATIOS: AspectRatio[] = [
  { value: "16:9", note: "Landscape" },
  { value: "21:9", note: "Cinematic" },
  { value: "3:2", note: "Photo" },
  { value: "1:1", note: "Square" },
  { value: "4:5", note: "Portrait" },
  { value: "9:16", note: "Stories" },
];

export interface VersionOption {
  value: string;
  label: string;
  note: string;
}

export const VERSIONS: VersionOption[] = [
  { value: "7", label: "V7", note: "Default · photoreal" },
  { value: "8.1", label: "V8.1", note: "Newest · --hd 2048px" },
  { value: "6.1", label: "V6.1", note: "Legacy" },
  { value: "niji 6", label: "Niji 6", note: "Anime / illustration" },
];

export const QUALITY_OPTIONS = [0.5, 1, 2, 4];
