import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

import React from "react";

import { ThemeProvider } from "styled-components/native"; //Styled component theme

import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald"; //Fonts
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato"; //Fonts

import { theme } from "./src/theme";

import { Navigation } from "./src/navigation";

export default function App() {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <Navigation />
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
