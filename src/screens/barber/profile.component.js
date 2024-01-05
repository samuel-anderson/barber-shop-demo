import { useDispatch } from "react-redux";
import { View } from "react-native";
import { SafeArea } from "../../components/utility/safe-area.component";
import { Text } from "../../components/typography/text.component";

export const Profile = () => {
  const dispatch = useDispatch();

  return (
    <SafeArea
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <View style={{ width: "80%" }}>
        <Text>Profile Screen</Text>
      </View>
    </SafeArea>
  );
};
