import { useTheme } from "styled-components/native";
import { WithBackground } from "../../components/with-background/with-background.component.component";
import { Spacer } from "../../components/spacer/spacer.component";
import { CustomButton } from "../../components/custom-button/custom-button.component";

export const AccessScreen = ({ navigation }) => {
  const theme = useTheme();
  return (
    <WithBackground>
      <CustomButton
        variant="transparent"
        text="Login"
        pressHandler={() => navigation.navigate("Login")}
      />
      <Spacer />
      <CustomButton
        variant="transparent"
        text="Register"
        pressHandler={() => navigation.navigate("Register")}
      />
    </WithBackground>
  );
};
