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

  ${(props) => props.notSelected && ""}
  ${(props) => props.selected && ""}
  ${(props) => props.notAvailable && ""}
`;

export const DateLabel = styled.View`
  align-items: center;
  color: rgba(60, 60, 67, 0.6);
  font-size: 12px;
`;
