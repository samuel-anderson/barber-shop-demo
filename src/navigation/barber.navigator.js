import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { View, Text } from "react-native";
import { useDispatch } from "react-redux";
import { signOutStart } from "../redux/user/userSlice";

const BarberStack = createStackNavigator();

const Component1 = () => {
  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text onPress={() => dispatch(signOutStart())}>Screen 1 barb</Text>
    </View>
  );
};
export const BarberNavigator = () => {
  return (
    <BarberStack.Navigator screenOptions={{ headerShown: false }}>
      <BarberStack.Screen name="Main" component={Component1} />
      <BarberStack.Screen name="Sub" component={Component1} />
    </BarberStack.Navigator>
  );
};
