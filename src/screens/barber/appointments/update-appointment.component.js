import { SafeArea } from "../../../components/utility/safe-area.component";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { Availability } from "../../../components/availability/availability.component";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { emptyCart } from "../../../redux/cart/cartSlice";
import { CustomButton } from "../../../components/custom-button/custom-button.component";
import { TouchableOpacity } from "react-native";
import { rescheduleAppointmentStart } from "../../../redux/appointments/appointmentsSlice";

export const UpdateAppointment = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

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

  const updateAppointment = async () => {
    try {
      //check for errors first

      dispatch(
        rescheduleAppointmentStart({
          barberId: selectedProfessional.id,
          oldAppointmentDate: selectedDate,
          oldStartTime: startTime,
          newStartTime: newStartTime,
          newDate: newDate,
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
