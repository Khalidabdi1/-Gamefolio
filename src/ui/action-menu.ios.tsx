import { Host, Menu, Button, Image } from "@expo/ui/swift-ui";
import {
  buttonStyle,
  controlSize,
  frame,
  accessibilityLabel,
  tint,
  clipShape,
} from "@expo/ui/swift-ui/modifiers";
import { symbols } from "./icon";
import type { ActionMenuProps } from "./action-menu";
export function ActionMenu({ label, icon = "more", actions }: ActionMenuProps) {
  return (
    <Host matchContents colorScheme="dark">
      <Menu
        label={
          <Image
            systemName={symbols[icon]}
            size={21}
            color="#f5f4f0"
            modifiers={[frame({ width: 48, height: 48 })]}
          />
        }
        modifiers={[
          buttonStyle("glass"),
          controlSize("large"),
          accessibilityLabel(label),
          tint("#f5f4f0"),
          frame({ width: 48, height: 48 }),
          clipShape("circle"),
        ]}
      >
        {actions.map((a) => (
          <Button
            key={a.label}
            label={a.label}
            role={a.destructive ? "destructive" : "default"}
            onPress={a.onPress}
          />
        ))}
      </Menu>
    </Host>
  );
}
