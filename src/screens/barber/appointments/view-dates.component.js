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
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const dates = useSelector((state) => state.appointments.dates);
  const currentUser = useSelector(selectBarberWithCurrentUser);

  useEffect(() => {
    if (isFocused && currentUser) {
      dispatch(fetchBarberAppointmentsStart(currentUser.id));
    }
  }, [isFocused]);

  // const dispatch = useDispatch();
  // const isFocused = useIsFocused();
  // const currentUser = useSelector(selectBarberWithCurrentUser);
  // const appointments = useSelector((state) => state.appointments.appointments);
  // var filteredData = {};

  // useEffect(() => {
  //   if (isFocused && currentUser) {
  //     dispatch(fetchBarberAppointmentsStart(currentUser.id));
  //   }

  //   if (appointments) {
  //     for (const [date, apts] of Object.entries(appointments)) {
  //       const filteredAppointments = apts.filter(
  //         (appointment) => appointment.status !== "rescheduled"
  //       );

  //       if (filteredAppointments.length > 0) {
  //         filteredData[date] = filteredAppointments;
  //       }
  //     }
  //   }
  // }, [isFocused]);

  return (
    <SafeArea style={{ flex: 1, alignItems: "center" }}>
      {dates ? <AppointmentDateList /> : <Text>No Appointments</Text>}
    </SafeArea>
  );
};
