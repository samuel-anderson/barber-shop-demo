import { View, Text } from "react-native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { useRoute } from "@react-navigation/native";
import { PhoneNumberComponent } from "../../../components/phone-number/phone-number.component";
import { TextMessageComponent } from "../../../components/text-message/text-message.component";
import { Spacer } from "../../../components/spacer/spacer.component";

export const ViewAppointment = () => {
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
        <Text>{clientName}</Text>
        <Text>
          {startTime}-{endTime}
        </Text>
        <Text>{status}</Text>
      </View>
      <Spacer position="bottom" size="large" />
      <View>
        <Text>
          {service.title} - ${service.price}
        </Text>
      </View>
      <Spacer position="bottom" size="large" />

      <View>
        <PhoneNumberComponent phoneNumber={clientPhoneNumber} />
        <TextMessageComponent phoneNumber={clientPhoneNumber} />
      </View>
    </SafeArea>
  );
};
