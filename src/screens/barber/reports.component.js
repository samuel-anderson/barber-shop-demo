import { TouchableOpacity, View } from "react-native";
import { SafeArea } from "../../components/utility/safe-area.component";
import { Text } from "../../components/typography/text.component";
import { CustomButton } from "../../components/custom-button/custom-button.component";

export const Reports = () => {
  return (
    <SafeArea
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <View style={{ width: "80%" }}>
        <TouchableOpacity onPress={() => {}}>
          <CustomButton variant="dark" text="Generate Report" />
        </TouchableOpacity>
      </View>
    </SafeArea>
  );
};
