import { SafeArea } from "../utility/safe-area.component";
import { Calendar } from "./components/calendar.component";
import { TimeSlot } from "./components/time-slot.component";
import { useSelector } from "react-redux";
import moment from "moment";
import { DAYSOFWEEK } from "../../util/date";
import { View } from "react-native";
import { TotalAvailable } from "./components/time-slot.component";
import { Spacer } from "../spacer/spacer.component";

export const Availability = () => {
  const selectedDate = useSelector((state) => state.cart.serviceDate);
  const selectedProfessional = useSelector((state) => state.cart.professional);

  const selectedDayofWeek = selectedDate
    ? moment(selectedDate).day()
    : moment().day();

  const schedule =
    selectedProfessional && selectedProfessional.schedule
      ? selectedProfessional.schedule[DAYSOFWEEK[selectedDayofWeek]]
      : null;

  const checkProfessionalSchedule = (date) => {
    if (selectedProfessional.daysOff) {
      const val = moment(date).format("MMM. Do, YYYY");

      if (selectedProfessional.daysOff.indexOf(val) != -1) return null;
    }
    const day = moment(date).day();

    const hasSchedule =
      selectedProfessional && selectedProfessional.schedule
        ? selectedProfessional.schedule[DAYSOFWEEK[day]]
        : null;

    return hasSchedule;
  };

  return (
    <SafeArea>
      <Calendar clickHandler={checkProfessionalSchedule} />
      {schedule && (
        <TimeSlot schedule={schedule} selectedDayofWeek={selectedDayofWeek} />
      )}
      {!schedule && (
        <Spacer position="top" size="large">
          <TotalAvailable>0 available spots</TotalAvailable>
        </Spacer>
      )}
    </SafeArea>
  );
};
