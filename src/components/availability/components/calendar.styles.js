import styled from "styled-components/native";

export const CalendarContainer = styled.View`
  justify-content: center;
  margin-bottom: 10px;
`;

export const DateContainer = styled.View`
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 10px;
  position: relative;
  flex-direction: row;
`;
export const DateBefore = styled.View`
  ${(props) => {
    if (props.class === "selected")
      return `content: ""; position: absolute; width: 46px; height: 46px; border-radius: 50%; border: 1px solid rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); box-sizing: border-box;`;
  }}
`;

export const Date = styled.View`
  width: 40px;
  height: 40px;
  background-color: rgb(0, 0, 0);
  border-radius: 25px;
  padding: 2px;
  justify-content: center;
  align-items: center;
  margin-bottom: 2px;
  flex-direction: row;

  ${(props) => {
    if (props.class === "notAvailable")
      return `background-color: rgb(220, 220, 220)`;
  }}
`;

export const DateText = styled.Text`
  color: rgb(255, 255, 255);

  ${(props) => {
    if (props.class === "notSelected") return "color: rgba(60, 60, 67, 0.5);";
  }}

  ${(props) => {
    if (props.class === "notAvailable") return "color: rgba(60, 60, 67, 0.6);";
  }}
`;

export const DateLabel = styled.View`
  align-items: center;
`;

export const DateLabelText = styled.Text`
  color: rgba(60, 60, 67, 0.6);
  font-size: 12px;
`;
