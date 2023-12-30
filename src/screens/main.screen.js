import { Spacer } from "../components/spacer/spacer.component";
import styled from "styled-components/native";
import { Platform } from "react-native";
import { Text } from "../components/typography/text.component";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;

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
  flex-direction: row;
`;

const IconText = styled(Text)`
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.title};
  text-align: center;
  width: 80%;
`;

const Background = styled.ImageBackground.attrs({
  source: require("../../assets/home.jpg"),
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const CompactImage = styled.Image`
  width: 150px;
  height: 150px;
  position: absolute;
  top: 0;
`;

const isAndroid = Platform.OS === "android";

export const MainScreen = ({ navigation }) => {
  const Image = isAndroid ? CompactWebview : CompactImage;

  return (
    <Background>
      <Container>
        <Image source={require("../../assets/legacy.png")} />

        <Touchable onPress={() => navigation.navigate("Choose a Barber")}>
          <IconText>Book Appointment</IconText>
        </Touchable>
        <Spacer />
        <Spacer />
        <Touchable onPress={() => navigation.navigate("Access")}>
          <IconText>Barber Access</IconText>
        </Touchable>
      </Container>
    </Background>
  );
};
