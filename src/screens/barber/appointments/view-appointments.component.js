import { SafeArea } from "../../../components/utility/safe-area.component";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { AppointmentCardComponent } from "../../../components/appointment-card/appointment-card.component";
import styled from "styled-components/native";
import { FlatList, View } from "react-native";
import { Text } from "../../../components/typography/text.component";
import moment from "moment";

export const AppointmentCardList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

export const ViewAppointments = () => {
  const route = useRoute();
  const { appointments, date } = route.params;

  return (
    <SafeArea>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 30 }}>
          {moment(date, "YYYY_MM_DD").format("MMM. Do YYYY")}
        </Text>
      </View>
      <AppointmentCardList
        data={[...appointments]
          .filter((appt) => appt.status != "rescheduled")
          .sort((a, b) => {
            // Extract the start times from the objects
            const timeA = a.startTime;
            const timeB = b.startTime;

            // Use Moment.js to parse the time strings and compare them
            return moment(timeA, "h:mm A").diff(moment(timeB, "h:mm A"));
          })}
        renderItem={({ item, index }) => {
          return (
            <Spacer position="bottom" size="large">
              <AppointmentCardComponent item={item} date={date} index={index} />
            </Spacer>
          );
        }}
        keyExtractor={(item) => item.startTime}
      />
    </SafeArea>
  );
};
