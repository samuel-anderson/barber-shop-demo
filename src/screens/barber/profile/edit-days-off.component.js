import { StyleSheet, TouchableOpacity, View } from "react-native";
import { CustomButton } from "../../../components/custom-button/custom-button.component";
import { Text } from "../../../components/typography/text.component";
import { useState } from "react";
import { Spacer } from "../../../components/spacer/spacer.component";
import { useDispatch, useSelector } from "react-redux";
import { editDaysOffStart } from "../../../redux/user/userSlice";
import { useNavigation } from "@react-navigation/native";
import { ModalComponent } from "../../../components/modal/modal.component";
import { FontAwesome } from "@expo/vector-icons";

import DateTimePicker, {
  RCTDateTimePickerNative,
} from "@react-native-community/datetimepicker";
import moment from "moment";

import styled, { useTheme } from "styled-components/native";

const Done = styled(Text)`
  color: ${({ theme }) => theme.colors.text.inverse};
  font-size: ${({ theme }) => theme.fontSizes.title};
`;

export const EditDaysOff = ({ route }) => {
  const theme = useTheme();
  const { id, daysOff } = route.params.user;

  const [updatedDaysOff, setUpdatedDaysOff] = useState(daysOff ? daysOff : []);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const addDayOff = (dayOff) => {
    const value = moment(dayOff).format("MMM. Do, YYYY");

    if (updatedDaysOff.indexOf(value) == -1) {
      setUpdatedDaysOff([...updatedDaysOff, value]);
    }
  };

  const removeDayOff = (dayOff) => {
    const daysOff = updatedDaysOff.filter((item) => item != dayOff);
    setUpdatedDaysOff([...daysOff]);
  };

  const onSaveChanges = async () => {
    try {
      //check for errors first
      dispatch(
        editDaysOffStart({
          items: {
            [id]: {
              daysOff: updatedDaysOff,
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
    <View style={styles.container}>
      <Spacer size="large" position="bottom">
        <TouchableOpacity onPress={onSaveChanges}>
          <CustomButton
            text="Save"
            variant="dark"
            buttonOptions={{
              style: { borderRadius: 10 },
            }}
          />
        </TouchableOpacity>
      </Spacer>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            addDayOff(selectedDate);
          }}
        >
          <FontAwesome name="calendar-plus-o" size={50} color="black" />
        </TouchableOpacity>

        <DateTimePicker
          testID="datePicker"
          value={selectedDate}
          mode="date"
          onChange={(_, date) => setSelectedDate(date)}
          minimumDate={moment("2024-01-01").toDate()}
          maximumDate={moment("2024-12-31").toDate()}
        />
      </View>
      <View style={{ marginTop: 20 }}>
        {updatedDaysOff.map((dayOff) => (
          <View
            key={dayOff}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              marginBottom: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                removeDayOff(dayOff);
              }}
              style={{ padding: 10 }}
            >
              <FontAwesome name="remove" size={30} color="black" />
            </TouchableOpacity>

            <Text>{dayOff}</Text>
          </View>
        ))}
      </View>
      <ModalComponent isModalVisible={isModalVisible}>
        <View style={{ alignItems: "center" }}>
          <Done>Days Off has been updated!</Done>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
