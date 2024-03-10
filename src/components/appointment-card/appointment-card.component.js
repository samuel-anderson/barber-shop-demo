import { View, StyleSheet } from "react-native";

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
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";
import { useTheme } from "styled-components/native";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectBarberWithCurrentUser } from "../../redux/professionals/professionalsSelector";
import { editAppointmentStart } from "../../redux/appointments/appointmentsSlice";

const getOrderTotal = (service, addOns) => {
  const servicePrice = service ? service.price : 0;
  const addOnPrice =
    addOns.length === 0
      ? 0
      : addOns.reduce((total, addOn) => total + addOn.price, 0);

  return servicePrice + addOnPrice;
};

export const AppointmentCardComponent = ({ date, item, index }) => {
  const navigation = useNavigation();
  const theme = useTheme();
  const currentUser = useSelector(selectBarberWithCurrentUser);
  const dispatch = useDispatch();

  const [status, setStatus] = useState(item.status);

  const statusColor = () => {
    switch (status) {
      case "pending":
        return "yellow";
      case "cancelled":
        return "red";
      case "confirmed":
        return "lightgreen";
      default:
        return "yellow";
    }
  };

  const placeholder = {
    label: item.status.toUpperCase(),
    value: item.status,
  };

  const statuses = [
    { label: "PENDING", value: "pending" },
    { label: "CONFIRMED", value: "confirmed" },
    { label: "CANCELLED", value: "cancelled" },
  ].filter((status) => status.value != item.status);

  const onSaveChanges = async () => {
    try {
      //check for errors first

      dispatch(
        editAppointmentStart({
          barberId: currentUser.id,
          appointmentDate: date,
          newStatus: status,
        })
      );
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AppointmentCard elevation={2}>
      <AppointmentStatusContainer $statusColor={statusColor()}>
        <RNPickerSelect
          onDonePress={() => {
            if (status != item.status) onSaveChanges();
          }}
          onValueChange={(status) => {
            setStatus(status);
          }}
          items={statuses}
          placeholder={placeholder}
          style={{
            inputIOS: {
              color: theme.colors.text.primary,
              fontSize: 12,
              textAlign: "center",
              fontFamily: theme.fonts.body,
            },
            placeholder: {
              color: theme.colors.text.primary,
              fontSize: 12,
              textAlign: "center",
              fontFamily: theme.fonts.body,
            },
          }}
        />
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
