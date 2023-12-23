import { View, Text } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { SafeArea } from "../../components/utility/safe-area.component";
import { sendSMSStart } from "../../redux/sms/smsSlice";
const defaultFormFields = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
};

//add phone error
//on success navigate to summary success page
//from there you can navigate to main

//clean up css and passing props
//refactor into components

export const SubmitAppointmentScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const sms = useSelector((state) => state.sms);

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { firstName, lastName, phoneNumber } = formFields;
  const [phoneError, setPhoneError] = useState("");

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const validatePhoneNumber = () => {
    if (phoneNumber.length !== 14) {
      setPhoneError("Please enter a valid phone number.");
      return false;
    } else {
      setPhoneError("");
      return true;
    }
  };

  const submitHandler = async () => {
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
    <SafeArea>
      <TextInput
        label="First Name"
        value={firstName}
        onChangeText={(text) =>
          handleChange({ name: "firstName", value: text })
        }
        style={{ margin: 10 }}
      />
      <TextInput
        label="Last Name"
        value={lastName}
        onChangeText={(text) => handleChange({ name: "lastName", value: text })}
        style={{ margin: 10 }}
      />
      <TextInput
        label="Phone Number"
        value={phoneNumber}
        onChangeText={(text) =>
          handleChange({ name: "phoneNumber", value: text })
        }
        style={{ margin: 10 }}
      />
      <Button onPress={submitHandler}>Submit</Button>
    </SafeArea>
  );
};
