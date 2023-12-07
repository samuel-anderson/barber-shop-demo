import { View, Text } from "react-native";
import { Button } from "react-native-paper";

export const ChooseServiceScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Service Screen</Text>
      <Button onPress={() => navigation.navigate("Choose Time")}>
        Choose Time
      </Button>
    </View>
  );
};
