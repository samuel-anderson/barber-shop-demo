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
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.2);
`;

const Touchable = styled.TouchableOpacity`
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  padding: 15px;
  margin: 5px;
  justify-content: center;
  align-items: center;
  width: 40%;
`;

const IconText = styled.Text`
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: bold;
  font-size: 24px;
  text-align: center;
`;

const AnimationWrapper = styled.View`
  width: 100%;
  height: 40%;
  position: absolute;
  top: 30px;
  padding: ${(props) => props.theme.space[2]};
`;
const Background = styled.ImageBackground.attrs({
  source: require("../../assets/home.jpg"),
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const MainScreen = ({ navigation }) => {
  const theme = useTheme();

  return (
    <Background>
      <Container>
        {/* <AnimationWrapper>
          <LottieView
            key="animation"
            autoPlay
            loop
            resizeMode="cover"
            source={require("../../assets/barbershop.json")}
          />
        </AnimationWrapper> */}

        <Touchable onPress={() => navigation.navigate("Barber")}>
          <IconText>Book Appointment</IconText>
          <IconButton
            icon="calendar-month"
            iconColor={theme.colors.text.primary}
            size={50}
          />
        </Touchable>
        <Spacer />
        <Spacer />

        <Touchable onPress={() => navigation.navigate("Access")}>
          <IconText>Barber Access</IconText>
          <IconButton
            icon="account"
            iconColor={theme.colors.text.primary}
            size={50}
          />
        </Touchable>
      </Container>
    </Background>
  );
};
