import styled from "styled-components/native";
import { Text } from "../typography/text.component";

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

export const Title = styled(Text)`
  font-size: ${({ theme }) => theme.fontSizes.title};
  color: ${({ theme }) => theme.colors.text.inverse};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const Duration = styled(Text)`
  font-size: ${({ theme }) => theme.fontSizes.button};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const Professional = styled.View`
  ${standardStyling}
`;

export const Name = styled(Text)`
  color: ${({ theme }) => theme.colors.text.inverse};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const Total = styled(Text)`
  color: ${({ theme }) => theme.colors.text.inverse};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const ServiceTitle = styled(Text)`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const ServicePrice = styled(Text)`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const Service = styled.View`
  ${standardStyling}
`;

export const AddOns = styled.View`
  ${standardStyling}
`;

export const AddOnsText = styled(Text)`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const ExpandIcon = styled.View`
  background-color: rgb(58, 58, 60);
  border-radius: 50px;
`;

export const ServiceDateTime = styled(Text)`
  color: ${({ theme }) => theme.colors.text.inverse};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;
