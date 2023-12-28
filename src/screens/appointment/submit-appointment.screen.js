import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { SafeArea } from "../../components/utility/safe-area.component";
import { sendSMSStart } from "../../redux/sms/smsSlice";
import styled from "styled-components/native";
import { SummaryModal } from "../../components/summary-modal/summary-modal.component";

const defaultFormFields = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
};

const ErrorText = styled.Text`
  color: red;
  font-size: 12px;
  font-style: italic;
`;

const Title = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.title};
  font-weight: bold;
`;

const BookingBtn = styled(Button)`
  background-color: black;
  margin-top: 20px;
  width: 100%;
  padding: 10px;
`;

export const SubmitAppointmentScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const sms = useSelector((state) => state.sms);

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { firstName, lastName, phoneNumber } = formFields;

  const [phoneError, setPhoneError] = useState(null);
  const [firstNameError, setFirstNameError] = useState(null);
  const [lastNameError, setLastNameError] = useState(null);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const validatePhoneNumber = () => {
    if (phoneNumber.length !== 14) {
      setPhoneError("Please enter a valid PHONE NUMBER.");
      return false;
    } else {
      setPhoneError(null);
      return true;
    }
  };

  const validateFirstName = () => {
    if (firstName === "") {
      setFirstNameError("Please enter your FIRST NAME");
      return false;
    } else {
      setFirstNameError(null);
      return true;
    }
  };

  const validateLastName = () => {
    if (lastName === "") {
      setLastNameError("Please enter your LAST NAME");
      return false;
    } else {
      setLastNameError(null);
      return true;
    }
  };

  const submitHandler = async () => {
    if (!validateFirstName()) return;
    if (!validateLastName()) return;
    if (!validatePhoneNumber()) return;

    try {
      //const response = await submitBooking(firstName, lastName, phoneNumber);
      dispatch(
        sendSMSStart({
          cart: cart,
          clientInfo: {
            clientFirstName: firstName,
            clientLastName: lastName,
            clientPhoneNumber: phoneNumber,
          },
        })
      );

      resetFormFields();
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (text) => {
    const { name, value } = text;

    setFormFields({
      ...formFields,
      [name]: name === "phoneNumber" ? formatPhoneNumber(value) : value,
    });
  };

  const formatPhoneNumber = (val) => {
    let value = val.replace(/\D/g, ""); // Remove non-numeric characters
    let formattedValue = "";

    if (value.length >= 1) {
      formattedValue = `(${value.slice(0, 3)}`;
    }
    if (value.length > 3) {
      formattedValue += `) ${value.slice(3, 6)}`;
    }
    if (value.length > 6) {
      formattedValue += `-${value.slice(6, 10)}`;
    }

    return formattedValue;
  };
  return (
    <SafeArea style={{ gap: 10, margin: 10, flex: 1 }}>
      <View>
        <Title>Enter Contact Information</Title>
      </View>
      {!cart.isFinished && (
        <>
          <TextInput
            label="First Name"
            value={firstName}
            error={!!firstNameError}
            onChangeText={(text) =>
              handleChange({ name: "firstName", value: text })
            }
          />
          <TextInput
            label="Last Name"
            value={lastName}
            error={!!lastNameError}
            onChangeText={(text) =>
              handleChange({ name: "lastName", value: text })
            }
          />
          <TextInput
            label="Phone Number"
            value={phoneNumber}
            error={!!phoneError}
            keyboardType="numeric"
            onChangeText={(text) =>
              handleChange({ name: "phoneNumber", value: text })
            }
          />

          {firstNameError && <ErrorText>{firstNameError}</ErrorText>}
          {lastNameError && <ErrorText>{lastNameError}</ErrorText>}
          {phoneError && <ErrorText>{phoneError}</ErrorText>}

          <BookingBtn
            onPress={submitHandler}
            loading={sms.loading}
            labelStyle={{ color: "white" }}
          >
            Book Appointment
          </BookingBtn>
        </>
      )}

      <SummaryModal />
    </SafeArea>
  );
};
