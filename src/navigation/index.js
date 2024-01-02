import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { ClientNavigator } from "./client.navigator";
import { BarberNavigator } from "./barber.navigator";
import { useSelector } from "react-redux";

export const Navigation = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.currentUser) setIsAuthenticated(true);
    else setIsAuthenticated(false);
  }, [user]);

  return (
    <NavigationContainer>
      {isAuthenticated ? <BarberNavigator /> : <ClientNavigator />}
    </NavigationContainer>
  );
};
