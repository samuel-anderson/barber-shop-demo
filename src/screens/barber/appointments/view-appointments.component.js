import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { AppointmentCardComponent } from "../../../components/appointment-card/appointment-card.component";
import styled from "styled-components/native";
import { FlatList, View } from "react-native";
import { Text } from "../../../components/typography/text.component";
import moment from "moment";
import { useSelector } from "react-redux";

export const AppointmentCardList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

export const ViewAppointments = () => {
  const selectedDate = useSelector((state) => state.appointments.selectedDate);
  const appointments = useSelector(
    (state) => state.appointments.barberAppointments
  );
  const selectedAppointments = appointments[selectedDate];

  return (
    <SafeArea>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 30 }}>
          {moment(selectedDate, "YYYY_MM_DD").format("MMM. Do YYYY")}
        </Text>
      </View>
      <AppointmentCardList
        data={
          selectedAppointments &&
          selectedAppointments.sort((a, b) => {
            // Extract the start times from the objects
            const timeA = a.startTime;
            const timeB = b.startTime;

            // Use Moment.js to parse the time strings and compare them
            return moment(timeA, "h:mm A").diff(moment(timeB, "h:mm A"));
          })
        }
        renderItem={({ item }) => {
          return (
            <Spacer position="bottom" size="large">
              <AppointmentCardComponent item={item} />
            </Spacer>
          );
        }}
        keyExtractor={(item) => item.startTime}
      />
    </SafeArea>
  );
};
