import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ViewDates } from "../screens/barber/appointments/view-dates.component";
import { ViewAppointments } from "../screens/barber/appointments/view-appointments.component";

const AppointmentsStack = createStackNavigator();

export const AppointmentsNavigator = () => {
  return (
    <AppointmentsStack.Navigator
      screenOptions={{
        headerShown: true,
        title: null,
        headerBackTitleStyle: { color: "black" },
        headerTintColor: "black",
      }}
    >
      <AppointmentsStack.Screen name={"Select Date"} component={ViewDates} />
      <AppointmentsStack.Screen
        name={"Select Appointment"}
        component={ViewAppointments}
      />
    </AppointmentsStack.Navigator>
  );
};
