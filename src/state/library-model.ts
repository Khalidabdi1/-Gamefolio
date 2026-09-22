import {
  emptyEntry,
  games,
  initialEntries,
  statuses,
  type Entry,
  type Status,
  type ViewMode,
} from "@/data/games";
export type LibraryState = {
  entries: Record<string, Entry>;
  view: ViewMode;
  filters: Status[];
  genre: string;
  name: string;
  handle: string;
};
export const initial: LibraryState = {
  entries: initialEntries,
  view: "grid",
  filters: ["playing", "paused", "backlog", "wishlist"],
  genre: "All genres",
  name: "KHALID KALIB",
  handle: "abdi",
};

export function restore(raw: string): LibraryState {
  const saved = JSON.parse(raw);
  if (
    !saved ||
    typeof saved !== "object" ||
    !saved.entries ||
    typeof saved.entries !== "object" ||
    Array.isArray(saved.entries)
  )
    throw new Error("Invalid library");
  const entries: Record<string, Entry> = {};
  for (const game of games) {
    const entry = saved.entries[game.id];
    if (!entry || !statuses.some((s) => s.id === entry.status)) continue;
    entries[game.id] = {
      ...emptyEntry(entry.status),
      hours: boundedNumber(entry.hours, 0, 1000000),
      progress: boundedNumber(entry.progress, 0, 100),
      favorite: entry.favorite === true,
      rating: Math.round(boundedNumber(entry.rating, 0, 5)),
      notes: typeof entry.notes === "string" ? entry.notes : "",
      ...(Array.isArray(entry.goals)
        ? {
            goals: entry.goals
              .filter((x: unknown) => typeof x === "string")
              .slice(0, 100),
          }
        : {}),
      ...(entry.activity &&
      typeof entry.activity === "object" &&
      !Array.isArray(entry.activity)
        ? {
            activity: Object.fromEntries(
              Object.entries(entry.activity)
                .filter(([date]) => /^\d{4}-\d{2}-\d{2}$/.test(date))
                .map(([date, hours]) => [
                  date,
                  boundedNumber(hours, 0, 1000000),
                ]),
            ),
          }
        : {}),
    };
  }
  return {
    ...initial,
    entries,
    view: ["grid", "cards", "list"].includes(saved.view) ? saved.view : "grid",
    filters: Array.isArray(saved.filters)
      ? saved.filters.filter((id: Status) => statuses.some((s) => s.id === id))
      : initial.filters,
    genre: typeof saved.genre === "string" ? saved.genre : initial.genre,
    name: typeof saved.name === "string" ? saved.name : initial.name,
    handle: typeof saved.handle === "string" ? saved.handle : initial.handle,
  };
}

export function applyEntryPatch(
  entry: Entry,
  patch: Partial<Entry>,
  now = new Date(),
): Entry {
  const next = { ...entry, ...patch };
  if (patch.hours !== undefined && patch.hours !== entry.hours) {
    const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    next.activity = {
      ...entry.activity,
      [date]: Math.max(
        0,
        (entry.activity?.[date] ?? 0) + patch.hours - entry.hours,
      ),
    };
  }
  return next;
}

function boundedNumber(value: unknown, min: number, max: number) {
  const n = Number(value);
  return Number.isFinite(n) ? Math.max(min, Math.min(max, n)) : min;
}
