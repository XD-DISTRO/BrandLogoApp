import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View } from "react-native";
import AppHeader from "../components/AppHeader";
import colors from "../styles/colors";

export default function TabsLayout() {
  return (
    <View style={{ flex: 1 }}>
      <AppHeader />
      <Tabs
        screenOptions={{
          headerShown: false,
        tabBarActiveTintColor: colors.umberrr,
        tabBarInactiveTintColor: colors.gray,

        headerStyle: {
            backgroundColor: colors.primary,
        },
        headerShadowVisible: false,
        headerTintColor: colors.white,

        tabBarStyle: {
            backgroundColor: colors.offWhite,
        },
    }}

    >
      <Tabs.Screen
        name="fast"
        options={{
          headerTitle: "Fast-Food",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="sitdown"
        options={{
          headerTitle: "Sit-Down Restaurants",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "people" : "people-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="hangout"
        options={{
          headerTitle: "Hangout Spots",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "school" : "school-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
    </View>
  );
}
