import styled from "styled-components/native";
import { Card } from "react-native-paper";
import { Text } from "../typography/text.component";
import { View } from "react-native";

export const AppointmentCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  align-items: center;
  justify-content: center;
  padding: 15px;
`;

export const AppointmentStatus = styled(Text)`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.body};
  text-align: center;
`;

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;

export const CustomText = styled(Text)`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.caption};
`;

export const ServiceTitle = styled(Text)`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.title};
  text-align: center;
`;

export const Total = styled(Text)`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const ClientName = styled(Text)`
  font-size: ${({ theme }) => theme.fontSizes.body};
`;

export const Time = styled(Text)`
  font-size: ${({ theme }) => theme.fontSizes.h4};
`;
