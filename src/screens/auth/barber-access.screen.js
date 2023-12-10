import { View, Text } from "react-native";
import { Button } from "react-native-paper";

export const BarberAccessScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button onPress={() => navigation.navigate("Login")}>Login</Button>
      <Button onPress={() => navigation.navigate("Register")}>Register</Button>
    </View>
  );
};
