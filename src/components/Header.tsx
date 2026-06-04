import { Aperture, Github, Star } from "./icons";
import { REPO_URL } from "../config";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line/70 bg-ink-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-ink-850 text-amber">
            <Aperture className="h-5 w-5" />
          </span>
          <span className="text-[17px] leading-none">
            <span className="font-medium text-cream">Prompt </span>
            <span className="text-gradient font-display italic">Atelier</span>
          </span>
        </a>
        <a
          href={REPO_URL}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-lg border border-line bg-ink-850 px-3 py-1.5 text-[13px] text-muted transition-colors hover:border-gold/50 hover:text-cream"
        >
          <Github className="h-4 w-4" />
          <span className="hidden sm:inline">Star on GitHub</span>
          <Star className="h-3.5 w-3.5 text-amber" />
        </a>
      </div>
    </header>
  );
}
