import { games, type Entry } from "@/data/games";
export function libraryStats(
  entries: Record<string, Entry>,
  genre = "All genres",
  now = new Date(),
) {
  const selected = games.filter(
    (g) => entries[g.id] && (genre === "All genres" || g.genre === genre),
  );
  const totalHours = selected.reduce((sum, g) => sum + entries[g.id].hours, 0);
  const weeks = Array.from({ length: 26 }, (_, i) => {
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    start.setDate(start.getDate() - ((start.getDay() + 6) % 7) - (25 - i) * 7);
    const end = new Date(start);
    end.setDate(end.getDate() + 7);
    const hours = selected.reduce(
      (sum, g) =>
        sum +
        Object.entries(entries[g.id].activity ?? {}).reduce((n, [day, h]) => {
          const date = new Date(day + "T12:00:00");
          return n + (date >= start && date < end ? h : 0);
        }, 0),
      0,
    );
    return { start, hours };
  });
  const genres = [...new Set(selected.map((g) => g.genre))]
    .map((name) => ({
      name,
      hours: selected
        .filter((g) => g.genre === name)
        .reduce((sum, g) => sum + entries[g.id].hours, 0),
    }))
    .sort((a, b) => b.hours - a.hours);
  return {
    selected,
    totalHours,
    weeks,
    genres,
    completed: selected.filter((g) => entries[g.id].status === "completed")
      .length,
    favorites: selected.filter((g) => entries[g.id].favorite),
  };
}
