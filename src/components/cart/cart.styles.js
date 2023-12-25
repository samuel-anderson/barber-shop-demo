import styled from "styled-components/native";

const standardStyling = `
flex-direction: row;
justify-content: space-between;
`;

export const CartContainer = styled.View`
  padding: 5px 20px;
`;

export const Header = styled.View`
  ${standardStyling}
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text.inverse};
  font-weight: bold;
`;

export const Duration = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const Content = styled.View`
  margin-top: 20px;
  color: ${({ theme }) => theme.colors.text.inverse};
`;

export const Professional = styled.View`
  ${standardStyling}
  margin-left: 30px;
`;

export const Name = styled.Text`
  color: ${({ theme }) => theme.colors.text.inverse};
  font-weight: bold;
`;

export const Total = styled.Text`
  color: ${({ theme }) => theme.colors.text.inverse};
  font-weight: bold;
`;

export const ServiceTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text.inverse};
  font-weight: bold;
`;

export const ServicePrice = styled.Text`
  color: ${({ theme }) => theme.colors.text.inverse};
  font-weight: bold;
`;

export const Service = styled.View`
  ${standardStyling}
  margin-left: 50px;
`;

export const AddOns = styled.View`
  ${standardStyling}
  margin-left: 50px;
`;

export const ExpandIcon = styled.View`
  background-color: rgb(58, 58, 60);
  border-radius: 50px;
`;
