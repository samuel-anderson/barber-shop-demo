import { TimeBottomSheet } from "../../components/time-bottom-sheet/time-bottom-sheet.component";
import { Availability } from "../../components/availability/availability.component";
import { useSelector } from "react-redux";

export const ChooseTimeScreen = () => {
  const selectedDate = useSelector((state) => state.cart.serviceDate);
  const selectedProfessional = useSelector((state) => state.cart.professional);
  const appointments = useSelector((state) => state.appointments.appointments);
  const estimatedDuration = useSelector(
    (state) => state.cart.estimatedDuration
  );

  return (
    <>
      <Availability
        selectedDate={selectedDate}
        selectedProfessional={selectedProfessional}
        appointments={appointments}
        estimatedDuration={estimatedDuration}
      />
      <TimeBottomSheet />
    </>
  );
};
