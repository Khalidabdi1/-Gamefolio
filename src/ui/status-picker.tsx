import { View, Text, Pressable } from "react-native";
import { statuses, type Status } from "@/data/games";
export type StatusPickerProps = {
  value: Status;
  onChange: (value: Status) => void;
};
export function StatusPicker({ value, onChange }: StatusPickerProps) {
  return (
    <View className="flex-row flex-wrap gap-2">
      {statuses.map((s) => (
        <Pressable
          key={s.id}
          onPress={() => onChange(s.id)}
          accessibilityState={{ selected: value === s.id }}
          className="rounded-full px-4 py-3"
          style={{ backgroundColor: value === s.id ? "#ff624f" : "#282325" }}
        >
          <Text style={{ color: value === s.id ? "#180e0b" : "#f5f4f0" }}>
            {s.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
