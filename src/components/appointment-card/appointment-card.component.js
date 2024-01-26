import { View } from "react-native";
import { PhoneNumberComponent } from "../phone-number/phone-number.component";
import { Spacer } from "../spacer/spacer.component";
import { TextMessageComponent } from "../text-message/text-message.component";
import {
  AppointmentCard,
  ClientName,
  Container,
  CustomText,
  ServiceTitle,
  Time,
  AppointmentStatus,
} from "./appointment-card.styles";
import { Text } from "../typography/text.component";

const getOrderTotal = (service, addOns) => {
  const servicePrice = service ? service.price : 0;
  const addOnPrice =
    addOns.length === 0
      ? 0
      : addOns.reduce((total, addOn) => total + addOn.price, 0);

  return servicePrice + addOnPrice;
};

export const AppointmentCardComponent = ({ item }) => {
  return (
    <AppointmentCard elevation={2}>
      <Time>
        {item.startTime} - {item.endTime}
      </Time>
      <ServiceTitle>
        {item.service.title} {<AppointmentStatus>(pending)</AppointmentStatus>}
      </ServiceTitle>

      {/* <Container>
        <View>
          <ClientName>Name: {item.clientName}</ClientName>
          <PhoneNumberComponent phoneNumber={item.clientPhoneNumber} />
          <TextMessageComponent phoneNumber={item.clientPhoneNumber} />

          <Spacer position="top" size="large">
            <Total>Total: ${getOrderTotal(item.service, item.addOns)}</Total>
          </Spacer>
        </View>

        <View>
          {item.addOns.length > 0 &&
            item.addOns.map((addOn, idx) => {
              return (
                <View key={idx}>
                  <CustomText>+ {addOn.title.toUpperCase()}</CustomText>
                </View>
              );
            })}
        </View>
      </Container> */}
      <View style={{ marginTop: 10 }}>
        {item.addOns.map((addOn, idx) => (
          <CustomText>{addOn.title.toUpperCase()}</CustomText>
        ))}
      </View>
    </AppointmentCard>
  );
};
