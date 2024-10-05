import {
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import React, { useState, useEffect, useRef, useCallback } from "react";
import * as Location from "expo-location";
import "../../assets/map_styles/dark-style";
import darkMap from "../../assets/map_styles/dark-style";
import defaultMap from "../../assets/map_styles/default-style";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { LinearGradient } from "expo-linear-gradient";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackgroundProps,
} from "@gorhom/bottom-sheet";
import MyBottomSheet from "@/components/navigation/BottomSheet";

const mostFrequentRides = [
  { from: "Rua tal, 2", to: "Rua do Fulano, 2522", key: 0 },
  { from: "Rua do Fulano, 2522", to: "Rua tal 2", key: 1 },
  { from: "Rua tal, 2", to: "Rua do Fulano, 2522", key: 2 },
  { from: "Rua do Fulano, 2522", to: "Rua tal 2", key: 3 },
];

export default function Home() {
  const colorScheme = useColorScheme();
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [input, onChangeInput] = React.useState("");

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting...";
  let initialRegion = null;

  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    const { latitude, longitude } = location.coords;
    text = `Latitude: ${latitude}, Longitude: ${longitude}`;

    initialRegion = {
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.0021488010306938143,
      longitudeDelta: 0.0010470673441886902,
    };
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <ThemedView style={styles.container}>
        {initialRegion && (
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            showsUserLocation
            followsUserLocation
            initialRegion={initialRegion}
            customMapStyle={colorScheme === "dark" ? darkMap : defaultMap}
            showsCompass
            mapPadding={{
              top: 300,
              bottom: 0,
              right: 0,
              left: 0,
            }}
          />
        )}

        <View className="px-10 py-20 gap-2">
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
          style={styles.contentContainer}
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
          handleStyle={{
            width: 200,
            height: 30,
            paddingTop: 20,
            paddingBottom: 20,
          }}
        >
          <ThemedView>
            <BottomSheetView>
              <ThemedText type="title" className="px-4 pb-5">
                Most frequent rides
              </ThemedText>
              <View className="flex w-screen px-4 flex-row flex-wrap gap-5">
                {mostFrequentRides.map((ride) => (
                  <LinearGradient
                    className="p-0.5"
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0.7, y: 0 }}
                    style={{ borderRadius: 6 }}
                    colors={["#AE0AF2", "#534AF0"]}
                  >
                    <ThemedView key={ride.key} className="p-2 flex-grow rounded-md">
                      <ThemedText>{ride.from}</ThemedText>
                      <ThemedText>{ride.to}</ThemedText>
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
  map: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#555",
    borderRadius: 35,
  },
});
