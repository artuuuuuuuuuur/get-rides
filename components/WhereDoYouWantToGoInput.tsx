import { ThemedText } from "./ThemedText";
import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { colorScheme } from "nativewind";
import React from "react";

function WhereUGo() {
  const colorScheme = useColorScheme();
  const [input, onChangeInput] = React.useState("");

  return (
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
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
});

export default WhereUGo;
