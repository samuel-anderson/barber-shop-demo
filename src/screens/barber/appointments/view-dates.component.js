import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { fetchBarberAppointmentsStart } from "../../../redux/appointments/appointmentsSlice";
import { selectBarberWithCurrentUser } from "../../../redux/professionals/professionalsSelector";
import { View } from "react-native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Text } from "../../../components/typography/text.component";
import moment from "moment";
import { CustomButton } from "../../../components/custom-button/custom-button.component";
import { Spacer } from "../../../components/spacer/spacer.component";

export const ViewDates = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const currentUser = useSelector(selectBarberWithCurrentUser);
  const appointments = useSelector((state) => state.appointments.appointments);

  useEffect(() => {
    if (isFocused && currentUser) {
      dispatch(fetchBarberAppointmentsStart(currentUser.id));
    }
  }, [isFocused]);

  return (
    <SafeArea style={{ flex: 1, alignItems: "center" }}>
      <View style={{ width: "100%", padding: 10 }}>
        {appointments &&
          Object.keys(appointments).map((date) => {
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
    </SafeArea>
  );
};
