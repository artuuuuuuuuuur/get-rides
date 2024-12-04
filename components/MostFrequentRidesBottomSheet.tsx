import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { useColorScheme, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useRef } from "react";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import DownArrow from "@/assets/images/down-arrow";
import mostFrequentRides from "@/app/data/mostFrequentRides";

function MostFrequentRidesBottomSheet() {
  const colorScheme = useColorScheme();
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
                style={{ borderRadius: 6, flexBasis: "48%", flexGrow: 1 }} // Utilize flexGrow para garantir que o espaço seja distribuído
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
  );
}

export default MostFrequentRidesBottomSheet;
