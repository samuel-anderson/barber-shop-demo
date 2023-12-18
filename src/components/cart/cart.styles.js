import styled from "styled-components/native";

const standardStyling = `
flex-direction: row;
justify-content: space-between;
`;
export const CartContainer = styled.View`
  padding: 20px;
  color: white;
`;
export const Header = styled.View`
  ${standardStyling}
`;

export const Title = styled.Text`
  font-size: 15px;
  color: white;
  font-weight: bold;
`;

export const Duration = styled.Text`
  font-size: 13px;
  color: gray;
`;

export const Content = styled.View`
  margin-top: 10px;
  color: white;
`;

export const Professional = styled.View`
  ${standardStyling}
`;
export const Service = styled.View`
  ${standardStyling}
`;

export const AddOns = styled.View`
  ${standardStyling}
  margin-left: 20px;
`;
