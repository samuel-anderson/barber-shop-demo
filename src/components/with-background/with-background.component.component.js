import { Platform } from "react-native";
import { Background, Container, CompactImage } from "./with-background.styles";

const isAndroid = Platform.OS === "android";

export const WithBackground = ({ children }) => {
  const Image = isAndroid ? null : CompactImage;

  return (
    <Background>
      <Container>
        <Image source={require("../../../assets/legacy.png")} />
        {children}
      </Container>
    </Background>
  );
};
