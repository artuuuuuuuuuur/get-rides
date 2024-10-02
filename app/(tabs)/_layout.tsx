import { Stack, Tabs } from "expo-router";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import Home from "./index";
import PastRides from "./past-rides";
import Account from "./account";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme == "dark" ? DarkTheme : DefaultTheme}>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="home" component={Home} />
        <Tab.Screen name="past-rides" component={PastRides} />
        <Tab.Screen name="account" component={Account} />
      </Tab.Navigator>
    </ThemeProvider>
  );
}
