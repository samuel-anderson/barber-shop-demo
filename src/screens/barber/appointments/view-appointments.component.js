import { View } from "react-native";
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { useRoute } from "@react-navigation/native";
import { Spacer } from "../../../components/spacer/spacer.component";

export const ViewAppointments = () => {
  const route = useRoute();
  const { appointments } = route.params;

  return (
    <SafeArea>
      {appointments.map((appointment) => {
        return (
          <Spacer position="top" size="medium">
            <Text>{appointment.clientName}</Text>
            <Text>
              {appointment.startTime} - {appointment.endTime},
            </Text>
            <Text>{appointment.estimatedDuration / 60}</Text>

            <Text>{appointment.service.title}</Text>
          </Spacer>
        );
      })}
    </SafeArea>
  );
};
