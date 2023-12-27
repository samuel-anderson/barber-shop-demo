import { IconButton } from "react-native-paper";
import { useTheme } from "styled-components";
import { Spacer } from "../components/spacer/spacer.component";
import styled from "styled-components/native";

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

export const MainScreen = ({ navigation }) => {
  const theme = useTheme();

  return (
    <Container>
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
