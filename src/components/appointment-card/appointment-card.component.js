import { View } from "react-native";

import {
  AppointmentCard,
  CustomText,
  ServiceTitle,
  Time,
  AppointmentStatus,
  AppointmentStatusContainer,
  Total,
} from "./appointment-card.styles";
import { Text } from "../typography/text.component";

const getOrderTotal = (service, addOns) => {
  const servicePrice = service ? service.price : 0;
  const addOnPrice =
    addOns.length === 0
      ? 0
      : addOns.reduce((total, addOn) => total + addOn.price, 0);

  return servicePrice + addOnPrice;
};

export const AppointmentCardComponent = ({ item }) => {
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
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Time>
          {item.startTime} - {item.endTime}
        </Time>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <ServiceTitle>{item.service.title}</ServiceTitle>
      </View>
      <View style={{ marginTop: 10 }}>
        {item.addOns.map((addOn, idx) => (
          <CustomText key={idx}>{addOn.title.toUpperCase()}</CustomText>
        ))}
      </View>
      <AppointmentStatusContainer $statusColor={statusColor(item.status)}>
        <AppointmentStatus>{item.status}</AppointmentStatus>
      </AppointmentStatusContainer>
      <View>
        <Total>
          {item.status === "cancelled"
            ? "--"
            : `$${getOrderTotal(item.service, item.addOns)}`}
        </Total>
      </View>
    </AppointmentCard>
  );
};
