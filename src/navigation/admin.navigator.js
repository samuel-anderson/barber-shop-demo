import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Main } from "../screens/barber/admin/main.component";

const AdminStack = createStackNavigator();

export const AdminNavigator = () => {
  return (
    <AdminStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AdminStack.Screen name={"Main"} component={Main} />
    </AdminStack.Navigator>
  );
};
