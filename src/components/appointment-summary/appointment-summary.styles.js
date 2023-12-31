import styled from "styled-components/native";
import { Text } from "../typography/text.component";

export const Summary = styled.View`
  padding: 5px 20px;
`;

export const AddOns = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const AddOnsText = styled(Text)`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;
