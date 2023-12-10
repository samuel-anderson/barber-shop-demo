import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";
import { AppRegistry } from "react-native";

import { Provider } from "react-redux";
import store from "./src/redux/store";

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
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Navigation />
        </ThemeProvider>
      </Provider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
