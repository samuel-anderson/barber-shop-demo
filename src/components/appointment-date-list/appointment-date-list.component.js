import { View, StyleSheet, ScrollView } from "react-native";
import { CustomButton } from "../custom-button/custom-button.component";
import { Spacer } from "../spacer/spacer.component";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { sortArrayOfDateStrings } from "../../util/date";
import RNPickerSelect from "react-native-picker-select";
import { useState } from "react";

export const AppointmentDateList = ({ appointments }) => {
  const navigation = useNavigation();
  const sortedDates = Object.keys(appointments).sort(sortArrayOfDateStrings);

  const [selectedValue, setSelectedValue] = useState(null);

  const placeholder = {
    label: "Select a filter...",
    value: null,
  };

  let items = sortedDates.map((date) => {
    return {
      value: date,
      label: moment(date, "YYYY_MM_DD").format("MMM. Do, YYYY"),
    };
  });

  return (
    <>
      <View
        style={{ justifyContent: "center", alignItems: "center", width: "90%" }}
      >
        <RNPickerSelect
          onValueChange={(value) => setSelectedValue(value)}
          items={items}
          placeholder={placeholder}
          style={{
            ...pickerSelectStyles,
            iconContainer: {
              top: 10,
              right: 12,
            },
          }}
        />
      </View>
      <ScrollView style={{ width: "100%", padding: 20 }}>
        {sortedDates
          .filter((date) => (selectedValue ? selectedValue == date : true))
          .map((date) => {
            const formattedDate = moment(date, "YYYY_MM_DD").format(
              "MMM. Do, YYYY"
            );

            return (
              <Spacer position="top" size="small" key={formattedDate}>
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
    padding: 10,
    backgroundColor: "#f0f0f0",
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
  inputIOS: styles.inputIOS,
});
