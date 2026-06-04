// Small, reusable UI primitives styled for the "golden hour studio" theme.

export function Chip({
  label,
  onClick,
  active = false,
}: {
  label: string;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-[12.5px] leading-none transition-colors duration-150 ${
        active
          ? "border-gold/70 bg-gold/15 text-amber"
          : "border-line bg-ink-850 text-muted hover:border-gold/60 hover:bg-ink-700 hover:text-cream"
      }`}
    >
      {label}
    </button>
  );
}

export interface Option {
  value: string;
  label: string;
  note?: string;
}

export function Segmented({
  options,
  value,
  onChange,
  className = "",
}: {
  options: Option[];
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  return (
    <div className={`grid gap-1.5 ${className}`}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={`flex flex-col items-start rounded-lg border px-3 py-2 text-left transition-all duration-150 ${
              active
                ? "border-gold/70 bg-gold/10 text-cream shadow-[0_0_0_1px_rgba(236,157,63,0.25)]"
                : "border-line bg-ink-850 text-muted hover:border-line hover:bg-ink-700 hover:text-cream"
            }`}
          >
            <span className="text-[13px] font-medium">{o.label}</span>
            {o.note && (
              <span
                className={`mt-0.5 text-[10.5px] ${active ? "text-gold" : "text-faint"}`}
              >
                {o.note}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export function Toggle({
  checked,
  onChange,
  label,
  hint,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  hint?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-3 rounded-lg border border-line bg-ink-850 px-3 py-2.5 text-left transition-colors hover:border-line hover:bg-ink-800"
    >
      <span>
        <span className="block text-[13px] font-medium text-cream">{label}</span>
        {hint && <span className="block text-[11px] text-faint">{hint}</span>}
      </span>
      <span
        className={`relative h-[22px] w-[38px] shrink-0 rounded-full transition-colors duration-200 ${
          checked ? "bg-gold" : "bg-ink-700"
        }`}
      >
        <span
          className={`absolute top-[3px] h-4 w-4 rounded-full bg-ink-950 transition-all duration-200 ${
            checked ? "left-[19px]" : "left-[3px]"
          }`}
        />
      </span>
    </button>
  );
}

export function Slider({
  label,
  valueLabel,
  value,
  min,
  max,
  step = 1,
  onChange,
  hint,
}: {
  label: string;
  valueLabel: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  hint?: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <label className="text-[13px] font-medium text-cream">{label}</label>
        <span className="rounded-md border border-line bg-ink-850 px-1.5 py-0.5 font-mono text-[11px] text-amber">
          {valueLabel}
        </span>
      </div>
      <input
        type="range"
        className="atelier-range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      {hint && <p className="mt-1.5 text-[11px] text-faint">{hint}</p>}
    </div>
  );
}
