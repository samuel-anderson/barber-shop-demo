import styled from "styled-components/native";
import { Card } from "react-native-paper";
import { Text } from "../typography/text.component";
import { View } from "react-native";

export const AppointmentCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  padding: 15px;
  position: relative;
`;

export const AppointmentStatus = styled(Text)`
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.caption};
  text-align: center;
`;

export const AppointmentStatusContainer = styled.View`
  background-color: ${({ $statusColor }) => $statusColor};
  padding: 5px;
  border-radius: 10px;
  width: 75px;
  position: absolute;
  bottom: 0;
  right: 0;
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
  text-align: center;
`;

export const ServiceTitle = styled(Text)`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.h5};
  text-align: center;
`;

export const Total = styled(Text)`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.caption};
`;

export const ClientName = styled(Text)`
  font-size: ${({ theme }) => theme.fontSizes.body};
`;

export const Time = styled(Text)`
  font-size: ${({ theme }) => theme.fontSizes.h4};
`;

export const TotalContainer = styled.View`
  background-color: rgba(186, 186, 186, 0.3);
  padding: 5px;
  border-radius: 10px;
  width: 50px;
  align-items: center;
  justify-content: center;
`;
