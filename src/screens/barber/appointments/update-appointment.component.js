import { View, Text } from "react-native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { useRoute } from "@react-navigation/native";
import { PhoneNumberComponent } from "../../../components/phone-number/phone-number.component";
import { TextMessageComponent } from "../../../components/text-message/text-message.component";
import { Spacer } from "../../../components/spacer/spacer.component";

export const UpdateAppointment = () => {
  const route = useRoute();
  const { appointment } = route.params;
  const {
    clientName,
    startTime,
    endTime,
    clientPhoneNumber,
    status,
    service,
    addOns,
  } = appointment;

  return (
    <SafeArea>
      <View>
        <Text>UPDATE APPOINTMENT SCREEN</Text>
      </View>
    </SafeArea>
  );
};
