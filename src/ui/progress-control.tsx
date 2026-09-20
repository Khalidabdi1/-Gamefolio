import { Pressable, Text, View } from "react-native";
export type ProgressProps = {
  value: number;
  onChange: (value: number) => void;
};
export function ProgressControl({ value, onChange }: ProgressProps) {
  return (
    <View className="flex-row items-center gap-4">
      <Pressable
        accessibilityLabel="Decrease progress"
        onPress={() => onChange(Math.max(0, value - 5))}
        className="rounded-full bg-raised px-4 py-3"
      >
        <Text className="text-ink text-lg">−</Text>
      </Pressable>
      <View
        accessibilityRole="progressbar"
        accessibilityValue={{ min: 0, max: 100, now: value }}
        className="h-2 flex-1 overflow-hidden rounded-full bg-raised"
      >
        <View
          style={{ width: `${value}%`, height: 8, backgroundColor: "#ff624f" }}
        />
      </View>
      <Pressable
        accessibilityLabel="Increase progress"
        onPress={() => onChange(Math.min(100, value + 5))}
        className="rounded-full bg-raised px-4 py-3"
      >
        <Text className="text-ink text-lg">+</Text>
      </Pressable>
    </View>
  );
}
