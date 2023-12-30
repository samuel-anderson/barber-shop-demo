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

export const TotalAvailable = styled(Text)`
  font-size: ${({ theme }) => theme.fontSizes.title};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const TimeSlot = ({ schedule }) => {
  const dispatch = useDispatch();
  const estimatedDuration = useSelector(
    (state) => state.cart.estimatedDuration
  );

  useEffect(() => {
    dispatch(fetchAppointmentsStart());
  }, [dispatch]);

  const appointments = useSelector((state) => state.appointments.appointments);
  const professional = useSelector((state) => state.cart.professional);
  const serviceDate = useSelector((state) => state.cart.serviceDate);
  const scheduledAppointments = appointments[professional.id]
    ? appointments[professional.id][matchDatabaseDateFormat(serviceDate)]
    : null;

  const filterTimeSlots = (timeSlot) => {
    let keepTimeSlot = true;
    let slot = moment(timeSlot, "h:mm A");

    if (scheduledAppointments) {
      return isBetweenTimes(
        keepTimeSlot,
        slot,
        scheduledAppointments,
        estimatedDuration
      );
    }
    return keepTimeSlot;
  };

  const availableSpots = schedule.map((day) => {
    return generateTimeSlots(day.start, day.end).filter(filterTimeSlots);
  });

  const availableSpotsList = [].concat(...availableSpots);
  return (
    <>
      <Spacer position="top" size="large">
        <TotalAvailable>
          {availableSpotsList.length} available spots
        </TotalAvailable>
      </Spacer>
      <Spacer position="top" size="large">
        <ScrollView style={{ height: "62%" }}>
          <SlotContainer>
            {availableSpotsList.map((slot, idx) => (
              <TimeSlotCell key={idx} slot={slot} />
            ))}
          </SlotContainer>
        </ScrollView>
      </Spacer>
    </>
  );
};
