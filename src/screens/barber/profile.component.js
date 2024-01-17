import { useDispatch, useSelector } from "react-redux";
import { View } from "react-native";
import { SafeArea } from "../../components/utility/safe-area.component";
import { Text } from "../../components/typography/text.component";
import { selectBarberWithCurrentUser } from "../../redux/professionals/professionalsSelector";

export const Profile = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectBarberWithCurrentUser);
  const { id, name, email, phoneNumber, schedule, services, socialMedia } =
    currentUser;

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <SafeArea>
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
      </View>
    </SafeArea>
  );
};
