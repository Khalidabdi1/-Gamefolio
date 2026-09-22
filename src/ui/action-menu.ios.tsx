import { Host, Menu, Button } from "@expo/ui/swift-ui";
import {
  buttonStyle,
  controlSize,
  font,
  frame,
  labelStyle,
  tint,
  clipShape,
} from "@expo/ui/swift-ui/modifiers";
import { symbols } from "./icon";
import type { ActionMenuProps } from "./action-menu";
export function ActionMenu({ label, icon = "more", actions }: ActionMenuProps) {
  return (
    <Host matchContents colorScheme="dark">
      <Menu
        label={label}
        systemImage={symbols[icon]}
        modifiers={[
          buttonStyle("glass"),
          controlSize("large"),
          font({ size: 21 }),
          labelStyle("iconOnly"),
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
