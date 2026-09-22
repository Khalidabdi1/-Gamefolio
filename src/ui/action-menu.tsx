import { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { GlassButton } from "./glass-button";
import type { IconName } from "./icon";
export type ActionMenuProps = {
  label: string;
  icon?: IconName;
  actions: { label: string; onPress: () => void; destructive?: boolean }[];
};
export function ActionMenu({ label, icon = "more", actions }: ActionMenuProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <GlassButton icon={icon} label={label} onPress={() => setOpen(true)} />
      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable
          accessibilityLabel="Dismiss menu"
          onPress={() => setOpen(false)}
          style={{
            flex: 1,
            backgroundColor: "#0007",
            justifyContent: "center",
            padding: 32,
          }}
        >
          <View
            style={{
              backgroundColor: "#242122",
              borderRadius: 24,
              padding: 12,
            }}
          >
            {actions.map((a) => (
              <Pressable
                key={a.label}
                accessibilityRole="button"
                onPress={() => {
                  setOpen(false);
                  a.onPress();
                }}
                style={{ padding: 18 }}
              >
                <Text
                  style={{
                    color: a.destructive ? "#ff624f" : "#f5f4f0",
                    fontSize: 18,
                  }}
                >
                  {a.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
