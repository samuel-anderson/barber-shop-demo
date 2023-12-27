import { IconButton } from "react-native-paper";
import { useTheme } from "styled-components";
import { Spacer } from "../components/spacer/spacer.component";
import styled from "styled-components/native";
import LottieView from "lottie-react-native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const Touchable = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.bg.tertiary};
  border-radius: 10px;
  padding: 20px;
  margin: 5px;
  justify-content: center;
  align-items: center;
  width: 45%;
`;

const IconText = styled.Text`
  color: ${({ theme }) => theme.colors.text.inverse};
  font-weight: bold;
`;

const AnimationWrapper = styled.View`
  width: 100%;
  height: 40%;
  position: absolute;
  top: 30px;
  padding: ${(props) => props.theme.space[2]};
`;

export const MainScreen = ({ navigation }) => {
  const theme = useTheme();

  return (
    <Container>
      <AnimationWrapper>
        <LottieView
          key="animation"
          autoPlay
          loop
          resizeMode="cover"
          source={require("../../assets/barbershop.json")}
        />
      </AnimationWrapper>

      <Touchable onPress={() => navigation.navigate("Barber")}>
        <IconText>Book Appointment</IconText>
        <IconButton
          icon="calendar-month"
          iconColor={theme.colors.text.inverse}
          size={75}
        />
      </Touchable>
      <Spacer />
      <Spacer />

      <Touchable onPress={() => navigation.navigate("Access")}>
        <IconText>Barber Access</IconText>
        <IconButton
          icon="account"
          iconColor={theme.colors.text.inverse}
          size={75}
        />
      </Touchable>
    </Container>
  );
};
