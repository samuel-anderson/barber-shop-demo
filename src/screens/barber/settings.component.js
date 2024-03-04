import { useDispatch } from "react-redux";
import { signOutStart } from "../../redux/user/userSlice";
import { View, TouchableOpacity, Text, Linking } from "react-native";
import { SafeArea } from "../../components/utility/safe-area.component";
import QRCode from "react-native-qrcode-svg";
import { Spacer } from "../../components/spacer/spacer.component";

export const Settings = () => {
  const dispatch = useDispatch();

  const appStoreLink = "id282935706";
  const qrCodeValue = `https://apps.apple.com/us/app/bible/${appStoreLink}`;

  const sendMessage = () => {
    const message = qrCodeValue;
    const url = `sms:&body=${encodeURIComponent(message)}`;

    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  return (
    <SafeArea
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <View style={{ width: 75, position: "absolute", top: 0, right: 0 }}>
        <TouchableOpacity onPress={() => dispatch(signOutStart())}>
          <View
            style={{
              backgroundColor: "black",
              padding: 10,
              borderRadius: "5px",
              margin: 5,
            }}
          >
            <Text style={{ color: "white" }}>Log Out</Text>
          </View>
        </TouchableOpacity>
      </View>

      <QRCode value={qrCodeValue} size={350} />
      <Spacer position="bottom" size="large" />
      <TouchableOpacity onPress={sendMessage}>
        <Text
          style={{
            fontSize: 21,
            fontWeight: "bold",
            textDecorationLine: "underline",
          }}
        >
          Share QR Code
        </Text>
      </TouchableOpacity>
    </SafeArea>
  );
};
