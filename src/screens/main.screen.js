import { View, Text, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import { useTheme } from "styled-components";
import { Spacer } from "../components/spacer/spacer.component";

export const MainScreen = ({ navigation }) => {
  const theme = useTheme();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity onPress={() => navigation.navigate("Barber")}>
        <Button
          icon="calendar-clock-outline"
          style={{ backgroundColor: theme.colors.bg.tertiary }}
        >
          <Text style={{ color: theme.colors.text.inverse }}>
            Schedule Appointment
          </Text>
        </Button>
      </TouchableOpacity>
      <Spacer />
      <Spacer />
      <TouchableOpacity onPress={() => navigation.navigate("Barber")}>
        <Button
          icon="account"
          style={{ backgroundColor: theme.colors.bg.tertiary }}
        >
          <Text style={{ color: theme.colors.text.inverse }}>
            Barber Access
          </Text>
        </Button>
      </TouchableOpacity>
    </View>
  );
};
