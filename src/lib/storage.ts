import type { SavedPrompt } from "./types";

const KEY = "prompt-atelier:history";
const LIMIT = 30;

export function loadHistory(): SavedPrompt[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as SavedPrompt[]) : [];
  } catch {
    return [];
  }
}

export function saveHistory(items: SavedPrompt[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(items.slice(0, LIMIT)));
  } catch {
    /* storage unavailable — ignore */
  }
}
