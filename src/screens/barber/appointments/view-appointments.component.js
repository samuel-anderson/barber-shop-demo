import { View } from "react-native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Text } from "../../../components/typography/text.component";
export const ViewAppointments = ({ navigation }) => {
  return (
    <SafeArea
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <View style={{ width: "80%" }}>
        <Text>View Appoinments Screen</Text>
      </View>
    </SafeArea>
  );
};
