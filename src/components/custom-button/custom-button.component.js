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

const DefaultBtn = ({ text, pressHandler, additionalStyling }) => {
  return (
    <TouchableOpacity onPress={pressHandler} style={{ ...additionalStyling }}>
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

const TransBtn = ({
  text,
  pressHandler,
  type = "default",
  additionalStyling,
}) => {
  return (
    <Touchable
      onPress={pressHandler}
      type={type}
      style={{ ...additionalStyling }}
    >
      <TransText type={type}>{text}</TransText>
    </Touchable>
  );
};

const DarkContainer = styled(Button)`
  background-color: ${({ theme }) => theme.colors.bg.tertiary};
  padding: 10px;
`;

const DarkTxt = styled(Text)`
  color: ${({ theme }) => theme.colors.text.inverse};
`;

const DarkBtn = ({ text, pressHandler, additionalStyling }) => {
  return (
    <DarkContainer onPress={pressHandler} style={{ ...additionalStyling }}>
      <DarkTxt>{text}</DarkTxt>
    </DarkContainer>
  );
};
const variants = {
  default: ({ text, pressHandler, additionalStyling }) => (
    <DefaultBtn
      text={text}
      pressHandler={pressHandler}
      additionalStyling={additionalStyling}
    />
  ),
  transparent: ({ text, pressHandler, additionalStyling }) => (
    <TransBtn
      text={text}
      pressHandler={pressHandler}
      additionalStyling={additionalStyling}
    />
  ),
  transparentInverse: ({ text, pressHandler, additionalStyling }) => (
    <TransBtn
      text={text}
      pressHandler={pressHandler}
      type="inverse"
      additionalStyling={additionalStyling}
    />
  ),
  dark: ({ text, pressHandler, additionalStyling }) => (
    <DarkBtn
      text={text}
      pressHandler={pressHandler}
      additionalStyling={additionalStyling}
    />
  ),
};

export const CustomButton = ({
  variant = "default",
  text,
  pressHandler,
  additionalStyling,
}) => {
  return variants[variant]({ text, pressHandler, additionalStyling });
};
