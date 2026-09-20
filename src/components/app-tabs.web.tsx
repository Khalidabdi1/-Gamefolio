import { Tabs, TabList, TabTrigger, TabSlot } from "expo-router/ui";
import { Text, View } from "react-native";
import { BlurView } from "expo-blur";
import { usePathname } from "expo-router";
import { Icon, type IconName } from "@/ui/icon";
export function AppTabs() {
  const path = usePathname();
  const items: [string, string, IconName, string][] = [
    ["index", "/", "game", "Games"],
    ["backlog", "/backlog", "library", "Backlog"],
    ["profile", "/profile", "profile", "Profile"],
  ];
  return (
    <Tabs style={{ flex: 1, backgroundColor: "#0c0a0b" }}>
      <TabSlot />
      <TabList style={{ display: "none" }}>
        {items.map(([name, href]) => (
          <TabTrigger key={name} name={name} href={href as "/"} />
        ))}
        <TabTrigger name="search" href="/search" />
      </TabList>
      <View
        style={{
          position: "absolute",
          bottom: 20,
          left: 20,
          right: 20,
          gap: 10,
          backgroundColor: "transparent",
        }}
      >
        <BlurView
          intensity={70}
          tint="dark"
          style={{
            flex: 1,
            flexDirection: "row",
            padding: 4,
            borderRadius: 40,
            overflow: "hidden",
            borderWidth: 1,
            borderColor: "#ffffff2c",
            backgroundColor: "#3b34348c",
            boxShadow: "inset 0 1px 2px #ffffff1c",
          }}
        >
          {items.map(([name, href, icon, label]) => (
            <TabTrigger
              key={name}
              name={name}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                height: 54,
                gap: 2,
                borderRadius: 36,
                backgroundColor: path === href ? "#0c0a0baa" : "transparent",
              }}
            >
              <Icon
                name={icon}
                size={27}
                color={path === href ? "#ff624f" : "#f5f4f0"}
              />
              <Text
                style={{
                  color: path === href ? "#ff624f" : "#f5f4f0",
                  fontSize: 11,
                  fontWeight: "500",
                }}
              >
                {label}
              </Text>
            </TabTrigger>
          ))}
        </BlurView>
        <TabTrigger
          name="search"
          accessibilityLabel="Search games"
          style={{
            width: 62,
            height: 62,
            borderRadius: 40,
            overflow: "hidden",
          }}
        >
          <BlurView
            intensity={80}
            tint="dark"
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 40,
              borderWidth: 1,
              borderColor: "#ffffff26",
              backgroundColor: "#332e30ab",
            }}
          >
            <Icon
              name="search"
              size={29}
              color={path === "/search" ? "#ff624f" : "#f5f4f0"}
            />
          </BlurView>
        </TabTrigger>
      </View>
    </Tabs>
  );
}
