import { useState, type ReactNode } from "react";
import type { Params, Version } from "../lib/types";
import { ASPECT_RATIOS, QUALITY_OPTIONS, VERSIONS } from "../data/library";
import { Segmented, Slider, Toggle } from "./primitives";
import { ChevronDown } from "./icons";

function Label({ children }: { children: ReactNode }) {
  return (
    <div className="mb-2 text-[13px] font-medium text-cream [&_code]:ml-1 [&_code]:rounded [&_code]:bg-ink-850 [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[11px] [&_code]:text-amber">
      {children}
    </div>
  );
}

function TextInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: ReactNode;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-line bg-ink-950/70 px-3 py-2 text-[13px] text-cream outline-none transition-colors placeholder:text-faint/60 focus:border-gold/60"
      />
    </div>
  );
}

export function ParameterPanel({
  params,
  setParam,
}: {
  params: Params;
  setParam: <K extends keyof Params>(key: K, value: Params[K]) => void;
}) {
  const [advanced, setAdvanced] = useState(false);
  const isNiji = params.version === "niji 6";

  return (
    <div className="rounded-xl border border-line bg-ink-900/50 p-4">
      <h3 className="mb-3.5 text-[14px] font-semibold text-cream">Parameters</h3>

      <div className="space-y-4">
        <div>
          <Label>Model version</Label>
          <Segmented
            className="grid-cols-2"
            options={VERSIONS}
            value={params.version}
            onChange={(v) => setParam("version", v as Version)}
          />
        </div>

        <div>
          <Label>
            Aspect ratio <code>--ar</code>
          </Label>
          <Segmented
            className="grid-cols-3"
            options={ASPECT_RATIOS.map((a) => ({
              value: a.value,
              label: a.value,
              note: a.note,
            }))}
            value={params.ar}
            onChange={(v) => setParam("ar", v)}
          />
        </div>

        {!isNiji && (
          <Toggle
            checked={params.raw}
            onChange={(v) => setParam("raw", v)}
            label="--style raw"
            hint="Less stylization — essential for photo realism"
          />
        )}

        <Slider
          label="Stylize --s"
          valueLabel={String(params.stylize)}
          value={params.stylize}
          min={0}
          max={1000}
          step={25}
          onChange={(v) => setParam("stylize", v)}
          hint="0–100 literal · 150–250 cinematic · higher drifts from the prompt"
        />

        <Slider
          label="Chaos --c"
          valueLabel={String(params.chaos)}
          value={params.chaos}
          min={0}
          max={100}
          step={5}
          onChange={(v) => setParam("chaos", v)}
          hint="Low = consistent · high = more varied compositions"
        />

        <div>
          <Label>
            Quality <code>--q</code>
          </Label>
          <Segmented
            className="grid-cols-4"
            options={QUALITY_OPTIONS.map((q) => ({
              value: String(q),
              label: `${q}×`,
            }))}
            value={String(params.quality)}
            onChange={(v) => setParam("quality", Number(v))}
          />
        </div>

        <button
          type="button"
          onClick={() => setAdvanced((a) => !a)}
          className="flex w-full items-center justify-between rounded-lg border border-line bg-ink-850 px-3 py-2 text-[13px] text-muted transition-colors hover:text-cream"
        >
          <span>Advanced parameters</span>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${advanced ? "rotate-180" : ""}`}
          />
        </button>

        {advanced && (
          <div className="animate-fadeup space-y-4">
            <TextInput
              label={
                <>
                  Seed <code>--seed</code>
                </>
              }
              value={params.seed}
              onChange={(v) => setParam("seed", v.replace(/[^0-9]/g, ""))}
              placeholder="e.g. 1234 — reproduce a result"
            />
            <TextInput
              label={
                <>
                  Style reference <code>--sref</code>
                </>
              }
              value={params.sref}
              onChange={(v) => setParam("sref", v)}
              placeholder="image URL or style code"
            />
            {params.sref.trim() && (
              <Slider
                label="Style weight --sw"
                valueLabel={String(params.sw)}
                value={params.sw}
                min={0}
                max={1000}
                step={25}
                onChange={(v) => setParam("sw", v)}
              />
            )}
            {params.version === "8.1" && (
              <Toggle
                checked={params.hd}
                onChange={(v) => setParam("hd", v)}
                label="--hd"
                hint="2048px output (V8.1)"
              />
            )}
            <Toggle
              checked={params.draft}
              onChange={(v) => setParam("draft", v)}
              label="--draft"
              hint="Faster, cheaper exploration"
            />
          </div>
        )}
      </div>
    </div>
  );
}
