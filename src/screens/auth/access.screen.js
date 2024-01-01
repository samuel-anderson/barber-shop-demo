import { useTheme } from "styled-components/native";
import { WithBackground } from "../../components/with-background/with-background.component.component";
import { Spacer } from "../../components/spacer/spacer.component";
import { Touchable, ButtonText } from "./styles/access.styles";

export const AccessScreen = ({ navigation }) => {
  const theme = useTheme();
  return (
    <WithBackground>
      <Touchable onPress={() => navigation.navigate("Login")}>
        <ButtonText>Login</ButtonText>
      </Touchable>
      <Spacer />
      <Touchable onPress={() => navigation.navigate("Register")}>
        <ButtonText>Register</ButtonText>
      </Touchable>
    </WithBackground>
  );
};
