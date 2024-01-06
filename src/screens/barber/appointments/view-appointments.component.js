import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { fetchAppointmentsStart } from "../../../redux/appointments/appointmentsSlice";
import { selectBarberWithCurrentUser } from "../../../redux/professionals/professionalsSelector";
import { View } from "react-native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Text } from "../../../components/typography/text.component";

export const ViewAppointments = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const currentUser = useSelector(selectBarberWithCurrentUser);

  const appointments = useSelector((state) => state.appointments.appointments);

  //CLEAN UP CODE
  const getAppointments = (currentUser, appointments) => {
    if (!currentUser || !appointments || !appointments[currentUser.id]) return;

    let appts = appointments[currentUser.id];

    const dates = Object.keys(appts);
    const list = [];

    for (let i = 0; i < dates.length; i++) {
      appts[dates[i]].map((appt) =>
        list.push(
          <Text key={`${appt.serviceDate}-${appt.startTime}`}>
            {appt.serviceDate} - {appt.clientName} {appt.startTime}
          </Text>
        )
      );
    }

    return list;
  };

  useEffect(() => {
    if (isFocused) {
      dispatch(fetchAppointmentsStart());
    }
  }, [isFocused]);

  return (
    <SafeArea
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <View style={{ width: "80%" }}>
        <Text>View Appoinments Screen</Text>
        {getAppointments(currentUser, appointments)}
      </View>
    </SafeArea>
  );
};
