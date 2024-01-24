import { View } from "react-native";
import { Text } from "../../../components/typography/text.component";
import RNPickerSelect from "react-native-picker-select";
import { useState } from "react";
import styled from "styled-components/native";

const Day = styled(Text)`
  font-size: ${({ theme }) => theme.fontSizes.title};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const EditSchedule = ({ route }) => {
  const { schedule } = route.params.user;

  let items = daysOfWeek.map((day) => {
    return {
      value: day,
      label: day,
    };
  });

  const placeholder = {
    label: "Select a time...",
    value: null,
  };

  return (
    <>
      <Text>Edit Schedule</Text>
      <View>
        {daysOfWeek.map((day) => (
          <View key={day} style={{ margin: 20 }}>
            <Day>{day}</Day>
            {schedule[day.toLowerCase()] ? (
              schedule[day.toLowerCase()].map((timeSlot, index) => (
                <Text key={index}>
                  {timeSlot.start} - {timeSlot.end}
                </Text>
              ))
            ) : (
              <Text>Not working</Text>
            )}
          </View>
        ))}
      </View>
    </>
  );
};
