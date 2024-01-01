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

export const Touchable = styled.TouchableOpacity`
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  padding: 15px;
  margin: 5px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const TransText = styled(Text)`
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.title};
  text-align: center;
  width: 80%;
`;

const TransBtn = ({ text, pressHandler }) => {
  return (
    <Touchable onPress={pressHandler}>
      <TransText>{text}</TransText>
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
};

export const CustomButton = ({ variant = "default", text, pressHandler }) => {
  return variants[variant]({ text, pressHandler });
};
