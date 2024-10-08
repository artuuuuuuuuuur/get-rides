import { StyleSheet, useColorScheme, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import darkMap from "../assets/map_styles/dark-style";
import defaultMap from "../assets/map_styles/default-style";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { ThemedView } from "./ThemedView";
import { LinearGradient } from "expo-linear-gradient";

function GoogleMap() {

  const colorScheme = useColorScheme();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );

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
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  container: {
    flex: 1
  },
});

export default GoogleMap;
