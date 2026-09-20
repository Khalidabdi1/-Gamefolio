import test from "node:test";
import assert from "node:assert/strict";
import { initial, restore } from "../src/state/library-model";

test("restores progress, personal notes, filters and profile after a restart", () => {
  const saved = structuredClone(initial);
  saved.entries["elden-ring"].notes = "Return to the library after the boss.";
  saved.entries["elden-ring"].hours = 83;
  saved.entries["elden-ring"].progress = 77;
  saved.name = "My collection";
  saved.view = "cards";
  saved.filters = ["completed", "playing"];
  assert.deepEqual(restore(JSON.stringify(saved)), saved);
});

test("an intentionally empty collection remains empty after restart", () => {
  const saved = { ...initial, entries: {}, filters: [] };
  const restored = restore(JSON.stringify(saved));
  assert.deepEqual(restored.entries, {});
  assert.deepEqual(restored.filters, []);
});

test("malformed storage is rejected instead of replacing it with sample data", () => {
  for (const raw of ["{broken", "null", "[]", "{}", '{"entries":[]}']) {
    assert.throws(() => restore(raw));
  }
});

test("invalid game IDs and statuses cannot enter the library from storage", () => {
  const saved = {
    ...initial,
    entries: {
      ...initial.entries,
      unknown: initial.entries["elden-ring"],
      hades: { status: "invalid" },
    },
    filters: ["playing", "invalid"],
  };
  const restored = restore(JSON.stringify(saved));
  assert.equal(restored.entries.unknown, undefined);
  assert.equal(restored.entries.hades, undefined);
  assert.deepEqual(restored.filters, ["playing"]);
});

test("out-of-range and non-finite progress values are sanitized", () => {
  const saved = {
    ...initial,
    entries: {
      "elden-ring": {
        status: "playing",
        hours: -1,
        progress: 300,
        rating: 40,
        notes: 123,
        favorite: "yes",
      },
    },
  };
  assert.deepEqual(restore(JSON.stringify(saved)).entries["elden-ring"], {
    status: "playing",
    hours: 0,
    progress: 100,
    rating: 5,
    notes: "",
    favorite: false,
  });
  assert.equal(
    restore('{"entries":{"elden-ring":{"status":"playing","hours":1e309}}}')
      .entries["elden-ring"].hours,
    0,
  );
});
