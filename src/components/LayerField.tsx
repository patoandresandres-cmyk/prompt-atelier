import type { FieldDef } from "../data/library";
import { Chip } from "./primitives";
import { Star } from "./icons";

function tokens(value: string): string[] {
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function hasToken(value: string, token: string): boolean {
  return tokens(value).some((t) => t.toLowerCase() === token.toLowerCase());
}

function toggleToken(value: string, token: string): string {
  const parts = tokens(value);
  const i = parts.findIndex((p) => p.toLowerCase() === token.toLowerCase());
  if (i >= 0) parts.splice(i, 1);
  else parts.push(token);
  return parts.join(", ");
}

export function LayerField({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        field.star
          ? "border-gold/40 bg-ink-900/60 shadow-[0_0_36px_-14px_rgba(236,157,63,0.55)]"
          : "border-line bg-ink-900/50"
      }`}
    >
      <div className="mb-1 flex flex-wrap items-center gap-2">
        <h3 className="text-[14px] font-semibold text-cream">{field.label}</h3>
        {field.star && (
          <span className="flex items-center gap-1 rounded-full border border-gold/40 bg-gold/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-amber">
            <Star className="h-2.5 w-2.5" /> #1 for realism
          </span>
        )}
      </div>
      <p className="mb-2.5 text-[12px] leading-snug text-faint">{field.hint}</p>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        rows={2}
        className="w-full resize-y rounded-lg border border-line bg-ink-950/70 px-3 py-2 text-[13.5px] text-cream outline-none transition-colors placeholder:text-faint/60 focus:border-gold/60 focus:bg-ink-950"
      />
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {field.chips.map((c) => (
          <Chip
            key={c}
            label={c}
            active={hasToken(value, c)}
            onClick={() => onChange(toggleToken(value, c))}
          />
        ))}
      </div>
    </div>
  );
}
