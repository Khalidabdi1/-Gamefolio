import { useLocalSearchParams, router } from "expo-router";
import {
  ScrollView,
  Text,
  View,
  Pressable,
  TextInput,
  Alert,
  Share,
} from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { games, hero, emptyEntry } from "@/data/games";
import { useLibrary } from "@/state/library";
import { Cover } from "@/components/game-card";
import { GlassButton } from "@/ui/glass-button";
import { Icon } from "@/ui/icon";
import { ProgressControl } from "@/ui/progress-control";
import { StatusPicker } from "@/ui/status-picker";
export default function GameDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const game = games.find((g) => g.id === id);
  const s = useLibrary();
  const insets = useSafeAreaInsets();
  if (!game)
    return (
      <View className="flex-1 items-center justify-center bg-canvas">
        <Text className="text-ink">Game not found</Text>
        <Pressable onPress={() => router.replace("/")}>
          <Text className="mt-5 text-coral">Back to library</Text>
        </Pressable>
      </View>
    );
  const entry = s.entries[game.id];
  const current = entry ?? emptyEntry();
  const update = (patch: Parameters<typeof s.update>[1]) => {
    s.update(game.id, patch);
    if (process.env.EXPO_OS === "ios") void Haptics.selectionAsync();
  };
  return (
    <ScrollView
      className="flex-1 bg-canvas"
      keyboardShouldPersistTaps="handled"
      contentInsetAdjustmentBehavior="never"
      contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
    >
      <View style={{ height: 250, backgroundColor: "#282424" }}>
        <Image
          source={hero(game)}
          contentFit="cover"
          style={{ position: "absolute", inset: 0 }}
        />
        <View
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#00000038",
          }}
        />
        <View
          className="flex-row justify-between px-4"
          style={{ paddingTop: Math.max(insets.top, 48) + 10 }}
        >
          <GlassButton
            icon="back"
            label="Back"
            onPress={() =>
              router.canGoBack() ? router.back() : router.replace("/")
            }
          />
          <GlassButton
            icon="share"
            label="Share game"
            onPress={() =>
              void Share.share({
                message: `${game.title} — in my Gamefolio collection. https://store.steampowered.com/app/${game.steamId}/`,
              })
            }
          />
        </View>
      </View>
      <View className="px-5">
        <View className="flex-row items-end gap-4" style={{ marginTop: -70 }}>
          <Cover game={game} width={112} height={168} />
          <View className="flex-1 pb-2">
            <Text className="text-ink text-2xl font-bold">{game.title}</Text>
            <Text className="mt-2 text-muted">
              {game.year} · {game.genre}
            </Text>
          </View>
        </View>
        <Text className="mt-5 text-muted">{game.platforms}</Text>
        <View className="my-6 flex-row items-center justify-between gap-3">
          {entry ? (
            <StatusPicker
              value={entry.status}
              onChange={(status) =>
                update({
                  status,
                  ...(status === "completed" ? { progress: 100 } : {}),
                })
              }
            />
          ) : (
            <Pressable
              accessibilityRole="button"
              onPress={() => update(emptyEntry())}
              className="flex-row items-center gap-2 rounded-full bg-coral px-6 py-4"
            >
              <Icon name="plus" color="#180e0b" size={20} />
              <Text style={{ color: "#180e0b", fontWeight: "600" }}>
                Add to library
              </Text>
            </Pressable>
          )}
          <GlassButton
            icon="heart"
            label={
              current.favorite ? "Remove from favorites" : "Add to favorites"
            }
            onPress={() => update({ favorite: !current.favorite })}
          />
        </View>
        {current.favorite && (
          <Text className="mb-4 text-coral">♥ In your favorites</Text>
        )}
        <Text
          selectable
          className="text-ink"
          style={{ fontSize: 16, lineHeight: 25 }}
        >
          {game.description}
        </Text>
        {entry && (
          <>
            <View className="mt-8 rounded-3xl bg-surface p-5">
              <View className="mb-4 flex-row justify-between">
                <Text className="text-ink text-lg font-semibold">
                  Your progress
                </Text>
                <Text className="text-coral text-lg">{current.progress}%</Text>
              </View>
              <ProgressControl
                value={current.progress}
                onChange={(progress) =>
                  update({
                    progress,
                    ...(progress === 100
                      ? { status: "completed" as const }
                      : current.status === "completed"
                        ? { status: "playing" as const }
                        : {}),
                  })
                }
              />
              <View className="mt-5 flex-row items-center justify-between">
                <Text className="text-muted">Hours played</Text>
                <View className="flex-row items-center gap-4">
                  <Pressable
                    accessibilityLabel="Remove one hour"
                    onPress={() =>
                      update({ hours: Math.max(0, current.hours - 1) })
                    }
                    className="rounded-full bg-raised px-4 py-2"
                  >
                    <Text className="text-ink text-lg">−</Text>
                  </Pressable>
                  <Text
                    className="text-ink text-xl"
                    style={{ fontVariant: ["tabular-nums"] }}
                  >
                    {current.hours}h
                  </Text>
                  <Pressable
                    accessibilityLabel="Log one hour"
                    onPress={() => update({ hours: current.hours + 1 })}
                    className="rounded-full bg-raised px-4 py-2"
                  >
                    <Text className="text-ink text-lg">+</Text>
                  </Pressable>
                </View>
              </View>
            </View>
            <Text className="mb-3 mt-8 text-ink text-xl font-semibold">
              Your rating
            </Text>
            <View className="flex-row gap-4">
              {[1, 2, 3, 4, 5].map((rating) => (
                <Pressable
                  key={rating}
                  accessibilityLabel={`Rate ${rating} stars`}
                  accessibilityState={{ selected: current.rating === rating }}
                  onPress={() =>
                    update({ rating: current.rating === rating ? 0 : rating })
                  }
                  style={{ padding: 5 }}
                >
                  <Icon
                    name="star"
                    size={29}
                    color={rating <= current.rating ? "#ff624f" : "#625a5e"}
                  />
                </Pressable>
              ))}
            </View>
            <Text className="mb-3 mt-8 text-ink text-xl font-semibold">
              Notes to self
            </Text>
            <TextInput
              accessibilityLabel="Game notes"
              multiline
              placeholder="Where did you leave off?"
              placeholderTextColor="#928c8e"
              value={current.notes}
              onChangeText={(notes) => s.update(game.id, { notes })}
              style={{
                minHeight: 110,
                borderRadius: 20,
                padding: 18,
                backgroundColor: "#1c191a",
                color: "#f5f4f0",
                fontSize: 16,
                textAlignVertical: "top",
              }}
            />
            <Text className="mt-2 text-xs text-muted">
              Saved automatically on this device
            </Text>
            <Pressable
              accessibilityRole="button"
              className="mt-8 items-center py-4"
              onPress={() => {
                if (process.env.EXPO_OS === "web") {
                  s.remove(game.id);
                  router.back();
                } else
                  Alert.alert(
                    "Remove from library?",
                    `Remove your progress and notes for ${game.title}?`,
                    [
                      { text: "Cancel", style: "cancel" },
                      {
                        text: "Remove",
                        style: "destructive",
                        onPress: () => {
                          s.remove(game.id);
                          router.back();
                        },
                      },
                    ],
                  );
              }}
            >
              <Text className="text-coral">Remove from library</Text>
            </Pressable>
          </>
        )}
      </View>
    </ScrollView>
  );
}
