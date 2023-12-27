import styled from "styled-components/native";
import { Button } from "react-native-paper";

export const CartButton = styled(Button)`
  width: 100%;
  position: absolute;
  margin-top: 20px;
  background-color: ${({ theme }) => theme.colors.bg.quaternary};
`;
