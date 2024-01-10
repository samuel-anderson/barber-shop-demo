import { View } from "react-native";
import { CustomButton } from "../custom-button/custom-button.component";
import { Spacer } from "../spacer/spacer.component";
import { SafeArea } from "../utility/safe-area.component";
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

  const items = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];

  return (
    <>
      <RNPickerSelect
        onValueChange={(value) => setSelectedValue(value)}
        items={items}
        placeholder={placeholder}
      />
      <View style={{ width: "100%", padding: 20 }}>
        {sortedDates.map((date) => {
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
      </View>
    </>
  );
};
