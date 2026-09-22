import { useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import {
  Alert,
  Linking,
  Pressable,
  ScrollView,
  Share,
  Text,
  View,
} from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { games, hero, emptyEntry } from "@/data/games";
import { useLibrary } from "@/state/library";
import { GlassButton } from "@/ui/glass-button";
import { ActionMenu } from "@/ui/action-menu";
import { Icon } from "@/ui/icon";
import { DetailSections } from "@/components/detail-sections";
export default function GameDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const game = games.find((g) => g.id === id);
  const s = useLibrary();
  const insets = useSafeAreaInsets();
  const [expanded, setExpanded] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const [heroFailed, setHeroFailed] = useState(false);
  if (!game)
    return (
      <View className="flex-1 bg-canvas items-center justify-center">
        <Text className="text-ink">Game not found</Text>
        <GlassButton
          icon="back"
          label="Back"
          onPress={() => router.replace("/")}
        />
      </View>
    );
  const entry = s.entries[game.id];
  const current = entry ?? emptyEntry();
  const edit = () => router.push(`/progress/${game.id}`);
  const storeUrl = `https://store.steampowered.com/app/${game.steamId}/`;
  return (
    <View className="flex-1 bg-canvas">
      <ScrollView
        contentInsetAdjustmentBehavior="never"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}
      >
        <View
          style={{
            height: 346,
            backgroundColor: "#1c191a",
            overflow: "hidden",
          }}
        >
          {!heroFailed && (
            <Image
              source={hero(game)}
              style={{ position: "absolute", inset: 0 }}
              contentFit="cover"
              onError={() => setHeroFailed(true)}
            />
          )}
          <View
            style={{
              position: "absolute",
              inset: 0,
              experimental_backgroundImage:
                "linear-gradient(180deg, rgba(12,10,11,0.05) 30%, #0c0a0b 100%)",
            }}
          />
          <View
            style={{
              position: "absolute",
              bottom: 16,
              left: 36,
              right: 36,
              height: 80,
              justifyContent: "center",
            }}
          >
            {logoFailed ? (
              <Text
                selectable
                style={{
                  color: "#f5f4f0",
                  fontSize: 34,
                  textAlign: "center",
                  fontWeight: "800",
                }}
              >
                {game.title}
              </Text>
            ) : (
              <Image
                accessibilityLabel={game.title}
                source={`https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${game.steamId}/logo.png`}
                onError={() => setLogoFailed(true)}
                contentFit="contain"
                style={{ width: "100%", height: 80 }}
              />
            )}
          </View>
        </View>
        <View className="px-5">
          <View
            style={{
              flexDirection: "row",
              gap: 12,
              marginTop: 20,
              marginBottom: 32,
            }}
          >
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={
                current.favorite ? "Remove from favorites" : "Add to favorites"
              }
              onPress={() => s.update(game.id, { favorite: !current.favorite })}
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                borderWidth: 1.5,
                borderColor: current.favorite ? "#6dff65" : "#625a5e",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon
                name="heart"
                color={current.favorite ? "#6dff65" : "#928c8e"}
              />
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Edit game progress"
              onPress={edit}
              style={{
                flex: 1,
                borderWidth: 1.5,
                borderColor: "#6a6265",
                borderRadius: 28,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                gap: 12,
              }}
            >
              <Icon name={entry ? "check" : "plus"} />
              <Text className="text-ink text-base font-semibold">
                {entry ? `${current.progress}% completed` : "Add to library"}
              </Text>
            </Pressable>
          </View>
          <Text selectable className="text-muted text-base">
            Released · {game.year} · ~{game.hoursToBeat}h to beat
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={
              expanded ? "Show less description" : "Show full description"
            }
            onPress={() => setExpanded(!expanded)}
          >
            <Text
              selectable
              numberOfLines={expanded ? undefined : 4}
              style={{
                fontSize: 16,
                lineHeight: 23,
                color: "#f5f4f0",
                marginTop: 10,
              }}
            >
              {game.description}
            </Text>
            <Text className="text-muted mt-1">
              {expanded ? "See less" : "See more"}
            </Text>
          </Pressable>
          <Text selectable className="text-muted mt-3 text-base">
            {game.genre} · {game.platforms}
          </Text>
          <View
            style={{
              flexDirection: "row",
              gap: 8,
              marginTop: 16,
              marginBottom: 24,
            }}
          >
            {[
              `★ ${current.rating ? current.rating + "/5" : "Not rated"}`,
              `${current.hours}h played`,
              current.favorite ? "♥ Favorite" : "Your library",
            ].map((label) => (
              <Pressable
                key={label}
                accessibilityRole="button"
                onPress={edit}
                style={{
                  backgroundColor: "#1c191a",
                  borderRadius: 24,
                  paddingHorizontal: 13,
                  minHeight: 36,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: label.startsWith("★") ? "#e5c66a" : "#928c8e",
                    fontWeight: "600",
                    fontSize: 13,
                  }}
                >
                  {label}
                </Text>
              </Pressable>
            ))}
          </View>
          <Pressable
            accessibilityRole="link"
            accessibilityLabel="Open Steam store"
            onPress={() =>
              void Linking.openURL(storeUrl).catch(() =>
                Alert.alert(
                  "Unable to open Steam",
                  "Check your connection and try again.",
                ),
              )
            }
            style={{
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: "#302b2e",
              paddingVertical: 20,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              className="text-ink text-base font-semibold"
              style={{ flex: 1 }}
            >
              Where to play
            </Text>
            <Text className="text-muted mr-3">Steam store</Text>
            <Icon name="right" size={18} color="#928c8e" />
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Open your review"
            onPress={edit}
            style={{
              paddingVertical: 20,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              className="text-ink text-base font-semibold"
              style={{ flex: 1 }}
            >
              Your review
            </Text>
            <Text className="text-muted mr-3">
              {current.notes ? "Read & edit" : "Write a review"}
            </Text>
            <Icon name="right" size={18} color="#928c8e" />
          </Pressable>
          <DetailSections game={game} entry={current} />
        </View>
      </ScrollView>
      <View
        pointerEvents="box-none"
        style={{
          position: "absolute",
          top: insets.top + 4,
          left: 16,
          right: 16,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <GlassButton
          icon="back"
          label="Back"
          onPress={() =>
            router.canGoBack() ? router.back() : router.replace("/")
          }
        />
        <ActionMenu
          label="Game options"
          actions={[
            {
              label: "Share game",
              onPress: () =>
                void Share.share({ message: game.title + " — " + storeUrl }),
            },
            { label: "Edit progress & review", onPress: edit },
            {
              label: current.favorite ? "Remove favorite" : "Add favorite",
              onPress: () => s.update(game.id, { favorite: !current.favorite }),
            },
          ]}
        />
      </View>
    </View>
  );
}
