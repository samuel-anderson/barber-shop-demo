import { useMemo, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import RNPickerSelect from "react-native-picker-select";
import { CustomButton } from "../custom-button/custom-button.component";
import { Spacer } from "../spacer/spacer.component";
import { sortArrayOfDateStrings } from "../../util/date";

export const AppointmentDateList = ({ appointments }) => {
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState(null);

  const sortedDates = Object.keys(appointments).sort(sortArrayOfDateStrings);

  const placeholder = {
    label: "Select a filter...",
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
          .filter((date) => (selectedValue ? selectedValue == date : true))
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
                    onPress: () => {
                      navigation.navigate("Select Appointment", {
                        appointments: appointments[date],
                      });
                    },
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
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "white",
    paddingRight: 30,

    backgroundColor: "#333333",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    ...styles.inputIOS,
  },
});
