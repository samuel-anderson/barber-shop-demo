import { Button } from "react-native-paper";
import { Text } from "../typography/text.component";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";

const Container = styled(Button)`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.bg.quaternary};
  min-height: 40px;
`;

const Content = styled(Text)`
  color: ${({ theme }) => theme.colors.text.inverse};
  font-weight: bold;
  height: 100%;
`;

const DefaultBtn = ({ text, pressHandler }) => {
  return (
    <TouchableOpacity onPress={pressHandler}>
      <Container>
        <Content>{text}</Content>
      </Container>
    </TouchableOpacity>
  );
};

const whiteOpac = `rgba(255, 255, 255, 0.6);`;
const blackOpac = `rgba(0, 0, 0, 0.9);`;

export const Touchable = styled.TouchableOpacity`
  background-color: ${({ type }) =>
    type == "inverse" ? blackOpac : whiteOpac};
  border-radius: 10px;
  padding: 15px;
  margin: 5px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const TransText = styled(Text)`
  color: ${({ theme, type }) =>
    type == "inverse" ? theme.colors.text.inverse : theme.colors.text.primary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.title};
  text-align: center;
  width: 80%;
`;

const TransBtn = ({ text, pressHandler, type = "default" }) => {
  return (
    <Touchable onPress={pressHandler} type={type}>
      <TransText type={type}>{text}</TransText>
    </Touchable>
  );
};

const variants = {
  default: ({ text, pressHandler }) => (
    <DefaultBtn text={text} pressHandler={pressHandler} />
  ),
  transparent: ({ text, pressHandler }) => (
    <TransBtn text={text} pressHandler={pressHandler} />
  ),
  transparentInverse: ({ text, pressHandler }) => (
    <TransBtn text={text} pressHandler={pressHandler} type="inverse" />
  ),
};

export const CustomButton = ({ variant = "default", text, pressHandler }) => {
  return variants[variant]({ text, pressHandler });
};
