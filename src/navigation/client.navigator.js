import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { MainScreen } from "../screens/main.screen";
import { ChooseBarberScreen } from "../screens/client/choose-barber.screen";
import { ChooseServiceScreen } from "../screens/client/choose-service.screen";
import { ChooseTimeScreen } from "../screens/client/choose-time.screen";
import { SubmitAppointmentScreen } from "../screens/appointment/submit-appointment.screen";

const ClientStack = createStackNavigator();

export const ClientNavigator = () => {
  return (
    <ClientStack.Navigator screenOptions={{ headerBackTitle: "Back" }}>
      <ClientStack.Screen name="Main" component={MainScreen} />

      {/* Appointment Details */}
      <ClientStack.Group>
        <ClientStack.Screen
          name="Choose Barber"
          component={ChooseBarberScreen}
        />
        <ClientStack.Screen
          name="Choose Service"
          component={ChooseServiceScreen}
        />
        <ClientStack.Screen name="Choose Time" component={ChooseTimeScreen} />
      </ClientStack.Group>

      {/* Appointment Submission */}
      <ClientStack.Group>
        <ClientStack.Screen
          name="Submit Appointment"
          component={SubmitAppointmentScreen}
        />
      </ClientStack.Group>
    </ClientStack.Navigator>
  );
};
