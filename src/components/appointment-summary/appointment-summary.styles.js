import styled from "styled-components/native";

const standardStyling = `
flex-direction: row;
justify-content: space-between;
`;

export const Summary = styled.View`
  padding: 5px 20px;
`;

export const Header = styled.View`
  ${standardStyling}
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 18px;
  color: white;
  font-weight: bold;
`;

export const Duration = styled.Text`
  font-size: 13px;
  color: gray;
`;

export const Content = styled.View`
  margin-top: 20px;
  color: white;
`;

export const Professional = styled.View`
  ${standardStyling}
  margin-left: 15px;
`;

export const Name = styled.Text`
  color: white;
  font-weight: bold;
`;

export const Total = styled.Text`
  color: white;
  font-weight: bold;
`;

export const ServiceTitle = styled.Text`
  color: white;
  font-weight: bold;
`;

export const ServicePrice = styled.Text`
  color: white;
  font-weight: bold;
`;

export const Service = styled.View`
  ${standardStyling}
  margin-left: 35px;
`;

export const AddOns = styled.View`
  ${standardStyling}
  margin-left: 35px;
`;
