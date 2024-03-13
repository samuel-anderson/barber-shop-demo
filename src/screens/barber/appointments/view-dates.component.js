import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { fetchBarberAppointmentsStart } from "../../../redux/appointments/appointmentsSlice";
import { selectBarberWithCurrentUser } from "../../../redux/professionals/professionalsSelector";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Text } from "../../../components/typography/text.component";
import { AppointmentDateList } from "../../../components/appointment-date-list/appointment-date-list.component";

export const ViewDates = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const dates = useSelector((state) => state.appointments.dates);

  const currentUser = useSelector(selectBarberWithCurrentUser);
  const appointments = useSelector(
    (state) => state.appointments.barberAppointments
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(fetchBarberAppointmentsStart(currentUser.id));
    });
    return unsubscribe;
  }, [navigation, dispatch]);

  return (
    <SafeArea style={{ flex: 1, alignItems: "center" }}>
      {dates && dates.length > 0 ? (
        <AppointmentDateList appointments={appointments} />
      ) : (
        <Text>No Appointments</Text>
      )}
    </SafeArea>
  );
};
