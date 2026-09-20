import { Host, Menu, Button } from "@expo/ui/swift-ui";
import { buttonStyle, controlSize, tint } from "@expo/ui/swift-ui/modifiers";
import { statuses } from "@/data/games";
import type { StatusPickerProps } from "./status-picker";
export function StatusPicker({ value, onChange }: StatusPickerProps) {
  return (
    <Host matchContents colorScheme="dark">
      <Menu
        label={statuses.find((s) => s.id === value)?.label ?? "Not started"}
        systemImage="chevron.up.chevron.down"
        modifiers={[
          buttonStyle("glass"),
          controlSize("large"),
          tint("#ff624f"),
        ]}
      >
        {statuses.map((s) => (
          <Button
            key={s.id}
            label={s.label}
            systemImage={s.id === value ? "checkmark" : undefined}
            onPress={() => onChange(s.id)}
          />
        ))}
      </Menu>
    </Host>
  );
}
