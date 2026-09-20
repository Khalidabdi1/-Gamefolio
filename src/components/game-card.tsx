import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import { cover, type Game, type Entry } from "@/data/games";
import { Icon } from "@/ui/icon";
export function Cover({
  game,
  width,
  height,
}: {
  game: Game;
  width: number;
  height: number;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <View
      style={{
        width,
        height,
        borderRadius: 17,
        borderCurve: "continuous",
        overflow: "hidden",
        backgroundColor: "#242022",
        borderWidth: 1,
        borderColor: "#ffffff15",
      }}
    >
      {failed ? (
        <View className="flex-1 items-center justify-center p-3">
          <Icon name="game" size={28} color="#928c8e" />
          <Text className="mt-3 text-center text-ink">{game.title}</Text>
        </View>
      ) : (
        <Image
          source={cover(game)}
          accessibilityLabel={`${game.title} cover`}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
          transition={180}
          cachePolicy="memory-disk"
          onError={() => setFailed(true)}
        />
      )}
    </View>
  );
}
export function GameCard({
  game,
  entry,
  width,
}: {
  game: Game;
  entry?: Entry;
  width: number;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Open ${game.title}`}
      onPress={() => router.push(`/game/${game.id}`)}
      style={({ pressed }) => ({ width, opacity: pressed ? 0.7 : 1 })}
    >
      <Cover game={game} width={width} height={width * 1.5} />
      <Text
        className="mt-2 text-ink"
        style={{ fontSize: 16, lineHeight: 21 }}
        numberOfLines={1}
      >
        {game.title}
      </Text>
      <Text
        className="mt-0.5 text-muted"
        style={{ fontSize: 13, lineHeight: 18 }}
      >
        {entry?.status === "completed"
          ? "Completed ✓"
          : entry?.hours
            ? `${entry.hours}h · ${entry.progress}%`
            : entry?.status === "wishlist"
              ? `${game.year} · ${game.genre}`
              : "Not played"}
      </Text>
    </Pressable>
  );
}
export function GameRow({
  game,
  entry,
  compact = false,
  onComplete,
}: {
  game: Game;
  entry?: Entry;
  compact?: boolean;
  onComplete?: () => void;
}) {
  return (
    <View
      className="flex-row items-center overflow-hidden rounded-[20px] bg-surface"
      style={{ height: compact ? 76 : 104 }}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Open ${game.title}`}
        onPress={() => router.push(`/game/${game.id}`)}
        className="flex-1 flex-row items-center"
      >
        <Image
          source={cover(game)}
          style={{ width: compact ? 51 : 69, height: compact ? 76 : 104 }}
          contentFit="cover"
        />
        <View className="flex-1 px-4" style={{ gap: 7 }}>
          <Text className="text-ink" numberOfLines={1} style={{ fontSize: 16 }}>
            {game.title}
          </Text>
          <Text
            className="text-muted"
            numberOfLines={1}
            style={{ fontSize: 14 }}
          >
            {game.year} ·{" "}
            {entry?.hours ? `${entry.hours}h played` : `~${game.hoursToBeat}h`}
          </Text>
          {!compact && (
            <Text numberOfLines={1} style={{ fontSize: 14, color: "#6f686b" }}>
              {game.description}
            </Text>
          )}
        </View>
      </Pressable>
      {onComplete && (
        <Pressable
          accessibilityRole="checkbox"
          accessibilityState={{ checked: entry?.status === "completed" }}
          accessibilityLabel={`Mark ${game.title} ${entry?.status === "completed" ? "not started" : "completed"}`}
          onPress={onComplete}
          className="mr-5 items-center justify-center rounded-full"
          style={{
            width: 34,
            height: 34,
            borderWidth: 1.7,
            borderColor: entry?.status === "completed" ? "#ff624f" : "#6a6265",
          }}
        >
          <Icon
            name="check"
            size={22}
            color={entry?.status === "completed" ? "#ff624f" : "#6a6265"}
          />
        </Pressable>
      )}
    </View>
  );
}
