import { REPO_URL } from "../config";
import { Github } from "./icons";

export function Footer() {
  return (
    <footer className="mt-10 border-t border-line/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-7 text-center sm:flex-row sm:text-left">
        <p className="text-[12.5px] text-faint">
          Crafted for photographers and prompt-makers. Open source · MIT
          license.
        </p>
        <a
          href={REPO_URL}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-[12.5px] text-muted transition-colors hover:text-cream"
        >
          <Github className="h-4 w-4" /> Contribute on GitHub
        </a>
      </div>
    </footer>
  );
}
