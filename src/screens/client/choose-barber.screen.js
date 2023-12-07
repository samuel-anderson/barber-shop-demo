import { View, Text } from "react-native";
import { Button } from "react-native-paper";

export const ChooseBarberScreen = ({ navigation }) => {
  //barber list component
  //barber component

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Barber Screen</Text>
      <Button onPress={() => navigation.navigate("Choose Service")}>
        Choose Service
      </Button>
    </View>
  );
};
