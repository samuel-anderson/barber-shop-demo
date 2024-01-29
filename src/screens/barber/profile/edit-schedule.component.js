import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "../../../components/typography/text.component";
import styled from "styled-components/native";
import moment from "moment";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { Spacer } from "../../../components/spacer/spacer.component";
import { CustomButton } from "../../../components/custom-button/custom-button.component";
import { editProfileStart } from "../../../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { ModalComponent } from "../../../components/modal/modal.component";
import { useNavigation } from "@react-navigation/native";
import { TimePickerComponent } from "../../../components/time-picker/time-picker-component";
import { TimeComponent } from "./components/time.component";

const Day = styled(Text)`
  font-size: ${({ theme }) => theme.fontSizes.title};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const Done = styled(Text)`
  color: ${({ theme }) => theme.colors.text.inverse};
  font-size: ${({ theme }) => theme.fontSizes.title};
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

const pickedDay = {
  day: "",
  selection: "",
};

const IconButton = styled(TouchableOpacity)`
  margin-top: 10px;
`;

export const EditSchedule = ({ route }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigation = useNavigation();

  const { id, schedule } = route.params.user;
  const [updatedSchedule, setUpdatedSchedule] = useState(schedule);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [selectedDay, setSelectedDay] = useState(pickedDay);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (value) => {
    const time = moment(value).format("h:mm A");

    if (checkErrors(value)) {
      alert(
        selectedDay.selection == "start"
          ? "Start time cannot be AFTER end time"
          : "End time cannot be BEFORE start time"
      );
      return;
    }

    setUpdatedSchedule({
      ...updatedSchedule,
      [selectedDay.day]: {
        ...updatedSchedule[selectedDay.day],
        [selectedDay.selection]: time,
      },
    });

    hideDatePicker();
  };

  const addSchedule = (day) => {
    if (!updatedSchedule[day]) {
      setUpdatedSchedule({
        ...updatedSchedule,
        [day]: {
          start: "10:00 AM",
          end: "10:00 PM",
        },
      });
    }
  };
  const removeSchedule = (day) => {
    setUpdatedSchedule({
      ...updatedSchedule,
      [day]: null,
    });
  };

  const checkErrors = (time) => {
    let start = moment(time, "h:mm A");
    let end = moment(updatedSchedule[selectedDay.day].end, "h:mm A");

    if (selectedDay.selection == "start" && !start.isBefore(end)) return true;

    start = moment(updatedSchedule[selectedDay.day].start, "h:mm A");
    end = moment(time, "h:mm A");

    if (selectedDay.selection == "end" && !end.isAfter(start)) return true;

    return false;
  };

  const onSaveChanges = async () => {
    try {
      //check for errors first
      dispatch(
        editProfileStart({
          items: {
            [id]: {
              schedule: updatedSchedule,
            },
          },
        })
      );
      setIsModalVisible(true);
    } catch (e) {
      console.error(e);
    }
  };

  const timePressHandler = (day, selection) => {
    setSelectedDay({
      day: day,
      selection: selection,
    });
    showDatePicker();
  };

  return (
    <View style={styles.container}>
      <View>
        {daysOfWeek.map((item) => {
          const day = item.toLocaleLowerCase();
          return (
            <View key={day} style={styles.schedule_container}>
              <View
                style={{
                  justifyContent: "start",
                  flex: 1,
                }}
              >
                <Day>{item}</Day>

                {!updatedSchedule[day] ? (
                  <IconButton
                    onPress={() => {
                      addSchedule(day);
                    }}
                  >
                    <FontAwesome
                      name="calendar-plus-o"
                      size={24}
                      color="black"
                    />
                  </IconButton>
                ) : (
                  <IconButton
                    onPress={() => {
                      removeSchedule(day);
                    }}
                  >
                    <FontAwesome name="remove" size={24} color="black" />
                  </IconButton>
                )}
              </View>
              <View>
                {updatedSchedule[day.toLowerCase()] ? (
                  (() => {
                    return (
                      <View>
                        <View style={styles.time_component_container}>
                          <TimeComponent
                            onPressHandler={() =>
                              timePressHandler(day, "start")
                            }
                            updatedSchedule={updatedSchedule}
                            day={day}
                            selection="start"
                          />

                          <TimeComponent
                            onPressHandler={() => timePressHandler(day, "end")}
                            updatedSchedule={updatedSchedule}
                            day={day}
                            selection="end"
                          />
                        </View>
                      </View>
                    );
                  })()
                ) : (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      flex: 1,
                    }}
                  >
                    <Text>No Schedule</Text>
                  </View>
                )}
              </View>
            </View>
          );
        })}
      </View>
      <Spacer size="medium" position="top">
        <TouchableOpacity onPress={onSaveChanges}>
          <CustomButton
            text="Update"
            variant="dark"
            buttonOptions={{
              loading: user.loading,
              style: { borderRadius: 10 },
            }}
          />
        </TouchableOpacity>
      </Spacer>
      <ModalComponent isModalVisible={isModalVisible}>
        <View style={{ alignItems: "center" }}>
          <Done>Schedule has been updated!</Done>
        </View>
        <Spacer size="medium" position="top">
          <CustomButton
            text="Done"
            buttonOptions={{
              onPress: () => {
                setIsModalVisible(false);
                navigation.navigate("Edit Profile");
              },
            }}
          />
        </Spacer>
      </ModalComponent>
      <TimePickerComponent
        isDatePickerVisible={isDatePickerVisible}
        handleConfirm={handleConfirm}
        hideDatePicker={hideDatePicker}
        minInterval={15}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "space-between", padding: 15 },
  schedule_container: {
    padding: 5,
    borderBottomWidth: 3,
    borderBottomColor: "rgba(0, 0, 0, 0.8)",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  time_component_container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
});
