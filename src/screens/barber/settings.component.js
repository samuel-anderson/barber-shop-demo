import { useDispatch } from "react-redux";
import { signOutStart } from "../../redux/user/userSlice";
import { View } from "react-native";
import { CustomButton } from "../../components/custom-button/custom-button.component";
import { SafeArea } from "../../components/utility/safe-area.component";

export const Settings = () => {
  const dispatch = useDispatch();

  return (
    <SafeArea
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <View style={{ width: "80%" }}>
        <CustomButton
          text={"Sign Out"}
          variant="dark"
          buttonOptions={{
            onPress: () => dispatch(signOutStart()),
          }}
        />
      </View>
    </SafeArea>
  );
};
