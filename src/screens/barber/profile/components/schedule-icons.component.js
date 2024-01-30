import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const IconButton = styled(TouchableOpacity)`
  margin-top: 10px;
`;

export const ScheduleIcons = ({
  day,
  updatedSchedule,
  addSchedule,
  removeSchedule,
}) => {
  return !updatedSchedule[day] ? (
    <IconButton
      onPress={() => {
        addSchedule(day);
      }}
    >
      <FontAwesome name="calendar-plus-o" size={24} color="black" />
    </IconButton>
  ) : (
    <IconButton
      onPress={() => {
        removeSchedule(day);
      }}
    >
      <FontAwesome name="remove" size={24} color="black" />
    </IconButton>
  );
};
