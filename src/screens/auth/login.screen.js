import { useEffect, useState } from "react";
import { TextInput } from "react-native-paper";
import { WithBackground } from "../../components/with-background/with-background.component.component";
import styled from "styled-components/native";
import { Spacer } from "../../components/spacer/spacer.component";
import { CustomButton } from "../../components/custom-button/custom-button.component";
import { Text } from "../../components/typography/text.component";
import { selectBarberEmails } from "../../redux/professionals/professionalsSelector";
import { signInStart } from "../../redux/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { DismissKeyboardComponent } from "../../components/dismiss-keyboard/dismiss-keyboard.componet";

const defaultFormFields = {
  email: "",
  password: "",
};

const Container = styled.View`
  flex: 1;
  width: 75%;
  justify-content: center;
`;

const ErrorText = styled(Text)`
  font-size: ${({ theme }) => theme.fontSizes.title};
`;

export const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [loginError, setLoginError] = useState(null);

  const barberEmails = useSelector(selectBarberEmails);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.error) setLoginError(user.error);
    else setLoginError(null);
  }, [user]);

  const handleChange = (name, value) => {
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const handleErrors = () => {
    if (!password) {
      setPasswordError("Please enter a valid PASSWORD");
      return true;
    } else if (password) {
      setPasswordError(null);
    }

    if (!email) {
      setEmailError("Please enter a valid EMAIL");
      return true;
    } else if (email && !barberEmails?.includes(email.toLowerCase())) {
      setEmailError("Barber email was NOT found");
      return true;
    } else {
      setEmailError(null);
    }

    return false;
  };

  const loginHandler = async () => {
    try {
      if (handleErrors()) return;
      else {
        dispatch(signInStart({ email, password }));
        //setFormFields(defaultFormFields);
      }
    } catch (e) {
      console.log("ERROR: ", e);
    }
  };

  return (
    <WithBackground>
      <DismissKeyboardComponent>
        <Container>
          <TextInput
            label="Email"
            value={email}
            error={!!emailError}
            onChangeText={(text) => handleChange("email", text)}
            style={{ opacity: 0.6 }}
          />
          <Spacer />
          <TextInput
            label="Password"
            value={password}
            error={!!passwordError}
            secureTextEntry
            onChangeText={(text) => handleChange("password", text)}
            style={{ opacity: 0.6 }}
          />
          {loginError && <ErrorText variant="error">{loginError}</ErrorText>}
          {emailError && <ErrorText variant="error">{emailError}</ErrorText>}
          {passwordError && (
            <ErrorText variant="error">{passwordError}</ErrorText>
          )}
          <CustomButton
            variant="transparentInverse"
            text="Login"
            buttonOptions={{
              onPress: loginHandler,
            }}
          />
        </Container>
      </DismissKeyboardComponent>
    </WithBackground>
  );
};
