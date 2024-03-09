import { View } from "react-native";

import {
  AppointmentCard,
  CustomText,
  Time,
  AppointmentStatus,
  AppointmentStatusContainer,
  Total,
  TotalContainer,
  AppointmentDetails,
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

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 15,
        }}
      >
        <View>
          <AppointmentDetails>Client: {item.clientName}</AppointmentDetails>
          <AppointmentDetails>Service: {item.service.title}</AppointmentDetails>
          <AppointmentDetails>Add Ons:</AppointmentDetails>
          <View style={{ marginLeft: 15 }}>
            {item.addOns.map((addOn, idx) => (
              <CustomText key={idx}>{addOn.title.toUpperCase()}</CustomText>
            ))}
          </View>
        </View>
        <View>
          <PhoneNumberComponent phoneNumber={item.clientPhoneNumber} />
          <TextMessageComponent phoneNumber={item.clientPhoneNumber} />
        </View>
      </View>
    </AppointmentCard>
  );
};
