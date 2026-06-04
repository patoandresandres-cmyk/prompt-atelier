import { useState } from "react";
import type { SavedPrompt } from "../lib/types";
import { ChevronDown, Clock, Copy, Trash } from "./icons";

export function HistoryPanel({
  history,
  onUse,
  onDelete,
  onClear,
}: {
  history: SavedPrompt[];
  onUse: (text: string) => void;
  onDelete: (id: string) => void;
  onClear: () => void;
}) {
  const [open, setOpen] = useState(false);
  if (history.length === 0) return null;

  return (
    <div className="rounded-xl border border-line bg-ink-900/50">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <span className="flex items-center gap-2 text-[14px] font-semibold text-cream">
          <Clock className="h-4 w-4 text-gold" /> History{" "}
          <span className="font-normal text-faint">({history.length})</span>
        </span>
        <ChevronDown
          className={`h-4 w-4 text-faint transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="animate-fadeup space-y-2 border-t border-line/70 p-3">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClear}
              className="text-[11px] text-faint transition-colors hover:text-rose"
            >
              Clear all
            </button>
          </div>
          {history.map((h) => (
            <div
              key={h.id}
              className="flex items-start gap-2 rounded-lg border border-line bg-ink-850 p-2.5"
            >
              <p className="line-clamp-2 flex-1 font-mono text-[11px] leading-snug text-muted">
                {h.text}
              </p>
              <div className="flex shrink-0 gap-1">
                <button
                  type="button"
                  onClick={() => onUse(h.text)}
                  title="Copy"
                  className="rounded p-1 text-faint transition-colors hover:text-amber"
                >
                  <Copy className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(h.id)}
                  title="Delete"
                  className="rounded p-1 text-faint transition-colors hover:text-rose"
                >
                  <Trash className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
