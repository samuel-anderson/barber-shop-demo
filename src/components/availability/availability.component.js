import { SafeArea } from "../utility/safe-area.component";
import { Calendar } from "./components/calendar.component";
import { TimeSlot } from "./components/time-slot.component";
import { useSelector } from "react-redux";
import moment from "moment";
import { DAYSOFWEEK } from "../../util/date";
import { View, Text } from "react-native";

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
        <View>
          <Text>NO SCHEDULE</Text>
        </View>
      )}
    </SafeArea>
  );
};
