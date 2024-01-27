import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { CustomButton } from "../../../components/custom-button/custom-button.component";
import { Text } from "../../../components/typography/text.component";
import { useState } from "react";
import { Spacer } from "../../../components/spacer/spacer.component";
import { useDispatch } from "react-redux";
import { editProfileStart } from "../../../redux/user/userSlice";
import { useNavigation } from "@react-navigation/native";
import { ModalComponent } from "../../../components/modal/modal.component";
import { FontAwesome } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import styled from "styled-components/native";

const Done = styled(Text)`
  color: ${({ theme }) => theme.colors.text.inverse};
  font-size: ${({ theme }) => theme.fontSizes.title};
`;

export const EditDaysOff = ({ route }) => {
  const { id, daysOff } = route.params.user;

  const [updatedDaysOff, setUpdatedDaysOff] = useState(daysOff ? daysOff : []);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const addDayOff = (dayOff) => {
    const value = moment(dayOff).format("MMM. Do, YYYY");

    if (updatedDaysOff.indexOf(value) == -1) {
      const sortedDates = [...updatedDaysOff, value]
        .map((date) => moment(date, "MMM. Do, YYYY"))
        .sort((a, b) => a - b)
        .map((date) => date.format("MMM. Do, YYYY"));

      setUpdatedDaysOff(sortedDates);
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
        editProfileStart({
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

  const handleConfirm = (date) => {
    addDayOff(date);
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={showDatePicker}
          style={{ alignItems: "center" }}
        >
          <FontAwesome name="calendar-plus-o" size={50} color="black" />
        </TouchableOpacity>

        <ScrollView>
          {updatedDaysOff.map((dayOff) => (
            <View
              key={dayOff}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginBottom: 5,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  removeDayOff(dayOff);
                }}
              >
                <FontAwesome name="remove" size={30} color="black" />
              </TouchableOpacity>

              <Text>{dayOff}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <TouchableOpacity onPress={onSaveChanges}>
        <CustomButton
          text="Save"
          variant="dark"
          buttonOptions={{
            style: { borderRadius: 10, marginTop: 10 },
          }}
        />
      </TouchableOpacity>
      <ModalComponent isModalVisible={isModalVisible}>
        <View style={{ alignItems: "center" }}>
          <Done>Days Off has been updated!</Done>
        </View>
        <Spacer size="small" position="top">
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
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        value={new Date()}
        mode="date"
        minimumDate={moment("2024-01-01").toDate()}
        maximumDate={moment("2024-12-31").toDate()}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: "space-between",
    alignContent: "center",
    flex: 1,
  },
});
