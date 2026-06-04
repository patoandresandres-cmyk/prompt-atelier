import { useState } from "react";
import { Check, Copy } from "./icons";

export function PromptPreview({
  prompt,
  words,
  onCopy,
}: {
  prompt: string;
  words: number;
  onCopy: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    if (!prompt) return;
    try {
      await navigator.clipboard.writeText(prompt);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = prompt;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {
        /* ignore */
      }
      document.body.removeChild(ta);
    }
    setCopied(true);
    onCopy();
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gold/30 bg-[linear-gradient(to_bottom,#16120f,#0d0b09)] shadow-[0_0_44px_-20px_rgba(236,157,63,0.7)]">
      <div className="flex items-center justify-between border-b border-line/70 px-4 py-2.5">
        <span className="text-[12px] font-medium uppercase tracking-wider text-faint">
          Your prompt
        </span>
        <span className="font-mono text-[11px] text-faint">
          {words} words · {prompt.length} chars
        </span>
      </div>
      <div className="px-4 py-3.5">
        {prompt ? (
          <p className="break-words font-mono text-[13px] leading-relaxed text-cream">
            {prompt}
          </p>
        ) : (
          <p className="text-[13px] leading-relaxed text-faint">
            Start composing on the left — your prompt assembles here in real
            time. Try a recipe to see it in action.
          </p>
        )}
      </div>
      <div className="px-4 pb-4">
        <button
          type="button"
          onClick={copy}
          disabled={!prompt}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[linear-gradient(to_right,#f7c668,#ec9d3f)] px-4 py-2.5 text-[14px] font-semibold text-ink-950 transition-all hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" /> Copied to clipboard
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" /> Copy prompt
            </>
          )}
        </button>
      </div>
    </div>
  );
}
