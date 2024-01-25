import { View, ScrollView, TouchableOpacity } from "react-native";
import { Text } from "../../../components/typography/text.component";
import DateTimePicker from "@react-native-community/datetimepicker";
import styled from "styled-components/native";
import moment from "moment";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { Spacer } from "../../../components/spacer/spacer.component";
import { CustomButton } from "../../../components/custom-button/custom-button.component";
import { editScheduleStart } from "../../../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { ModalComponent } from "../../../components/modal/modal.component";
import { useNavigation } from "@react-navigation/native";

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

const IconButton = styled(TouchableOpacity)`
  margin-top: 10px;
`;

export const EditSchedule = ({ route }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigation = useNavigation();

  const { id, schedule } = route.params.user;
  const mode = "time";
  const [updatedSchedule, setUpdatedSchedule] = useState(schedule);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // set schedule to updateSchedule = useState(schedule)
  //on change updateSchedule[day] = object {start, end}
  //on change must be smart send (day, start/end)
  //error checks for end time greater than start
  //clean code add components, abstract

  //upate button
  //then modal

  //add days off*************

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

  const startTimeChangeHandler = (day, startTime) => {
    const start = moment(startTime, "h:mm A");
    const end = moment(updatedSchedule[day].end, "h:mm A");

    if (start.isBefore(end)) {
      setUpdatedSchedule({
        ...updatedSchedule,
        [day]: { start: startTime, end: updatedSchedule[day].end },
      });
    } else {
      alert("Start time cannot be AFTER end time");
    }
  };

  const endTimeChangeHandler = (day, endTime) => {
    const start = moment(updatedSchedule[day].start, "h:mm A");
    const end = moment(endTime, "h:mm A");

    if (end.isAfter(start)) {
      setUpdatedSchedule({
        ...updatedSchedule,
        [day]: { start: updatedSchedule[day].start, end: endTime },
      });
    } else {
      alert("End time cannot be BEFORE start time");
    }
  };

  const onSaveChanges = async () => {
    try {
      //check for errors first
      dispatch(
        editScheduleStart({
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
  return (
    <ScrollView>
      <View style={{ margin: 15 }}>
        {daysOfWeek.map((item) => {
          const day = item.toLocaleLowerCase();
          return (
            <View
              key={day}
              style={{
                padding: 10,
                borderBottomWidth: 5,
                borderBottomColor: "rgba(0, 0, 0, 0.8)",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
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
              <View style={{ flex: 1 }}>
                {updatedSchedule[day.toLowerCase()] ? (
                  (() => {
                    const timeSlot = updatedSchedule[day.toLowerCase()];
                    const initialStartTime = moment(
                      timeSlot.start,
                      "h:mm A"
                    ).toDate();
                    const initialEndTime = moment(
                      timeSlot.end,
                      "h:mm A"
                    ).toDate();

                    return (
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 10,
                          }}
                        >
                          <View
                            style={{
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Text>START</Text>
                            <DateTimePicker
                              testID="timePicker"
                              value={initialStartTime}
                              mode={mode}
                              is24Hour={true}
                              onChange={(_, time) =>
                                startTimeChangeHandler(
                                  day,
                                  moment(time).format("h:mm A")
                                )
                              }
                              minuteInterval={15}
                              style={{
                                width: 100,
                                height: 30,
                              }}
                            />
                          </View>

                          <View
                            style={{
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Text>END</Text>
                            <DateTimePicker
                              testID="timePicker"
                              value={initialEndTime}
                              mode={mode}
                              is24Hour={true}
                              minuteInterval={15}
                              onChange={(_, time) =>
                                endTimeChangeHandler(
                                  day,
                                  moment(time).format("h:mm A")
                                )
                              }
                              style={{
                                width: 100,
                                height: 30,
                              }}
                            />
                          </View>
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
    </ScrollView>
  );
};
