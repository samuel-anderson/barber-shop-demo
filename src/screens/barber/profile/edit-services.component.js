import { StyleSheet, TouchableOpacity, View } from "react-native";
import { CustomButton } from "../../../components/custom-button/custom-button.component";
import { Text } from "../../../components/typography/text.component";
import { useState } from "react";
import { Spacer } from "../../../components/spacer/spacer.component";
import { useDispatch, useSelector } from "react-redux";
//import { editServicesStart } from "../../../redux/user/userSlice";
import RNPickerSelect from "react-native-picker-select";
import { useNavigation } from "@react-navigation/native";
import { ModalComponent } from "../../../components/modal/modal.component";
import { FontAwesome } from "@expo/vector-icons";
import styled from "styled-components/native";

const Done = styled(Text)`
  color: ${({ theme }) => theme.colors.text.inverse};
  font-size: ${({ theme }) => theme.fontSizes.title};
`;

const IconButton = styled(TouchableOpacity)`
  margin-top: 10px;
`;

export const EditServices = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const servicesData = useSelector((state) => state.services.services);
  const serviceList = Object.values(servicesData);

  const { id, services } = route.params.user;

  const [updatedServices, setUpdatedServices] = useState(services || []);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

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
      //check for errors first

      // dispatch(
      //   editServicesStart({
      //     items: {
      //       [id]: {
      //         services: updatedServices
      //       },
      //     },
      //   })
      // );
      setIsModalVisible(true);
    } catch (e) {
      console.error(e);
    }
  };

  const addService = (service) => {
    console.log(updatedServices);
    console.log(service);

    if (!updatedServices[service]) {
      setUpdatedServices([...updatedServices, service]);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <IconButton
            onPress={() => {
              addService(selectedValue);
            }}
          >
            <FontAwesome name="plus" size={40} color="gray" />
          </IconButton>
          <View style={{ flex: 1 }}>
            <RNPickerSelect
              onValueChange={(value) => setSelectedValue(value)}
              items={serviceList.map(({ id, title }) => {
                return { value: id, label: title };
              })}
              placeholder={placeholder}
              style={pickerSelectStyles}
            />
          </View>
        </View>

        <View style={{ padding: 10 }}>
          {services.map((service, idx) => (
            <View
              key={idx}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 5,
              }}
            >
              <Text>{servicesData[service.id].title}</Text>
              <RNPickerSelect
                onValueChange={(value) => setSelectedValue(value)}
                items={durations}
                placeholder={durationPlaceholder}
                style={durationSelectStyles}
              />
            </View>
          ))}
        </View>
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
