import { View } from "react-native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Text } from "../../../components/typography/text.component";

export const Main = ({ navigation }) => {
  return (
    <SafeArea
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <View style={{ width: "80%" }}>
        <Text>Admin Main Screen</Text>
      </View>
    </SafeArea>
  );
};
