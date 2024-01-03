import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { View } from "react-native";
import { Text } from "../components/typography/text.component";
import { useDispatch } from "react-redux";
import { signOutStart } from "../redux/user/userSlice";
import { CustomButton } from "../components/custom-button/custom-button.component";
import { useTheme } from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

//Map routes with expo icons
const TAB_ICON = {
  Profile: { active: "person", inactive: "person-outline" },
  Appointments: { active: "calendar", inactive: "calendar-outline" },
  Settings: { active: "settings", inactive: "settings-outline" },
};

const Component1 = () => {
  const dispatch = useDispatch();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ width: "80%" }}>
        <CustomButton
          text={"Sign Out"}
          pressHandler={() => dispatch(signOutStart())}
          variant="dark"
        />
      </View>
    </View>
  );
};
export const BarberNavigator = () => {
  const theme = useTheme();

  //Abstract icon based on route name
  const createScreenOptions = ({ route }) => {
    const iconName = TAB_ICON[route.name];
    return {
      tabBarIcon: ({ focused, size, color }) => (
        <Ionicons
          name={focused ? iconName.active : iconName.inactive}
          size={size}
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
          <Text style={{ color: labelColor, fontWeight: labelWeight }}>
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

  return (
    <Tab.Navigator screenOptions={createScreenOptions}>
      <Tab.Screen name="Profile" component={Component1} />
      <Tab.Screen name="Appointments" component={Component1} />
      <Tab.Screen name="Settings" component={Component1} />
    </Tab.Navigator>
  );
};
