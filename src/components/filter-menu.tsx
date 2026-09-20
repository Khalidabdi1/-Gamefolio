import { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLibrary } from "@/state/library";
import { games, statuses, type ViewMode } from "@/data/games";
import { GlassButton } from "@/ui/glass-button";
import { Icon } from "@/ui/icon";
export function FilterMenu({ showView = true }: { showView?: boolean }) {
  const [open, setOpen] = useState(false);
  const [genres, setGenres] = useState(false);
  const s = useLibrary();
  const insets = useSafeAreaInsets();
  return (
    <>
      <GlassButton
        icon="filter"
        label="Filter and view"
        onPress={() => setOpen(true)}
      />
      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable
          accessibilityLabel="Close filters"
          style={{ flex: 1 }}
          onPress={() => setOpen(false)}
        >
          <Pressable
            onPress={(e) => e.stopPropagation()}
            style={{
              position: "absolute",
              top: insets.top + 12,
              left: 12,
              width: 250,
              borderRadius: 34,
              overflow: "hidden",
              borderWidth: 1,
              borderColor: "#ffffff24",
              boxShadow: "0 12px 35px #00000066",
            }}
          >
            <BlurView
              intensity={80}
              tint="dark"
              style={{ padding: 22, backgroundColor: "#262426ec" }}
            >
              {showView && (
                <>
                  <Text className="mb-3 text-muted">View</Text>
                  <View className="mb-5 flex-row justify-between">
                    {(["list", "cards", "grid"] as ViewMode[]).map((mode) => (
                      <Pressable
                        key={mode}
                        accessibilityLabel={`${mode} view`}
                        accessibilityState={{ selected: s.view === mode }}
                        onPress={() => s.setView(mode)}
                        className="items-center justify-center rounded-xl"
                        style={{
                          width: 42,
                          height: 40,
                          backgroundColor:
                            s.view === mode ? "#ffffff13" : "transparent",
                        }}
                      >
                        <Icon name={mode} size={21} />
                      </Pressable>
                    ))}
                  </View>
                </>
              )}
              <Text className="mb-2 text-muted">
                {genres ? "Genre" : "Status"}
              </Text>
              {genres
                ? ["All genres", ...new Set(games.map((g) => g.genre))].map(
                    (genre) => (
                      <Pressable
                        key={genre}
                        onPress={() => s.setGenre(genre)}
                        className="flex-row items-center gap-3 py-3"
                      >
                        <Icon
                          name="check"
                          size={18}
                          color={s.genre === genre ? "#f5f4f0" : "transparent"}
                        />
                        <Text className="text-ink" style={{ fontSize: 18 }}>
                          {genre}
                        </Text>
                      </Pressable>
                    ),
                  )
                : statuses.map((item) => (
                    <Pressable
                      key={item.id}
                      accessibilityRole="checkbox"
                      accessibilityState={{
                        checked: s.filters.includes(item.id),
                      }}
                      onPress={() => s.toggleFilter(item.id)}
                      className="flex-row items-center gap-3 py-3"
                    >
                      <Icon
                        name="check"
                        size={18}
                        color={
                          s.filters.includes(item.id)
                            ? "#f5f4f0"
                            : "transparent"
                        }
                      />
                      <Text className="text-ink" style={{ fontSize: 18 }}>
                        {item.label}
                      </Text>
                    </Pressable>
                  ))}
              <Pressable
                onPress={() => setGenres(!genres)}
                className="mt-3 flex-row items-center justify-between border-t border-white/10 pt-5"
              >
                <Text className="text-ink" style={{ fontSize: 18 }}>
                  {genres ? "Status" : "Genre"}
                </Text>
                <Icon name="right" size={18} />
              </Pressable>
            </BlurView>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}
