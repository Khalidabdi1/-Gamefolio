import { Image } from "expo-image";
import {
  Gamepad2,
  Library,
  UserCircle,
  Search,
  ListFilter,
  CalendarDays,
  Check,
  ChevronRight,
  ChevronLeft,
  Bell,
  Ellipsis,
  LayoutGrid,
  Rows2,
  List,
  Heart,
  Plus,
  X,
  Star,
  Share,
  Settings,
  ArrowUpDown,
} from "lucide-react-native";
export const symbols = {
  game: "gamecontroller",
  library: "rectangle.stack",
  profile: "person.crop.circle",
  search: "magnifyingglass",
  filter: "line.3.horizontal.decrease",
  calendar: "calendar",
  check: "checkmark",
  right: "chevron.right",
  back: "chevron.left",
  bell: "bell",
  more: "ellipsis",
  grid: "square.grid.2x2",
  cards: "rectangle.grid.1x2",
  list: "list.bullet",
  heart: "heart",
  plus: "plus",
  close: "xmark",
  star: "star",
  share: "square.and.arrow.up",
  settings: "gearshape",
  sort: "arrow.up.arrow.down",
} as const;
export type IconName = keyof typeof symbols;
const icons = {
  game: Gamepad2,
  library: Library,
  profile: UserCircle,
  search: Search,
  filter: ListFilter,
  calendar: CalendarDays,
  check: Check,
  right: ChevronRight,
  back: ChevronLeft,
  bell: Bell,
  more: Ellipsis,
  grid: LayoutGrid,
  cards: Rows2,
  list: List,
  heart: Heart,
  plus: Plus,
  close: X,
  star: Star,
  share: Share,
  settings: Settings,
  sort: ArrowUpDown,
};
export function Icon({
  name,
  size = 24,
  color = "#f5f4f0",
}: {
  name: IconName;
  size?: number;
  color?: string;
}) {
  if (process.env.EXPO_OS === "ios")
    return (
      <Image
        source={`sf:${symbols[name]}`}
        style={{ width: size, height: size }}
        tintColor={color}
      />
    );
  const Glyph = icons[name];
  return <Glyph size={size} color={color} strokeWidth={1.8} />;
}
