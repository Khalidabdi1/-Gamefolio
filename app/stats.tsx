import { useState } from "react";
import { Stack } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { games } from "@/data/games";
import { useLibrary } from "@/state/library";
import { libraryStats } from "@/state/statistics";
import { ActionMenu } from "@/ui/action-menu";
import { GameCard } from "@/components/game-card";
export default function Stats() {
  const s = useLibrary();
  const [genre, setGenre] = useState("All genres");
  const [week, setWeek] = useState(25);
  const stats = libraryStats(s.entries, genre);
  const max = Math.max(1, ...stats.weeks.map((w) => w.hours));
  const selected = stats.weeks[week];
  return (
    <ScrollView
      className="flex-1 bg-canvas"
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ paddingTop: 26, paddingBottom: 60 }}
    >
      <Stack.Screen
        options={{
          title: "Stats",
          headerRight: () => (
            <ActionMenu
              label="Filter statistics"
              icon="filter"
              actions={[
                "All genres",
                ...new Set(games.map((g) => g.genre)),
              ].map((name) => ({
                label: (name === genre ? "✓ " : "") + name,
                onPress: () => setGenre(name),
              }))}
            />
          ),
        }}
      />
      <Text className="px-5 text-ink font-semibold" style={{ fontSize: 26 }}>
        {genre === "All genres" ? "Combined" : genre}
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, gap: 12 }}
      >
        {[
          [
            "PLAY TIME",
            `${Math.floor(stats.totalHours / 24)}d ${stats.totalHours % 24}h`,
          ],
          ["COMPLETED", String(stats.completed)],
          ["GAMES", String(stats.selected.length)],
        ].map(([label, value]) => (
          <View
            key={label}
            style={{
              width: 160,
              height: 104,
              backgroundColor: "#1c191a",
              padding: 18,
              borderRadius: 20,
              justifyContent: "space-between",
            }}
          >
            <Text className="text-muted">{label}</Text>
            <Text
              selectable
              className="text-ink font-bold"
              style={{ fontSize: 26, fontVariant: ["tabular-nums"] }}
            >
              {value}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View className="px-5">
        <Text className="mt-4 text-ink text-2xl font-semibold">
          Hours per week
        </Text>
        <View className="mt-5 flex-row justify-between items-center">
          <Text className="text-ink text-lg font-semibold">
            {selected.start.getFullYear()}
          </Text>
          <Text className="text-muted">
            Week of{" "}
            {selected.start.toLocaleDateString("en", {
              month: "short",
              day: "numeric",
            })}
          </Text>
        </View>
        <Text selectable className="text-ink text-3xl font-bold mt-1">
          {selected.hours}h
        </Text>
        <View
          style={{
            height: 168,
            flexDirection: "row",
            alignItems: "flex-end",
            marginTop: 20,
            gap: 3,
          }}
        >
          {stats.weeks.map((w, i) => (
            <Pressable
              key={i}
              accessibilityRole="button"
              accessibilityLabel={`Week ${i + 1}, ${w.hours} hours`}
              accessibilityState={{ selected: i === week }}
              onPress={() => setWeek(i)}
              style={{ flex: 1, height: "100%", justifyContent: "flex-end" }}
            >
              <View
                style={{
                  height: Math.max(3, (w.hours / max) * 158),
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 5,
                  backgroundColor: i === week ? "#f5f4f0" : "#6dff65",
                }}
              />
            </Pressable>
          ))}
        </View>
        <View className="flex-row justify-between mt-2">
          {stats.weeks
            .filter((_, i) => i % 5 === 0)
            .map((w) => (
              <Text key={w.start.toISOString()} className="text-muted">
                {w.start.toLocaleDateString("en", { month: "short" })}
              </Text>
            ))}
        </View>
        <Text className="text-muted mt-4" style={{ lineHeight: 20 }}>
          Weekly history starts when you log hours here. Earlier play time
          remains included in your total.
        </Text>
        <Text className="mt-10 mb-4 text-ink text-2xl font-semibold">
          Favorite games
        </Text>
        {stats.favorites.length ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 12 }}
          >
            {stats.favorites.map((g) => (
              <GameCard
                key={g.id}
                game={g}
                entry={s.entries[g.id]}
                width={104}
              />
            ))}
          </ScrollView>
        ) : (
          <Text className="text-muted" style={{ lineHeight: 23 }}>
            Tap the heart on a game and your favorites will appear here.
          </Text>
        )}
        <Text className="mt-10 mb-6 text-ink text-2xl font-semibold">
          Most played genres
        </Text>
        {!stats.genres.length && (
          <Text className="text-muted">
            Add games to start building your stats.
          </Text>
        )}
        {stats.genres.map((g) => (
          <View key={g.name} style={{ marginBottom: 24 }}>
            <View className="flex-row justify-between mb-3">
              <Text className="text-ink text-lg">{g.name}</Text>
              <Text selectable className="text-muted">
                {g.hours}h
              </Text>
            </View>
            <View
              style={{ height: 8, borderRadius: 4, backgroundColor: "#242122" }}
            >
              <View
                style={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "#6dff65",
                  width: `${(g.hours / Math.max(1, stats.genres[0].hours)) * 100}%`,
                }}
              />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
