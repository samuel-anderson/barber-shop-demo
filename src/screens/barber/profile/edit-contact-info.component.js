import { StyleSheet, View } from "react-native";
import { CustomButton } from "../../../components/custom-button/custom-button.component";
import { Text } from "../../../components/typography/text.component";
import { TextInput } from "react-native-paper";
import { useState } from "react";

export const EditContactInfo = ({ route }) => {
  const { firstName, lastName, email, phoneNumber } = route.params.user;

  const [firstName_, setFirstName] = useState(firstName);
  const [lastName_, setLastName] = useState(lastName);
  const [email_, setEmail] = useState(email);
  const [phoneNumber_, setPhoneNumber] = useState(phoneNumber);

  const onSaveChanges = () => {
    // Handle saving changes to the user's profile
    console.log("Saving changes:", { firstName_, lastName_, email_ });
    // Add your logic to update the user's profile in the backend/database
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

  const handlePhoneNumberChange = (phoneNumber) => {
    setPhoneNumber(phoneNumber);
  };
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <TextInput
          label="First Name"
          value={firstName_}
          onChangeText={(text) => setFirstName(text)}
          style={{ ...styles.input, flex: 1 }}
        />
        <TextInput
          label="Last Name"
          value={lastName_}
          onChangeText={(text) => setLastName(text)}
          style={{ ...styles.input, flex: 1 }}
        />
      </View>
      <TextInput
        label="Email"
        value={email_}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />

      <TextInput
        label="Phone Number"
        value={phoneNumber_}
        keyboardType="numeric"
        onChangeText={(text) => handlePhoneNumberChange(text)}
      />
      <CustomButton
        text="Save"
        variant="dark"
        buttonOptions={{
          style: { borderRadius: 10, ...styles.button },
          onPress: onSaveChanges,
        }}
      />
    </View>
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
