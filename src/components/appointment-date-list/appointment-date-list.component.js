import { View } from "react-native";
import { CustomButton } from "../custom-button/custom-button.component";
import { Spacer } from "../spacer/spacer.component";
import { SafeArea } from "../utility/safe-area.component";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { sortArrayOfDateStrings } from "../../util/date";

export const AppointmentDateList = ({ appointments }) => {
  const navigation = useNavigation();
  const sortedDates = Object.keys(appointments).sort(sortArrayOfDateStrings);

  return (
    <View style={{ width: "100%", padding: 10 }}>
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
  );
};
