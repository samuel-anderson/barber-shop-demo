import { View, Text } from "react-native";
import { Button } from "react-native-paper";

export const SubmitAppointmentScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Submit Appointment</Text>
      <Button onPress={() => navigation.navigate("Main")}>Done</Button>
    </View>
  );
};
