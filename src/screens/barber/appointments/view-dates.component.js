import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import {
  fetchAppointmentsStart,
  fetchBarberAppointmentsStart,
} from "../../../redux/appointments/appointmentsSlice";
import { selectBarberWithCurrentUser } from "../../../redux/professionals/professionalsSelector";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Text } from "../../../components/typography/text.component";
import { AppointmentDateList } from "../../../components/appointment-date-list/appointment-date-list.component";

export const ViewDates = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const currentUser = useSelector(selectBarberWithCurrentUser);
  const appointments = useSelector((state) => state.appointments.appointments);

  useEffect(() => {
    if (isFocused && currentUser) {
      dispatch(fetchBarberAppointmentsStart(currentUser.id));
    }
  }, [isFocused]);

  return (
    <SafeArea style={{ flex: 1, alignItems: "center" }}>
      {appointments && Object.values(appointments).length > 0 ? (
        <AppointmentDateList appointments={appointments} />
      ) : (
        <Text>No Appointments</Text>
      )}
    </SafeArea>
  );
};
