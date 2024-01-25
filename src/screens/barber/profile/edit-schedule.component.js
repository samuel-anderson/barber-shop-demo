import { View, ScrollView, TouchableOpacity } from "react-native";
import { Text } from "../../../components/typography/text.component";
import DateTimePicker from "@react-native-community/datetimepicker";
import styled from "styled-components/native";
import moment from "moment";
import { FontAwesome } from "@expo/vector-icons";

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

const IconButton = styled(TouchableOpacity)`
  padding: 15px;
`;

export const EditSchedule = ({ route }) => {
  const { schedule } = route.params.user;
  const mode = "time";

  // set schedule to updateSchedule = useState(schedule)
  //on change updateSchedule[day] = object {start, end}
  //on change must be smart send (day, start/end)
  //error checks for end time greater than start
  //clean code add components, abstract

  //upate button
  //then modal

  //add days off*************

  return (
    <ScrollView>
      <View style={{ margin: 15 }}>
        {daysOfWeek.map((day) => (
          <View
            key={day}
            style={{
              justifyContent: "center",
              padding: 10,
              borderBottomWidth: 5,
              borderBottomColor: "rgba(0, 0, 0, 0.8)",
            }}
          >
            <Day>{day}</Day>
            {schedule[day.toLowerCase()] ? (
              (() => {
                const timeSlot = schedule[day.toLowerCase()];
                const initialStartTime = moment(
                  timeSlot.start,
                  "h:mm A"
                ).toDate();
                const initialEndTime = moment(timeSlot.end, "h:mm A").toDate();

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
                          onChange={() => {}}
                          minuteInterval={15}
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
                          onChange={() => {}}
                          minuteInterval={15}
                        />
                      </View>
                    </View>
                  </View>
                );
              })()
            ) : (
              <View>
                <IconButton
                  onPress={() => {
                    console.log(day);
                  }}
                >
                  <FontAwesome name="calendar-plus-o" size={24} color="black" />
                </IconButton>
              </View>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
