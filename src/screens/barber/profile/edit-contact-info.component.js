import { StyleSheet, TouchableOpacity, View } from "react-native";
import { CustomButton } from "../../../components/custom-button/custom-button.component";
import { Text } from "../../../components/typography/text.component";
import { TextInput } from "react-native-paper";
import { useState } from "react";
import { updateProfessionalDoc } from "../../../services/firebase/firebaseService";
import { Spacer } from "../../../components/spacer/spacer.component";
import { useDispatch, useSelector } from "react-redux";
import { editContactInfoStart } from "../../../redux/user/userSlice";
import { useNavigation } from "@react-navigation/native";

export const EditContactInfo = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { id, displayName, phoneNumber, socialMedia } = route.params.user;

  const [displayName_, setDisplayName] = useState(displayName);
  const [phoneNumber_, setPhoneNumber] = useState(phoneNumber);
  const [socialMedia_, setSocialMedia] = useState(socialMedia);

  const onSaveChanges = async () => {
    try {
      //check for errors first

      dispatch(
        editContactInfoStart({
          items: {
            [id]: {
              phoneNumber: phoneNumber_,
              displayName: displayName_,
              socialMedia: socialMedia_,
            },
          },
        })
      );
    } catch (e) {
      console.error(e);
    }
  };

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
        label="Phone Number"
        value={phoneNumber_}
        keyboardType="numeric"
        style={styles.input}
        onChangeText={(text) => handlePhoneNumberChange(text)}
      />

      {socialMedia && socialMedia.instagram && (
        <TextInput
          label={socialMedia_.instagram.label}
          value={socialMedia_.instagram.handle}
          style={styles.input}
          onChangeText={(text) =>
            setSocialMedia({
              ...socialMedia,
              instagram: {
                label: "Instagram",
                handle: text,
              },
            })
          }
        />
      )}

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
