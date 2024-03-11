import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointmentsStart } from "../../../redux/appointments/appointmentsSlice";
import {
  matchDatabaseDateFormat,
  generateTimeSlots,
  isBetweenTimes,
} from "../../../util/date"; //you package to camel case
import { ScrollView, View } from "react-native";

import { SlotContainer } from "./time-slot.styles";
import { TimeSlotCell } from "./time-slot-cell.component";
import moment from "moment";
import styled from "styled-components/native";
import { Spacer } from "../../spacer/spacer.component";
import { Text } from "../../typography/text.component";
import { useIsFocused } from "@react-navigation/native";

export const TotalAvailable = styled(Text)`
  font-size: ${({ theme }) => theme.fontSizes.title};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const TimeSlot = ({
  schedule,
  professional,
  serviceDate,
  appointments,
  estimatedDuration,
}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const scheduledAppointments =
    appointments?.[professional.id]?.[matchDatabaseDateFormat(serviceDate)] ||
    [];

  useEffect(() => {
    if (isFocused) {
      dispatch(fetchAppointmentsStart());
    }
  }, [dispatch, isFocused]);

  const filterTimeSlots = (timeSlot) => {
    if (!timeSlot) return true;

    let slot = moment(timeSlot, "h:mm A");

    return isBetweenTimes(
      slot,
      scheduledAppointments.filter((appt) => appt.status != "rescheduled"),
      estimatedDuration
    );
  };

  const availableSpots = generateTimeSlots(schedule.start, schedule.end).filter(
    filterTimeSlots
  );
  return (
    <>
      <Spacer position="top" size="large">
        <TotalAvailable>{availableSpots.length} available spots</TotalAvailable>
      </Spacer>
      <Spacer position="top" size="large">
        <ScrollView style={{ height: "62%" }}>
          <SlotContainer>
            {availableSpots.map((slot, idx) => (
              <TimeSlotCell key={idx} slot={slot} />
            ))}
          </SlotContainer>
        </ScrollView>
      </Spacer>
    </>
  );
};
