
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View } from "react-native";
import AppHeader from "../components/AppHeader";
import Auth from "../components/Auth";
import { useAuth } from "../components/AuthProvider";
import colors from "../styles/colors";

export default function TabsLayout() {
  const { session } = useAuth();


  // If session becomes null while inside tabs, render Auth in-place (no navigation)
  // If session is null while inside the tabs navigator, render the Auth
  // form in-place instead of attempting to force a navigation back to `/`.
  // This keeps the app state intact and avoids brittle cross-navigator calls.
  if (session === null) {
    return (
      <View style={{ flex: 1 }}>
        <AppHeader />
        <Auth />
      </View>
    );
  }


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
          tabBarLabel: "Add Spots",
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
          tabBarLabel: "Person Logs",
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
        name="index"
        options={{
          headerTitle: "Hangout Spots",
          tabBarLabel: "Spot Logs",
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
