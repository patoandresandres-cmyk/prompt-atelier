import { useEffect, useMemo, useState, type ReactNode } from "react";
import { FIELDS, type FieldKey } from "./data/library";
import { PRESETS, type Preset } from "./data/presets";
import {
  EMPTY_STATE,
  type Params,
  type PromptState,
  type SavedPrompt,
} from "./lib/types";
import { buildPrompt, textWordCount } from "./lib/buildPrompt";
import { diagnose } from "./lib/diagnostics";
import { loadHistory, saveHistory } from "./lib/storage";
import { Header } from "./components/Header";
import { PresetBar } from "./components/PresetBar";
import { LayerField } from "./components/LayerField";
import { ParameterPanel } from "./components/ParameterPanel";
import { PromptPreview } from "./components/PromptPreview";
import { PromptDoctor } from "./components/PromptDoctor";
import { HistoryPanel } from "./components/HistoryPanel";
import { Footer } from "./components/Footer";
import { Check, Copy } from "./components/icons";

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-line bg-ink-850 px-2.5 py-1">
      {children}
    </span>
  );
}

function MobileBar({
  prompt,
  onCopy,
}: {
  prompt: string;
  onCopy: () => void;
}) {
  const [copied, setCopied] = useState(false);
  if (!prompt) return null;
  const handle = () => {
    onCopy();
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-ink-950/90 px-4 py-3 backdrop-blur-md lg:hidden">
      <div className="mx-auto flex max-w-6xl items-center gap-3">
        <p className="flex-1 truncate font-mono text-[11px] text-muted">
          {prompt}
        </p>
        <button
          type="button"
          onClick={handle}
          className="flex shrink-0 items-center gap-1.5 rounded-lg bg-[linear-gradient(to_right,#f7c668,#ec9d3f)] px-3.5 py-2 text-[13px] font-semibold text-ink-950"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" /> Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" /> Copy
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [state, setState] = useState<PromptState>(EMPTY_STATE);
  const [history, setHistory] = useState<SavedPrompt[]>(() => loadHistory());

  useEffect(() => {
    saveHistory(history);
  }, [history]);

  const prompt = useMemo(() => buildPrompt(state), [state]);
  const words = useMemo(() => textWordCount(state), [state]);
  const diagnostics = useMemo(() => diagnose(state), [state]);

  const setField = (key: FieldKey, value: string) =>
    setState((s) => ({ ...s, [key]: value }));
  const setParam = <K extends keyof Params>(key: K, value: Params[K]) =>
    setState((s) => ({ ...s, params: { ...s.params, [key]: value } }));

  const applyPreset = (p: Preset) => setState(structuredClone(p.state));
  const reset = () => setState(structuredClone(EMPTY_STATE));
  const surprise = () =>
    applyPreset(PRESETS[Math.floor(Math.random() * PRESETS.length)]);

  const remember = () => {
    if (!prompt) return;
    setHistory((h) => [
      { id: crypto.randomUUID(), text: prompt, createdAt: Date.now() },
      ...h.filter((x) => x.text !== prompt),
    ]);
  };
  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* ignore */
    }
  };

  return (
    <div id="top" className="atelier-bg min-h-screen">
      <Header />
      <main className="mx-auto max-w-6xl px-4 pb-32 sm:px-6 lg:pb-16">
        <section className="py-8 sm:py-10">
          <h1 className="max-w-2xl font-display text-[30px] leading-[1.1] text-cream sm:text-[40px]">
            Compose Midjourney prompts{" "}
            <span className="text-gradient italic">like a photographer.</span>
          </h1>
          <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-muted sm:text-[15px]">
            A layered prompt builder built around a proven photorealism formula —
            light-led, camera-aware, and watched over by a built-in Prompt
            Doctor.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-[11.5px] text-faint">
            <Pill>Layered formula</Pill>
            <Pill>Prompt Doctor</Pill>
            <Pill>No sign-up</Pill>
            <Pill>100% local</Pill>
          </div>
        </section>

        <PresetBar
          onApply={applyPreset}
          onReset={reset}
          onSurprise={surprise}
        />

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-8">
          <div className="space-y-4">
            {FIELDS.map((f) => (
              <LayerField
                key={f.key}
                field={f}
                value={state[f.key]}
                onChange={(v) => setField(f.key, v)}
              />
            ))}
            <ParameterPanel params={state.params} setParam={setParam} />
            <HistoryPanel
              history={history}
              onUse={copyText}
              onDelete={(id) =>
                setHistory((h) => h.filter((x) => x.id !== id))
              }
              onClear={() => setHistory([])}
            />
          </div>

          <aside className="space-y-5 lg:sticky lg:top-20 lg:self-start">
            <PromptPreview prompt={prompt} words={words} onCopy={remember} />
            <PromptDoctor diagnostics={diagnostics} />
          </aside>
        </div>
      </main>
      <Footer />

      <MobileBar
        prompt={prompt}
        onCopy={async () => {
          await copyText(prompt);
          remember();
        }}
      />
    </div>
  );
}
