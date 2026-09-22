import { Host, Button } from "@expo/ui/swift-ui";
import {
  buttonStyle,
  controlSize,
  font,
  labelStyle,
  tint,
} from "@expo/ui/swift-ui/modifiers";
import { symbols } from "./icon";
import type { GlassButtonProps } from "./glass-button";
export function GlassButton({ icon, label, onPress }: GlassButtonProps) {
  return (
    <Host matchContents colorScheme="dark">
      <Button
        label={label}
        systemImage={symbols[icon]}
        onPress={onPress}
        modifiers={[
          buttonStyle("glass"),
          controlSize("large"),
          font({ size: 21, weight: "medium" }),
          labelStyle("iconOnly"),
          tint("#f5f4f0"),
        ]}
      />
    </Host>
  );
}
