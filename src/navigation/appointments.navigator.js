import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ViewAppointments } from "../screens/barber/appointments/view-appointments.component";

const AppointmentsStack = createStackNavigator();

export const AppointmentsNavigator = () => {
  return (
    <AppointmentsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AppointmentsStack.Screen
        name={"View Appointments"}
        component={ViewAppointments}
      />
    </AppointmentsStack.Navigator>
  );
};
