import { SafeArea } from "../utility/safe-area.component";
import { Calendar } from "./components/calendar.component";
import { TimeSlot } from "./components/time-slot.component";
import moment from "moment";
import { DAYSOFWEEK } from "../../util/date";
import { TotalAvailable } from "./components/time-slot.component";
import { Spacer } from "../spacer/spacer.component";

export const Availability = ({
  selectedDate,
  selectedProfessional,
  appointments,
  estimatedDuration,
}) => {
  const selectedDayOfWeek = moment(selectedDate).day();
  const selectedDayOfWeekName = DAYSOFWEEK[selectedDayOfWeek];

  const schedule = selectedProfessional?.schedule?.[selectedDayOfWeekName];

  const checkProfessionalSchedule = (date) => {
    if (!selectedProfessional || !selectedProfessional.schedule) return null;

    const formattedDate = moment(date).format("MMM. Do, YYYY");

    if (selectedProfessional.daysOff?.includes(formattedDate)) return null;

    const dayOfWeek = moment(date).day();
    return selectedProfessional.schedule[DAYSOFWEEK[dayOfWeek]];
  };

  return (
    <SafeArea>
      <Calendar
        clickHandler={checkProfessionalSchedule}
        serviceDate={selectedDate}
      />
      {schedule ? (
        <TimeSlot
          schedule={schedule}
          appointments={appointments}
          professional={selectedProfessional}
          serviceDate={selectedDate}
          estimatedDuration={estimatedDuration}
        />
      ) : (
        <Spacer position="top" size="large">
          <TotalAvailable>0 available spots</TotalAvailable>
        </Spacer>
      )}
    </SafeArea>
  );
};
