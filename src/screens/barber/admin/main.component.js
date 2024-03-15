import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Text } from "../../../components/typography/text.component";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBarberStart } from "../../../redux/professionals/professionalsSlice";
import { TextInput } from "react-native-paper";
import { CustomButton } from "../../../components/custom-button/custom-button.component";
import styled from "styled-components/native";
import { ModalComponent } from "../../../components/modal/modal.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { DismissKeyboardComponent } from "../../../components/dismiss-keyboard/dismiss-keyboard.componet";

const defaultFormFields = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
};

const ErrorText = styled(Text)`
  font-size: ${({ theme }) => theme.fontSizes.title};
`;

const Done = styled(Text)`
  color: ${({ theme }) => theme.colors.text.inverse};
  font-size: ${({ theme }) => theme.fontSizes.title};
`;

export const Main = () => {
  const dispatch = useDispatch();
  const servicesData = useSelector((state) => state.services.services);
  const professionals = useSelector((state) => state.professionals);

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { firstName, lastName, email, phoneNumber } = formFields;
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleChange = (name, value) => {
    setFormFields({
      ...formFields,
      [name]: name === "phoneNumber" ? value.replace("+1", "") : value,
    });
  };

  const handleErrors = () => {
    if (!firstName) {
      setError("Please enter a valid FIRST NAME");
      return true;
    } else if (!lastName) {
      setError("Please enter a valid LAST NAME");
      return true;
    } else if (!email) {
      setError("Please enter a valid EMAIL");
      return true;
    } else if (!phoneNumber || phoneNumber.length !== 10) {
      setError("Please enter a valid PHONE NUMBER");
      return true;
    }
    setError(null);

    return false;
  };

  const submitHandler = async () => {
    try {
      if (handleErrors()) return;
      else {
        dispatch(
          addBarberStart({
            barberInfo: {
              id:
                firstName.toLocaleLowerCase() +
                "_" +
                lastName.toLocaleLowerCase(),
              firstName: firstName,
              lastName: lastName,
              displayName: firstName + " " + lastName,
              phoneNumber: "+1" + phoneNumber,
              email: email.toLocaleLowerCase(),
              services: {
                ["haircut"]: servicesData["haircut"],
                ["lineup_neck"]: servicesData["lineup_neck"],
              },
            },
          })
        );

        setIsModalVisible(true);
      }
    } catch (e) {
      console.log("ERROR: ", e);
    }
  };
  return (
    <SafeArea>
      <DismissKeyboardComponent>
        <View style={styles.container}>
          <TextInput
            label="First Name"
            value={firstName}
            onChangeText={(text) => handleChange("firstName", text)}
            style={styles.input}
          />
          <TextInput
            label="Last Name"
            value={lastName}
            onChangeText={(text) => handleChange("lastName", text)}
            style={styles.input}
          />

          <TextInput
            label="Email"
            value={email}
            onChangeText={(text) => handleChange("email", text)}
            style={styles.input}
          />

          <TextInput
            label="Phone Number"
            value={"+1" + phoneNumber}
            keyboardType="numeric"
            style={styles.input}
            onChangeText={(text) => handleChange("phoneNumber", text)}
          />

          {error && <ErrorText variant="error">{error}</ErrorText>}

          <TouchableOpacity onPress={submitHandler}>
            <CustomButton
              text="Add Barber"
              variant="dark"
              buttonOptions={{
                loading: professionals.loading,
                style: { borderRadius: 10, ...styles.button },
              }}
            />
          </TouchableOpacity>
          <ModalComponent isModalVisible={isModalVisible}>
            <View style={{ alignItems: "center" }}>
              <Done>Barber has been added!</Done>
            </View>
            <Spacer size="medium" position="top">
              <CustomButton
                text="Done"
                buttonOptions={{
                  onPress: () => {
                    setIsModalVisible(false);
                    setFormFields(defaultFormFields);
                  },
                }}
              />
            </Spacer>
          </ModalComponent>
        </View>
      </DismissKeyboardComponent>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});
