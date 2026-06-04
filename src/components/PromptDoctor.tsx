import type { ComponentType } from "react";
import type { Diagnostic, DiagnosticLevel } from "../lib/diagnostics";
import { AlertCircle, AlertTriangle, CheckCircle, Info } from "./icons";

const STYLE: Record<
  DiagnosticLevel,
  { Icon: ComponentType<{ className?: string }>; color: string }
> = {
  error: { Icon: AlertTriangle, color: "text-rose" },
  warn: { Icon: AlertCircle, color: "text-amber" },
  info: { Icon: Info, color: "text-sky-400" },
  ok: { Icon: CheckCircle, color: "text-emerald-400" },
};

export function PromptDoctor({ diagnostics }: { diagnostics: Diagnostic[] }) {
  const issues = diagnostics.filter(
    (d) => d.level === "error" || d.level === "warn",
  ).length;

  return (
    <div className="rounded-xl border border-line bg-ink-900/50 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-[14px] font-semibold text-cream">Prompt Doctor</h3>
        <span
          className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${
            issues
              ? "border-amber/40 bg-amber/10 text-amber"
              : "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
          }`}
        >
          {issues ? `${issues} to improve` : "Looking sharp"}
        </span>
      </div>
      <ul className="space-y-2.5">
        {diagnostics.map((d, i) => {
          const { Icon, color } = STYLE[d.level];
          return (
            <li key={i} className="flex gap-2.5">
              <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${color}`} />
              <div>
                <p className="text-[13px] font-medium text-cream">{d.title}</p>
                {d.detail && (
                  <p className="mt-0.5 text-[11.5px] leading-snug text-muted">
                    {d.detail}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
