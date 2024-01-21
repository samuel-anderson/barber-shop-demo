import { useDispatch, useSelector } from "react-redux";
import { View, StyleSheet } from "react-native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Text } from "../../../components/typography/text.component";
import { selectBarberWithCurrentUser } from "../../../redux/professionals/professionalsSelector";
import RNPickerSelect from "react-native-picker-select";
import { Spacer } from "../../../components/spacer/spacer.component";
import { CustomButton } from "../../../components/custom-button/custom-button.component";
import { useNavigation } from "@react-navigation/native";

export const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const currentUser = useSelector(selectBarberWithCurrentUser);
  const {
    id,
    firstName,
    lastName,
    email,
    phoneNumber,
    schedule,
    services,
    socialMedia,
  } = currentUser;

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  let items = daysOfWeek.map((day) => {
    return {
      value: day,
      label: day,
    };
  });

  const placeholder = {
    label: "Select a time...",
    value: null,
  };

  return (
    <SafeArea>
      <View style={{ width: "100%", padding: 20 }}>
        {["Edit Contact Information", "Edit Schedule"].map((screen) => {
          return (
            <Spacer position="top" size="small" key={screen}>
              <CustomButton
                text={screen}
                variant="dark"
                buttonOptions={{
                  style: { borderRadius: 10 },
                  onPress: () => {
                    navigation.navigate(screen, { user: currentUser });
                  },
                }}
              />
            </Spacer>
          );
        })}
      </View>
      {/* <View>
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
      <View>
        <Text>{name}</Text>
        <Text>{email}</Text>
        <Text>{phoneNumber}</Text>
        {daysOfWeek.map((day) => (
          <View key={day} style={{ margin: 20 }}>
            <Text>{day}</Text>
            {schedule[day.toLowerCase()] ? (
              schedule[day.toLowerCase()].map((timeSlot, index) => (
                <Text key={index}>
                  {timeSlot.start} - {timeSlot.end}
                </Text>
              ))
            ) : (
              <Text>Not working</Text>
            )}
          </View>
        ))}
      </View> */}
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    // borderWidth: 1,
    // borderColor: "gray",
    // borderRadius: 4,
    color: "white",
    //paddingRight: 30,
    width: "25%",
    backgroundColor: "black",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: styles.inputIOS,
});
