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

const variants = {
  default: ({ text, pressHandler }) => (
    <DefaultBtn text={text} pressHandler={pressHandler} />
  ),
};

export const CustomButton = ({ variant = "default", text, pressHandler }) => {
  return variants[variant]({ text, pressHandler });
};
