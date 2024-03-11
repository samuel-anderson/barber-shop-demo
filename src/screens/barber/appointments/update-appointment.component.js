import { SafeArea } from "../../../components/utility/safe-area.component";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { Availability } from "../../../components/availability/availability.component";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { emptyCart } from "../../../redux/cart/cartSlice";
import { CustomButton } from "../../../components/custom-button/custom-button.component";
import { TouchableOpacity } from "react-native";
import { insertBooking } from "../../../services/sms/smsService";
import { editAppointmentStart } from "../../../redux/appointments/appointmentsSlice";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

export const UpdateAppointment = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const { appointment, selectedDate, selectedProfessional } = route.params;
  const { startTime, estimatedDuration } = appointment;

  const newDate = useSelector((state) => state.cart.serviceDate);
  const newStartTime = useSelector((state) => state.cart.startTime);

  const appointments = useSelector((state) => state.appointments.appointments);

  useEffect(() => {
    if (isFocused) {
      dispatch(emptyCart());
    }
  }, [isFocused]);

  const updateAppointment = () => {
    try {
      insertBooking(
        {
          professional: selectedProfessional,
          ...appointment,
          startTime: newStartTime,
          serviceDate: newDate,
          endTime: moment(newStartTime, "h:mm A")
            .add(appointment.estimatedDuration, "minutes")
            .format("h:mm A"),
        },
        {
          clientName: appointment.clientName,
          clientPhoneNumber: appointment.clientPhoneNumber,
        }
      );

      dispatch(
        editAppointmentStart({
          barberId: selectedProfessional.id,
          appointmentDate: selectedDate,
          newStatus: "rescheduled",
          startTime: startTime,
        })
      );
      navigation.navigate("Select Date");
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
