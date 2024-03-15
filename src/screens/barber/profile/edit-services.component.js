import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { CustomButton } from "../../../components/custom-button/custom-button.component";
import { Text } from "../../../components/typography/text.component";
import { useState } from "react";
import { Spacer } from "../../../components/spacer/spacer.component";
import { useDispatch, useSelector } from "react-redux";
import { editProfileStart } from "../../../redux/user/userSlice";
import RNPickerSelect from "react-native-picker-select";
import { useNavigation } from "@react-navigation/native";
import { ModalComponent } from "../../../components/modal/modal.component";
import { FontAwesome } from "@expo/vector-icons";
import styled from "styled-components/native";

const Done = styled(Text)`
  color: ${({ theme }) => theme.colors.text.inverse};
  font-size: ${({ theme }) => theme.fontSizes.title};
`;

export const EditServices = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const servicesData = useSelector((state) => state.services.services);
  const serviceList = Object.values(servicesData);

  const { id, services } = route.params.user;
  const [updatedServices, setUpdatedServices] = useState(services || {});
  const [isModalVisible, setIsModalVisible] = useState(false);

  const placeholder = {
    label: "Add Service",
    value: null,
  };

  const durationPlaceholder = {
    label: "Duration",
    value: null,
  };

  const durations = [
    { value: 15, label: "15 min" },
    { value: 30, label: "30 min" },
    { value: 45, label: "45 min" },
    { value: 60, label: "1 hr" },
  ];

  const onSaveChanges = async () => {
    try {
      dispatch(
        editProfileStart({
          items: {
            [id]: {
              services: updatedServices,
            },
          },
        })
      );
      setIsModalVisible(true);
    } catch (e) {
      console.error(e);
    }
  };

  const addService = (service) => {
    if (!service) return;

    if (!updatedServices[service]) {
      setUpdatedServices({
        ...updatedServices,
        [service]: { id: service, duration: 30 },
      });
    }
  };

  const setDuration = (id, value) => {
    setUpdatedServices({
      ...updatedServices,
      [id]: { id: id, duration: value },
    });
  };

  const removeService = (id) => {
    setUpdatedServices({
      ...updatedServices,
      [id]: null,
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <View>
          <RNPickerSelect
            onValueChange={(value) => addService(value)}
            items={serviceList.map(({ id, title }) => {
              return { value: id, label: title };
            })}
            placeholder={placeholder}
            style={pickerSelectStyles}
          />
        </View>

        <ScrollView style={{ padding: 5 }}>
          {Object.values(updatedServices).map((service, idx) => {
            if (!service) return;

            return (
              <View
                key={idx}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 2,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",

                    gap: 10,
                  }}
                >
                  <TouchableOpacity
                    style={{ padding: 10 }}
                    onPress={() => {
                      removeService(service.id);
                    }}
                  >
                    <FontAwesome name="remove" size={15} color="black" />
                  </TouchableOpacity>
                  <View>
                    <Text>{servicesData[service.id].title}</Text>
                  </View>
                </View>
                <RNPickerSelect
                  //onValueChange={(value) => setSelectedValue(value)}
                  onValueChange={(value) => setDuration(service.id, value)}
                  value={updatedServices[service.id].duration}
                  items={durations}
                  placeholder={durationPlaceholder}
                  style={durationSelectStyles}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
      <TouchableOpacity onPress={onSaveChanges}>
        <CustomButton
          text="Update"
          variant="dark"
          buttonOptions={{
            loading: user.loading,
            style: { borderRadius: 10, ...styles.button },
          }}
        />
      </TouchableOpacity>
      <ModalComponent isModalVisible={isModalVisible}>
        <View style={{ alignItems: "center" }}>
          <Done>Profile has been updated!</Done>
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
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  duration: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
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

const durationSelectStyles = StyleSheet.create({
  inputIOS: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
    paddingRight: 30,
    backgroundColor: "gray",
    ...styles.duration,
  },
  placeholder: {
    ...styles.duration,
  },
});
