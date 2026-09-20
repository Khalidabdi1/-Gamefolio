import { Host, Menu, Button, Section, ControlGroup } from "@expo/ui/swift-ui";
import {
  buttonStyle,
  controlSize,
  labelStyle,
  tint,
} from "@expo/ui/swift-ui/modifiers";
import { useLibrary } from "@/state/library";
import { games, statuses, type ViewMode } from "@/data/games";
export function FilterMenu() {
  const s = useLibrary();
  return (
    <Host matchContents colorScheme="dark">
      <Menu
        label="Filter and view"
        systemImage="line.3.horizontal.decrease"
        modifiers={[
          buttonStyle("glass"),
          controlSize("large"),
          labelStyle("iconOnly"),
          tint("#f5f4f0"),
        ]}
      >
        <Section title="View">
          <ControlGroup>
            {(
              [
                ["list", "list.bullet"],
                ["cards", "rectangle.grid.1x2"],
                ["grid", "square.grid.2x2"],
              ] as const
            ).map(([id, icon]) => (
              <Button
                key={id}
                label={`${id}${s.view === id ? " ✓" : ""}`}
                systemImage={icon}
                onPress={() => s.setView(id as ViewMode)}
              />
            ))}
          </ControlGroup>
        </Section>
        <Section title="Status">
          {statuses.map((item) => (
            <Button
              key={item.id}
              label={item.label}
              systemImage={
                s.filters.includes(item.id) ? "checkmark" : undefined
              }
              onPress={() => s.toggleFilter(item.id)}
            />
          ))}
        </Section>
        <Menu label="Genre">
          {["All genres", ...new Set(games.map((g) => g.genre))].map(
            (genre) => (
              <Button
                key={genre}
                label={genre}
                systemImage={s.genre === genre ? "checkmark" : undefined}
                onPress={() => s.setGenre(genre)}
              />
            ),
          )}
        </Menu>
      </Menu>
    </Host>
  );
}
