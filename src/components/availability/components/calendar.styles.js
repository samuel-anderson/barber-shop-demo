import styled from "styled-components/native";
import { Text } from "../../typography/text.component";

export const CalendarContainer = styled.View`
  justify-content: center;
`;

export const DisplayDate = styled(Text)`
  font-size: ${({ theme }) => theme.fontSizes.title};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
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

export const DateAfter = styled.View`
  content: " ";
  position: absolute;
  bottom: 4px;
  left: 50%;
  width: 4px;
  height: 4px;
  background-color: ${({ theme }) => theme.colors.bg.primary};
  border-radius: 50%;
`;

export const Date = styled.View`
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.bg.tertiary};
  border-radius: 25px;
  padding: 2px;
  justify-content: center;
  align-items: center;
  margin-bottom: 2px;
  flex-direction: row;

  ${(props) => {
    if (props.class === "notAvailable") return `background-color: #dcdcdc;`;
  }}
`;

export const DateText = styled(Text)`
  color: ${({ theme }) => theme.colors.text.inverse};

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

export const DateLabelText = styled(Text)`
  color: rgba(60, 60, 67, 0.6);
  font-size: ${({ theme }) => theme.fontSizes.caption};
`;
