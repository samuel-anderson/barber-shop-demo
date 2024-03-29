import { useMemo, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import RNPickerSelect from "react-native-picker-select";
import { CustomButton } from "../custom-button/custom-button.component";
import { Spacer } from "../spacer/spacer.component";
import { sortArrayOfDateStrings } from "../../util/date";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedDate } from "../../redux/appointments/appointmentsSlice";

export const AppointmentDateList = ({ appointments }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState(null);

  const dates = useSelector((state) => state.appointments.dates);

  const sortedDates = [...dates].sort(sortArrayOfDateStrings);

  const placeholder = {
    label: "Filter",
    value: null,
  };

  let items = useMemo(
    () =>
      sortedDates.map((date) => ({
        value: date,
        label: moment(date, "YYYY_MM_DD").format("MMM. Do, YYYY"),
      })),

    [sortedDates]
  );

  const clickHandler = (selectedDate) => {
    dispatch(setSelectedDate(selectedDate));
    navigation.navigate("Select Appointment");
  };

  return (
    <>
      <View style={styles.container}>
        <RNPickerSelect
          onValueChange={(value) => setSelectedValue(value)}
          items={items}
          placeholder={placeholder}
          style={pickerSelectStyles}
        />
      </View>
      <ScrollView style={styles.scrollContainer}>
        {sortedDates
          .filter((date) => {
            return selectedValue ? selectedValue == date : true;
          })
          .map((date, idx) => {
            const formattedDate = moment(date, "YYYY_MM_DD").format(
              "MMM. Do, YYYY"
            );

            return (
              <Spacer position="top" size="small" key={idx}>
                <CustomButton
                  text={formattedDate}
                  variant="dark"
                  buttonOptions={{
                    style: { borderRadius: 10 },
                    onPress: () => clickHandler(date),
                  }}
                />
              </Spacer>
            );
          })}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
  },
  scrollContainer: {
    width: "100%",
    padding: 20,
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
    paddingRight: 30,
    backgroundColor: "gray",
    ...styles.text,
  },
  placeholder: {
    ...styles.text,
  },
});
