import { SafeArea } from "../../../components/utility/safe-area.component";
import { useRoute } from "@react-navigation/native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { AppointmentCardComponent } from "../../../components/appointment-card/appointment-card.component";
import styled from "styled-components/native";
import { FlatList } from "react-native";

export const AppointmentCardList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

export const ViewAppointments = () => {
  const route = useRoute();
  const { appointments } = route.params;

  return (
    <SafeArea>
      <AppointmentCardList
        data={appointments}
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
