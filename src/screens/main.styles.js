import { Text } from "../components/typography/text.component";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.2);
`;

export const Touchable = styled.TouchableOpacity`
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  padding: 15px;
  margin: 5px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const IconText = styled(Text)`
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.title};
  text-align: center;
  width: 80%;
`;

export const Background = styled.ImageBackground.attrs({
  source: require("../../assets/home.jpg"),
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const CompactImage = styled.Image`
  width: 150px;
  height: 150px;
  position: absolute;
  top: 0;
`;

export const ErrorText = styled(Text)`
  font-size: ${({ theme }) => theme.sizes[2]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;
