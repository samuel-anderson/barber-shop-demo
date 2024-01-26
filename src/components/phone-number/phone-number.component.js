import { Linking, TouchableOpacity } from "react-native";
import { Text } from "../typography/text.component";

export const PhoneNumberComponent = ({ phoneNumber }) => {
  const handlePress = async () => {
    // Use Linking to open the phone's default dialer
    const numericPhoneNumber = phoneNumber.replace(/\D/g, "");
    const url = `tel:${numericPhoneNumber}`;
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      console.error(`Unable to open URL: ${url}`);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={{ color: "blue", textDecorationLine: "underline" }}>
        Call: {phoneNumber}
      </Text>
    </TouchableOpacity>
  );
};
