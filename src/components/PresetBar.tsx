import { PRESETS, type Preset } from "../data/presets";
import { RotateCcw, Shuffle, Sparkles } from "./icons";

export function PresetBar({
  onApply,
  onReset,
  onSurprise,
}: {
  onApply: (p: Preset) => void;
  onReset: () => void;
  onSurprise: () => void;
}) {
  return (
    <section>
      <div className="mb-2.5 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-wider text-faint">
          <Sparkles className="h-3.5 w-3.5 text-gold" /> Start from a recipe
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onSurprise}
            className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[12px] text-muted transition-colors hover:text-amber"
          >
            <Shuffle className="h-3.5 w-3.5" /> Surprise me
          </button>
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[12px] text-muted transition-colors hover:text-cream"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => onApply(p)}
            className="group rounded-xl border border-line bg-ink-850 p-3 text-left transition-all duration-150 hover:border-gold/50 hover:bg-ink-800"
          >
            <span className="block text-[13.5px] font-medium text-cream transition-colors group-hover:text-amber">
              {p.name}
            </span>
            <span className="mt-1 block text-[11.5px] leading-snug text-faint">
              {p.tagline}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
