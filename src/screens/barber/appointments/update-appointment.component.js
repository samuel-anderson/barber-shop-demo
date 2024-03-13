import { SafeArea } from "../../../components/utility/safe-area.component";
import { useIsFocused } from "@react-navigation/native";
import { Availability } from "../../../components/availability/availability.component";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { emptyCart } from "../../../redux/cart/cartSlice";
import { CustomButton } from "../../../components/custom-button/custom-button.component";
import { TouchableOpacity } from "react-native";
import { insertBooking } from "../../../services/sms/smsService";
import {
  editAppointmentStart,
  filterAppointmentStart,
} from "../../../redux/appointments/appointmentsSlice";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { selectBarberWithCurrentUser } from "../../../redux/professionals/professionalsSelector";

export const UpdateAppointment = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const selectedProfessional = useSelector(selectBarberWithCurrentUser);
  const selectedDate = useSelector((state) => state.appointments.selectedDate);
  const selectedAppointment = useSelector(
    (state) => state.appointments.selectedAppointment
  );
  const appointments = useSelector(
    (state) => state.appointments.barberAppointments
  );
  const filterSuccess = useSelector(
    (state) => state.appointments.filterSuccess
  );

  const { startTime, estimatedDuration, clientName, clientPhoneNumber } =
    selectedAppointment;

  const newDate = useSelector((state) => state.cart.serviceDate);
  const newStartTime = useSelector((state) => state.cart.startTime);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(emptyCart());
    });
    return unsubscribe;
  }, [navigation, dispatch]);

  useEffect(() => {
    if (filterSuccess) navigation.navigate("Select Date");
  }, [filterSuccess]);

  const updateAppointment = () => {
    try {
      dispatch(
        filterAppointmentStart({
          barberId: selectedProfessional.id,
          appointmentDate: selectedDate,
          startTime: startTime,
          cart: {
            professional: selectedProfessional,
            ...selectedAppointment,
            startTime: newStartTime,
            serviceDate: newDate,
            endTime: moment(newStartTime, "h:mm A")
              .add(estimatedDuration, "minutes")
              .format("h:mm A"),
          },
          clientInfo: {
            clientName: clientName,
            clientPhoneNumber: clientPhoneNumber,
          },
        })
      );
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SafeArea>
      <Availability
        selectedDate={newDate}
        selectedProfessional={selectedProfessional}
        appointments={appointments}
        estimatedDuration={estimatedDuration}
      />
      <TouchableOpacity
        disabled={newStartTime == null}
        onPress={() => updateAppointment()}
      >
        <CustomButton
          text="Update Appointment"
          variant="dark"
          buttonOptions={{
            style: { borderRadius: 10, margin: 5 },
          }}
        />
      </TouchableOpacity>
    </SafeArea>
  );
};
