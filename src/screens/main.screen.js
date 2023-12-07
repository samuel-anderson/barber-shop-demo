import { View, Text } from "react-native";
import { Button } from "react-native-paper";

export const MainScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Main Screen</Text>
      <Button onPress={() => navigation.navigate("Choose Barber")}>
        Schedule Appointment
      </Button>
      {/* <Button onPress={() => navigation.navigate("Choose Barber")}>
        Barber Sign In
      </Button> */}
    </View>
  );
};
