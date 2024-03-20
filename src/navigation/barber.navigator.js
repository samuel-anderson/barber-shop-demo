import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Settings } from "../screens/barber/settings.component";
import { Text } from "../components/typography/text.component";
import { useSelector } from "react-redux";
import { Reports } from "../screens/barber/reports.component";
import { selectBarberWithCurrentUser } from "../redux/professionals/professionalsSelector";
import { AppointmentsNavigator } from "./appointments.navigator";
import { AdminNavigator } from "./admin.navigator";
import { useTheme } from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { ProfileNavigator } from "./profile.navigator";

import { APP_FEATURE_REPORTING, APP_FEATURE_ADMIN } from "@env";

const Tab = createBottomTabNavigator();

//Map routes with expo icons
const TAB_ICON = {
  Profile: { active: "person", inactive: "person-outline" },
  Appointments: { active: "calendar", inactive: "calendar-outline" },
  Reports: { active: "folder-open", inactive: "folder-open-outline" },
  Settings: { active: "settings", inactive: "settings-outline" },
  Admin: { active: "construct", inactive: "construct-outline" },
};

export const BarberNavigator = () => {
  const theme = useTheme();
  const currentUser = useSelector(selectBarberWithCurrentUser);

  //Abstract icon based on route name
  const createScreenOptions = ({ route }) => {
    const iconName = TAB_ICON[route.name];
    return {
      tabBarIcon: ({ focused, size, color }) => (
        <Ionicons
          name={focused ? iconName.active : iconName.inactive}
          size={20}
          color={theme.colors.bg.tertiary}
        />
      ),
      tabBarLabel: ({ focused, color }) => {
        // You can customize the color based on the 'focused' state
        const labelColor = focused
          ? theme.colors.text.primary
          : theme.colors.text.secondary;
        const labelWeight = focused ? "bold" : "normal";

        return (
          <Text
            style={{
              color: labelColor,
              fontWeight: labelWeight,
              fontSize: 12,
            }}
          >
            {route.name}
          </Text>
        );
      },
      headerStyle: {
        backgroundColor: theme.colors.bg.tertiary,
      },
      headerTintColor: theme.colors.text.inverse,
      headerTitleStyle: {
        fontWeight: theme.fontWeights.bold,
      },
    };
  };

  console.log(APP_FEATURE_REPORTING);

  return (
    <Tab.Navigator screenOptions={createScreenOptions}>
      <Tab.Screen name="Appointments" component={AppointmentsNavigator} />

      <Tab.Screen name="Profile" component={ProfileNavigator} />
      {APP_FEATURE_REPORTING && (
        <Tab.Screen name="Reports" component={Reports} />
      )}
      <Tab.Screen name="Settings" component={Settings} />
      {currentUser && currentUser.role == "admin" && APP_FEATURE_ADMIN && (
        <Tab.Screen name="Admin" component={AdminNavigator} />
      )}
    </Tab.Navigator>
  );
};
