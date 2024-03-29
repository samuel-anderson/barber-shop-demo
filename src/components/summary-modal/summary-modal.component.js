import { AppointmentSummary } from "../appointment-summary/appointment-summary.component";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import * as Calendar from "expo-calendar";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import moment from "moment";
import { Text } from "../typography/text.component";
import { CustomButton } from "../custom-button/custom-button.component";
import { Spacer } from "../spacer/spacer.component";
import { ModalComponent } from "../modal/modal.component";

const Done = styled(Text)`
  color: ${({ theme }) => theme.colors.text.inverse};
  font-size: ${({ theme }) => theme.fontSizes.title};
`;

export const SummaryModal = () => {
  const navigation = useNavigation();
  const shop = useSelector((state) => state.shop.info);
  const cart = useSelector((state) => state.cart);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isAppointmentAdded, setIsAppointmentAdded] = useState(null);

  useEffect(() => {
    if (cart.isFinished) setModalVisible(true);
  }, [cart]);

  const closeModal = () => {
    setModalVisible(false);
    navigation.navigate("Home");
  };
  const requestAccessToCalendar = async () => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();

    if (status === "granted") {
      addToCalendar();
    } else closeModal();
  };

  const addToCalendar = async () => {
    const defaultCalendar = await Calendar.getDefaultCalendarAsync();

    const dateString = cart.serviceDate;
    const startTime = cart.startTime;
    const endTime = cart.endTime;

    const startDate = moment(
      `${dateString} ${startTime}`,
      "YYYY-MM-DD h:mm A"
    ).toDate();

    const endDate = moment(
      `${dateString} ${endTime}`,
      "YYYY-MM-DD h:mm A"
    ).toDate();

    const event = {
      title: shop.name,
      startDate,
      endDate,
      timeZone: shop.timeZone, // Adjust based on your event's time zone
      location: shop.address,
      notes: shop.eventDetails?.notes,
      //set alarms
    };

    try {
      const response = await Calendar.createEventAsync(
        defaultCalendar.id,
        event
      );

      setIsAppointmentAdded(response);
    } catch (e) {
      console.log(e);
    }
  };

  const handleNavigation = () => {
    setModalVisible(false);
    navigation.navigate("Home");
  };

  return (
    <ModalComponent isModalVisible={isModalVisible}>
      {!isAppointmentAdded ? (
        <AppointmentSummary />
      ) : (
        <View style={{ alignItems: "center" }}>
          <Done>Appointment has been added!</Done>
        </View>
      )}

      <Spacer position="top" size="medium">
        {!isAppointmentAdded ? (
          <CustomButton
            text="Add to Calendar"
            buttonOptions={{ onPress: requestAccessToCalendar }}
          />
        ) : (
          <CustomButton
            text="Return to Main"
            buttonOptions={{
              onPress: handleNavigation,
            }}
          />
        )}
      </Spacer>
    </ModalComponent>
  );
};
