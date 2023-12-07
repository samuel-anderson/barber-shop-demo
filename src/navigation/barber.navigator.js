import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { View, Text } from "react-native";

const BarberStack = createStackNavigator();

export const BarberNavigator = () => {
  return (
    <BarberStack.Navigator screenOptions={{ headerShown: false }}>
      <BarberStack.Screen
        name="Main"
        component={() => (
          <View>
            <Text>Screen 1 barb</Text>
          </View>
        )}
      />
      <BarberStack.Screen
        name="Sub"
        component={() => (
          <View>
            <Text>Screen 1 Narn</Text>
          </View>
        )}
      />
    </BarberStack.Navigator>
  );
};
