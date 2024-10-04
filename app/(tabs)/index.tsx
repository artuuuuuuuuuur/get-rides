import { StyleSheet, Text, TextInput, useColorScheme, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import "../../assets/map_styles/dark-style";
import darkMap from "../../assets/map_styles/dark-style";
import defaultMap from "../../assets/map_styles/default-style";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
export default function Home() {
  const colorScheme = useColorScheme();
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [input, onChangeInput] = React.useState("");

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
      <View style={styles.container}>
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
          <Text
            style={{
              color:
                colorScheme === "dark"
                  ? DarkTheme.colors.text
                  : DefaultTheme.colors.text,
              fontWeight: "900",
            }}
            className="text-2xl"
          >
            Where do you want to go?
          </Text>
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
            className="h-14 rounded-full px-5 border-gray-400 border-4"
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
        </View>
      </View>
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
});
