import styled from "styled-components/native";
import { Text } from "../../../components/typography/text.component";

export const Touchable = styled.TouchableOpacity`
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  padding: 15px;
  margin: 5px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const ButtonText = styled(Text)`
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.title};
  text-align: center;
  width: 80%;
`;
