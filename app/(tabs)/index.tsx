import { StyleSheet, useColorScheme, View } from "react-native";
import "../../assets/map_styles/dark-style";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { ThemedView } from "@/components/ThemedView";
import GoogleMap from "@/components/GoogleMap";
import WhereUGo from "@/components/WhereDoYouWantToGoInput";
import MostFrequentRidesBottomSheet from "@/components/MostFrequentRidesBottomSheet";
import { ThemedText } from "@/components/ThemedText";
import { LinearGradient } from "expo-linear-gradient";
import { TextInput } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import mostFrequentRides from "../data/mostFrequentRides";
import DownArrow from "@/assets/images/down-arrow";
import { useRef, useCallback } from "react";

export default function Home() {
  const colorScheme = useColorScheme();
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <ThemedView style={styles.container}>
        <GoogleMap />
        <WhereUGo />
        <MostFrequentRidesBottomSheet />
      </ThemedView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
