import { View, Text } from "react-native";
import { Button } from "react-native-paper";

export const ChooseTimeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Time Screen</Text>
      <Button onPress={() => navigation.navigate("Submit Appointment")}>
        Submit Appointment
      </Button>
    </View>
  );
};
