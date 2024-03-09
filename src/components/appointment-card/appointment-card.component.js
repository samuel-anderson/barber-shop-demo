import { View } from "react-native";

import {
  AppointmentCard,
  CustomText,
  ServiceTitle,
  Time,
  AppointmentStatus,
  AppointmentStatusContainer,
  Total,
  TotalContainer,
} from "./appointment-card.styles";
import { PhoneNumberComponent } from "../phone-number/phone-number.component";
import { TextMessageComponent } from "../text-message/text-message.component";
import { Text } from "../typography/text.component";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const getOrderTotal = (service, addOns) => {
  const servicePrice = service ? service.price : 0;
  const addOnPrice =
    addOns.length === 0
      ? 0
      : addOns.reduce((total, addOn) => total + addOn.price, 0);

  return servicePrice + addOnPrice;
};

export const AppointmentCardComponent = ({ item }) => {
  const navigation = useNavigation();

  const statusColor = (status) => {
    switch (status) {
      case "pending":
        return "yellow";
      case "cancelled":
        return "red";
      case "paid":
        return "lightgreen";
      default:
        return "yellow";
    }
  };
  return (
    <AppointmentCard elevation={2}>
      <AppointmentStatusContainer $statusColor={statusColor(item.status)}>
        <AppointmentStatus>{item.status.toUpperCase()}</AppointmentStatus>
      </AppointmentStatusContainer>
      <TotalContainer>
        <Total>
          {item.status === "cancelled"
            ? "--"
            : `$${getOrderTotal(item.service, item.addOns)}`}
        </Total>
      </TotalContainer>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Update Appointment", {
              appointment: item,
            });
          }}
        >
          <Time>
            {item.startTime} - {item.endTime}
          </Time>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <ServiceTitle>{item.service.title}</ServiceTitle>
      </View>
      <View style={{ marginTop: 5 }}>
        {item.addOns.map((addOn, idx) => (
          <CustomText key={idx}>{addOn.title.toUpperCase()}</CustomText>
        ))}
      </View>
      <View>
        <Text>Client: {item.clientName}</Text>
        <PhoneNumberComponent phoneNumber={item.clientPhoneNumber} />
        <TextMessageComponent phoneNumber={item.clientPhoneNumber} />
      </View>
    </AppointmentCard>
  );
};
