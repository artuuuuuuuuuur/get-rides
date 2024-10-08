import { Stack, Tabs } from "expo-router";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { useColorScheme } from "@/hooks/useColorScheme";
import Home from "./index";
import PastRides from "./past-rides";
import Account from "./account";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { ReceiptText } from "lucide-react-native";

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            borderTopWidth: 0,
            backgroundColor:
              colorScheme === "dark"
                ? DarkTheme.colors.background
                : DefaultTheme.colors.background,
          },
          tabBarActiveTintColor:
            colorScheme === "dark"
              ? DarkTheme.colors.primary
              : DefaultTheme.colors.primary,
          tabBarInactiveTintColor:
            colorScheme === "dark"
              ? DarkTheme.colors.text
              : DefaultTheme.colors.text,
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Past Rides"
          component={PastRides}
          options={{
            tabBarIcon: ({ color, size }) => (
              <ReceiptText color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={Account}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="user" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </ThemeProvider>
  );
}
