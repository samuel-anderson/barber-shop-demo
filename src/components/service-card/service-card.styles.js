import styled from "styled-components/native";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const Icon = styled.View`
  background-color: ${({ theme }) => theme.colors.bg.tertiary};
  width: 32px;
  height: 32px;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -6px;
  right: -12px;
`;

export const Service = styled.View`
  position: relative;
  margin: 5px;
  padding: 20px 16px;
  width: ${width / 2 - 15}px;
  border-radius: 10%;
  height: 125px;
  border: 1px solid rgb(202, 202, 202);
  border-radius: 16px;

  ${(props) =>
    props.isSelectedService ? "background-color: rgb(0, 131, 255);" : ""}

  ${(props) => (props.isAddOn ? "background-color: rgb(224, 224, 224);" : "")}
`;

export const Title = styled.Text`
  margin: 0px;
  font-size: 15px;
  font-weight: 600;
  line-height: 16px;
  color: rgb(0, 0, 0);

  ${(props) => (props.isSelectedService ? "color:black" : " ")}
`;

export const Duration = styled.Text`
  margin: 0px;
  font-size: 13px;
  font-weight: normal;
  line-height: 15px;
  letter-spacing: -0.08px;
  color: rgba(60, 60, 67, 0.6);

  ${(props) => (props.isSelectedService ? "color:black" : "")}
`;

export const Price = styled.Text`
  position: absolute;
  right: 0px;
  bottom: 16px;
  padding: 4px 12px;
  border-radius: 8px 0px 0px 8px;
  margin: 0px;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  color: black;
  background-color: rgba(186, 186, 186, 0.5);

  ${(props) =>
    props.isSelectedService
      ? "background-color: rgba(255, 255, 255, 0.16);"
      : ""}
`;
