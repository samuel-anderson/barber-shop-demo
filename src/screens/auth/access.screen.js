import { WithBackground } from "../../components/with-background/with-background.component.component";
import { Spacer } from "../../components/spacer/spacer.component";
import { CustomButton } from "../../components/custom-button/custom-button.component";
import { APP_FEATURE_REGISTRATION } from "@env";

export const AccessScreen = ({ navigation }) => {
  return (
    <WithBackground>
      <CustomButton
        variant="transparent"
        text="Login"
        buttonOptions={{
          onPress: () => navigation.navigate("Login"),
        }}
      />
      <Spacer />
      {APP_FEATURE_REGISTRATION && (
        <CustomButton
          variant="transparent"
          text="Register"
          buttonOptions={{
            onPress: () => navigation.navigate("Register"),
          }}
        />
      )}
    </WithBackground>
  );
};
