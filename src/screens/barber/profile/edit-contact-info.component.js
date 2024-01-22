import { StyleSheet, View } from "react-native";
import { CustomButton } from "../../../components/custom-button/custom-button.component";
import { Text } from "../../../components/typography/text.component";
import { TextInput } from "react-native-paper";
import { useState } from "react";
import { updateProfessionalDoc } from "../../../services/firebase/firebaseService";

export const EditContactInfo = ({ route }) => {
  const { id, displayName, email, phoneNumber } = route.params.user;

  const [displayName_, setDisplayName] = useState(displayName);
  const [email_, setEmail] = useState(email);
  const [phoneNumber_, setPhoneNumber] = useState(phoneNumber);

  const onSaveChanges = async () => {
    // Handle saving changes to the user's profile
    try {
      await updateProfessionalDoc("barber_shop", "professionals", {
        items: {
          [id]: {
            email: email_,
            phoneNumber: phoneNumber_,
            displayName: displayName_,
          },
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  // const formatPhoneNumber = (val) => {
  //   let value = val.replace(/\D/g, ""); // Remove non-numeric characters
  //   let formattedValue = "";

  //   if (value.length >= 1) {
  //     formattedValue = `(${value.slice(0, 3)}`;
  //   }
  //   if (value.length > 3) {
  //     formattedValue += `) ${value.slice(3, 6)}`;
  //   }
  //   if (value.length > 6) {
  //     formattedValue += `-${value.slice(6, 10)}`;
  //   }

  //   return formattedValue;
  // };

  const handlePhoneNumberChange = (phoneNumber) => {
    setPhoneNumber(phoneNumber);
  };
  return (
    <View style={styles.container}>
      <TextInput
        label="Display Name"
        value={displayName_}
        onChangeText={(text) => setDisplayName(text)}
        style={styles.input}
      />
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
