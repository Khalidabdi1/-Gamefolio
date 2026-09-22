import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { games, type Game, type Entry } from "@/data/games";
import { useLibrary } from "@/state/library";
import { GameCard } from "./game-card";
import { Icon } from "@/ui/icon";
export const goalGroups = [
  {
    title: "Main journey",
    goals: [
      "Begin your adventure",
      "Reach the halfway point",
      "Finish the main story",
    ],
  },
  {
    title: "Beyond the story",
    goals: [
      "Explore optional areas",
      "Complete your side quests",
      "Return for another playthrough",
    ],
  },
];
export function DetailSections({ game, entry }: { game: Game; entry: Entry }) {
  const s = useLibrary();
  const [expanded, setExpanded] = useState("Main journey");
  const related = games
    .filter((g) => g.id !== game.id)
    .sort(
      (a, b) => Number(b.genre === game.genre) - Number(a.genre === game.genre),
    )
    .slice(0, 6);
  return (
    <>
      <Text className="mb-4 mt-8 text-ink text-xl font-semibold">
        You might also play
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12 }}
      >
        {related.map((g) => (
          <GameCard key={g.id} game={g} entry={s.entries[g.id]} width={112} />
        ))}
      </ScrollView>
      <Text className="mt-10 mb-2 text-ink text-xl font-semibold">
        Your journey
      </Text>
      <Text className="text-muted mb-5">
        Personal goals · not official achievements
      </Text>
      {goalGroups.map((group) => {
        const count = group.goals.filter((g) =>
          entry.goals?.includes(g),
        ).length;
        const open = expanded === group.title;
        return (
          <View key={group.title} style={{ marginBottom: 26 }}>
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ expanded: open }}
              accessibilityLabel={group.title}
              onPress={() => setExpanded(open ? "" : group.title)}
              style={{
                minHeight: 52,
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Text
                className="text-ink text-lg font-semibold"
                style={{ flex: 1 }}
              >
                {group.title} {open ? "⌃" : "⌄"}
              </Text>
              <Text
                style={{
                  color: count === group.goals.length ? "#6dff65" : "#928c8e",
                }}
              >
                {count}/{group.goals.length}
              </Text>
              <Icon
                name="check"
                color={count === group.goals.length ? "#6dff65" : "#625a5e"}
              />
            </Pressable>
            <View style={{ height: 3, backgroundColor: "#242122" }}>
              <View
                style={{
                  height: 3,
                  width: `${(count / group.goals.length) * 100}%`,
                  backgroundColor: "#6dff65",
                }}
              />
            </View>
            {open &&
              group.goals.map((goal, i) => (
                <Pressable
                  key={goal}
                  accessibilityRole="checkbox"
                  accessibilityLabel={goal}
                  accessibilityState={{
                    checked: entry.goals?.includes(goal) ?? false,
                  }}
                  onPress={() =>
                    s.update(game.id, {
                      goals: entry.goals?.includes(goal)
                        ? entry.goals.filter((x) => x !== goal)
                        : [...(entry.goals ?? []), goal],
                    })
                  }
                  style={{
                    flexDirection: "row",
                    gap: 14,
                    alignItems: "center",
                    paddingVertical: 18,
                    borderBottomWidth: 1,
                    borderColor: "#302b2e",
                  }}
                >
                  <View
                    style={{
                      width: 54,
                      height: 48,
                      backgroundColor: "#1c191a",
                      borderRadius: 10,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ color: "#928c8e", fontSize: 20 }}>
                      0{i + 1}
                    </Text>
                  </View>
                  <Text className="text-ink" style={{ flex: 1, fontSize: 16 }}>
                    {goal}
                  </Text>
                  <Icon
                    name="check"
                    color={entry.goals?.includes(goal) ? "#6dff65" : "#625a5e"}
                  />
                </Pressable>
              ))}
          </View>
        );
      })}
    </>
  );
}
