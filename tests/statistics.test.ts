import test from "node:test";
import assert from "node:assert/strict";
import { emptyEntry } from "../src/data/games";
import { applyEntryPatch, restore } from "../src/state/library-model";
import { libraryStats } from "../src/state/statistics";
test("logs only new hours and reverses same-day corrections", () => {
  const date = new Date(2026, 8, 22);
  const logged = applyEntryPatch(
    { ...emptyEntry(), hours: 72 },
    { hours: 73 },
    date,
  );
  assert.deepEqual(logged.activity, { "2026-09-22": 1 });
  assert.equal(
    applyEntryPatch(logged, { hours: 72 }, date).activity?.["2026-09-22"],
    0,
  );
});
test("goals and activity survive persistence without changing legacy entries", () => {
  const entry = {
    ...emptyEntry(),
    goals: ["Begin your adventure"],
    activity: { "2026-09-22": 2 },
  };
  assert.deepEqual(
    restore(JSON.stringify({ entries: { hades: entry } })).entries.hades,
    entry,
  );
});
test("stats use saved hours and do not fabricate past weekly activity", () => {
  const entries = {
    "elden-ring": { ...emptyEntry("completed"), hours: 72 },
    hades: { ...emptyEntry(), hours: 5, activity: { "2026-09-22": 2 } },
  };
  const stats = libraryStats(entries, "All genres", new Date(2026, 8, 22));
  assert.equal(stats.totalHours, 77);
  assert.equal(stats.completed, 1);
  assert.equal(stats.weeks[25].hours, 2);
  assert.equal(
    stats.weeks.reduce((sum, w) => sum + w.hours, 0),
    2,
  );
  assert.equal(libraryStats(entries, "Indie").totalHours, 5);
});
test("empty stats are safe", () => {
  const stats = libraryStats({});
  assert.equal(stats.totalHours, 0);
  assert.deepEqual(stats.genres, []);
  assert.equal(stats.weeks.length, 26);
});
