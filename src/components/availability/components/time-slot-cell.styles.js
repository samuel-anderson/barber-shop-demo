import styled from "styled-components/native";

export const Cell = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 42px;
  width: 120px;
  padding: 0px;
  background-color: rgba(255, 255, 255, 0);
  border-radius: 12px;
  border: 1px solid rgb(202, 202, 202);
  font-weight: bold;

  ${(props) => {
    if (props.class === "selected")
      return `background-color: ${props.theme.colors.bg.quaternary};`;
  }}
`;

export const CellText = styled.Text`
  color: rgb(0, 0, 0);
  margin-left: 5px;

  ${(props) => {
    if (props.class === "selected")
      return `color:  ${props.theme.colors.text.inverse};`;
  }}
`;
