import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { fetchBarberAppointmentsStart } from "../../../redux/appointments/appointmentsSlice";
import { selectBarberWithCurrentUser } from "../../../redux/professionals/professionalsSelector";
import { View } from "react-native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Text } from "../../../components/typography/text.component";
import moment from "moment";
import { CustomButton } from "../../../components/custom-button/custom-button.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { AppointmentDateList } from "../../../components/appointment-date-list/appointment-date-list.component";

export const ViewDates = ({ navigation }) => {
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
      {appointments ? (
        <AppointmentDateList appointments={appointments} />
      ) : (
        <Text>No Appointments</Text>
      )}
    </SafeArea>
  );
};
