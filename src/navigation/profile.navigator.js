import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ViewDates } from "../screens/barber/appointments/view-dates.component";
import { ViewAppointments } from "../screens/barber/appointments/view-appointments.component";
import { Profile } from "../screens/barber/profile/profile.component";
import {
  EditContactInfo,
  EditName,
} from "../screens/barber/profile/edit-contact-info.component";
import { EditSchedule } from "../screens/barber/profile/edit-schedule.component";

const ProfileStack = createStackNavigator();

export const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: true,
        title: null,
        headerBackTitleStyle: { color: "black" },
        headerTintColor: "black",
      }}
    >
      <ProfileStack.Screen name={"Edit Profile"} component={Profile} />
      <ProfileStack.Screen
        name={"Contact Information"}
        component={EditContactInfo}
      />
      <ProfileStack.Screen name={"Schedule"} component={EditSchedule} />
    </ProfileStack.Navigator>
  );
};
