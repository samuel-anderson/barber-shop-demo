import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { createStackNavigator } from "@react-navigation/stack";

import { MainScreen } from "../screens/main.screen";
import { ChooseBarberScreen } from "../screens/client/choose-barber.screen";
import { ChooseServiceScreen } from "../screens/client/choose-service.screen";
import { ChooseTimeScreen } from "../screens/client/choose-time.screen";
import { SubmitAppointmentScreen } from "../screens/appointment/submit-appointment.screen";

import { BarberAccessScreen } from "../screens/auth/barber-access.screen";
import { LoginScreen } from "../screens/auth/login.screen";
import { RegisterScreen } from "../screens/auth/register.sreen";

import { fetchShopDataStart } from "../redux/shop/shopSlice";
import { checkUserSession } from "../redux/user/userSlice";
import useFirebase from "../hooks/useFirebase";
import { useTheme } from "styled-components";

const ClientStack = createStackNavigator();

export const ClientNavigator = () => {
  const dispatch = useDispatch();
  useFirebase(); //remove in production
  const theme = useTheme();

  useEffect(() => {
    dispatch(checkUserSession());
    dispatch(fetchShopDataStart());
  }, [dispatch]);

  return (
    <ClientStack.Navigator
      screenOptions={{
        headerBackTitle: "Back",
        headerStyle: {
          backgroundColor: theme.colors.bg.tertiary,
        },
        headerTintColor: theme.colors.text.inverse,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <ClientStack.Screen name={"Main"} component={MainScreen} />

      {/* Appointment Details */}
      <ClientStack.Group>
        <ClientStack.Screen name={"Barber"} component={ChooseBarberScreen} />
        <ClientStack.Screen name={"Service"} component={ChooseServiceScreen} />
        <ClientStack.Screen name={"Time"} component={ChooseTimeScreen} />
      </ClientStack.Group>

      {/* Appointment Submission */}
      <ClientStack.Group>
        <ClientStack.Screen name={"Book"} component={SubmitAppointmentScreen} />
      </ClientStack.Group>

      {/* Authentication */}
      <ClientStack.Group>
        <ClientStack.Screen name={"Access"} component={BarberAccessScreen} />
        <ClientStack.Screen name={"Login"} component={LoginScreen} />
        <ClientStack.Screen name={"Register"} component={RegisterScreen} />
      </ClientStack.Group>
    </ClientStack.Navigator>
  );
};
