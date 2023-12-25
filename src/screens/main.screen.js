import { View, Text } from "react-native";
import { Button } from "react-native-paper";

export const MainScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button onPress={() => navigation.navigate("Barber")}>
        Schedule Appointment
      </Button>
      <Button onPress={() => navigation.navigate("Access")}>
        Barber Access
      </Button>
    </View>
  );
};
