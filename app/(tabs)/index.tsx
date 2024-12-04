import { StyleSheet, TextInput, useColorScheme, View } from "react-native";
import "../../assets/map_styles/dark-style";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { ThemedView } from "@/components/ThemedView";
import GoogleMap from "@/components/GoogleMap";

import { ThemedText } from "@/components/ThemedText";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useRef } from "react";
import DownArrow from "@/assets/images/down-arrow";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import mostFrequentRides from "../data/mostFrequentRides";

export default function Home() {
  const colorScheme = useColorScheme();
  const [input, onChangeInput] = React.useState("");
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
    if (index == -1) {
      index++;
    }
  }, []);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <ThemedView style={styles.container}>
        <GoogleMap />

        <View style={styles.overlay}>
          <ThemedText type="title" className="text-3xl">
            Where do you want to go?
          </ThemedText>
          <LinearGradient
            className="p-1"
            start={{ x: 0, y: 0 }}
            end={{ x: 0.7, y: 0 }}
            style={{ borderRadius: 9999 }}
            colors={["#AE0AF2", "#534AF0"]}
          >
            <TextInput
              onChangeText={onChangeInput}
              value={input}
              placeholder="Type any address here"
              placeholderTextColor={
                colorScheme === "dark"
                  ? DarkTheme.colors.text
                  : DefaultTheme.colors.text
              }
              keyboardType="default"
              className="h-14 rounded-full px-5"
              style={{
                backgroundColor:
                  colorScheme === "dark"
                    ? DarkTheme.colors.card
                    : DefaultTheme.colors.card,
                color:
                  colorScheme === "dark"
                    ? DarkTheme.colors.text
                    : DefaultTheme.colors.text,
              }}
            />
          </LinearGradient>
        </View>

        <BottomSheet
          ref={bottomSheetRef}
          onChange={handleSheetChanges}
          snapPoints={["20%", "50%"]}
          backgroundStyle={{
            backgroundColor:
              colorScheme === "dark"
                ? DarkTheme.colors.background
                : DefaultTheme.colors.background,
            borderRadius: 35,
          }}
          handleIndicatorStyle={{
            backgroundColor:
              colorScheme === "dark"
                ? DefaultTheme.colors.background
                : DarkTheme.colors.background,
            width: 100,
          }}
          handleStyle={{ paddingTop: 20, paddingBottom: 20 }}
          style={{ paddingBottom: 10 }}
        >
          <ThemedView>
            <BottomSheetView>
              <ThemedText type="title" className="px-4 pb-5">
                Most frequent rides
              </ThemedText>
              <View className="flex w-full px-4 flex-row gap-5 flex-wrap overflow-y-auto">
                {mostFrequentRides.map((ride) => (
                  <LinearGradient
                    key={ride.key}
                    className="p-0.5"
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={{ borderRadius: 6, flexBasis: "48%", flexGrow: 1 }}
                    colors={
                      ride.key === 0
                        ? ["#555555", "#AE0AF2"]
                        : ride.key === 1
                        ? ["#555555", "#4AABF0"]
                        : ride.key === 2
                        ? ["#555555", "#4A77F0"]
                        : ["#555555", "#7427F2"]
                    }
                  >
                    <ThemedView className="p-2 flex flex-row rounded-md gap-2">
                      <DownArrow />
                      <ThemedView className="flex-1">
                        <ThemedText
                          className="overflow-hidden"
                          numberOfLines={1}
                          ellipsizeMode="tail"
                        >
                          {ride.from}
                        </ThemedText>
                        <ThemedText
                          className="overflow-hidden"
                          numberOfLines={1}
                          ellipsizeMode="tail"
                        >
                          {ride.to}
                        </ThemedText>
                      </ThemedView>
                    </ThemedView>
                  </LinearGradient>
                ))}
              </View>
            </BottomSheetView>
          </ThemedView>
        </BottomSheet>
      </ThemedView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
});
