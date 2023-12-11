import { StatusBar, SafeAreaView } from "react-native";
import styled from "styled-components/native";

//Calculate safe area, then access theme for background color
//Status bar is only available on android
export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
  background-color: ${(props) => props.theme.colors.bg.primary};
`;
