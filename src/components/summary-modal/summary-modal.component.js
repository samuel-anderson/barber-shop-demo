import { AppointmentSummary } from "../appointment-summary/appointment-summary.component";
import { TouchableOpacity, View, StyleSheet, Modal } from "react-native";
import { Button } from "react-native-paper";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import * as Calendar from "expo-calendar";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import moment from "moment";
import Constants from "expo-constants";
import { Text } from "../typography/text.component";

const { eventDetails } = Constants.expoConfig;

const Done = styled(Text)`
  color: ${({ theme }) => theme.colors.text.inverse};
  font-size: ${({ theme }) => theme.fontSizes.title};
`;

export const SummaryModal = () => {
  const navigation = useNavigation();

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
      title: eventDetails.title,
      startDate,
      endDate,
      timeZone: eventDetails.timeZone, // Adjust based on your event's time zone
      location: eventDetails.location,
      notes: eventDetails.notes,
    };

    try {
      const response = await Calendar.createEventAsync(
        defaultCalendar.id,
        event
      );

      setIsAppointmentAdded(response);
    } catch (e) {}
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => {}}
    >
      <View style={styles.modal}>
        <View style={styles.modalContent}>
          {!isAppointmentAdded ? (
            <AppointmentSummary />
          ) : (
            <View style={{ alignItems: "center" }}>
              <Done>Appointment has been added!</Done>
            </View>
          )}

          {!isAppointmentAdded ? (
            <TouchableOpacity onPress={requestAccessToCalendar}>
              <Button style={styles.button}>
                <Text style={styles.closeBtn}>Add to Calendar</Text>
              </Button>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("Home");
              }}
            >
              <Button style={styles.button}>
                <Text style={styles.closeBtn}>Return to Main</Text>
              </Button>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "black",
    padding: 50,
    borderRadius: 10,
    elevation: 5,
    width: "97%",

    justifyContent: "center",
  },
  button: {
    width: "100%",
    marginTop: 20,
    backgroundColor: "rgb(0, 131, 255)",
  },
  closeBtn: {
    color: "white",
  },
});
