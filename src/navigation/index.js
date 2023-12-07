import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { ClientNavigator } from "./client.navigator";
import { BarberNavigator } from "./barber.navigator";

export const Navigation = () => {
  const isAuthenticated = false;

  return (
    <NavigationContainer>
      {isAuthenticated ? <BarberNavigator /> : <ClientNavigator />}
    </NavigationContainer>
  );
};
