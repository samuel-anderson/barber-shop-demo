import { Linking, TouchableOpacity, View } from "react-native";
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { useRoute } from "@react-navigation/native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { FlatList } from "react-native";
import { FadeInView } from "../../../components/animations/fade.animation";
import styled from "styled-components/native";
import { Card } from "react-native-paper";
import { showDurationTotal } from "../../../util/cart";

export const AppointmentCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  width: 95%;
  align-self: center;
  padding: 10px;
`;

export const AppointmentCardList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const CustomText = styled(Text)`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-align: right;
`;

export const ClientName = styled(Text)`
  font-size: ${({ theme }) => theme.fontSizes.title};
`;

const PhoneNumberComponent = ({ phoneNumber }) => {
  const handlePress = async () => {
    // Use Linking to open the phone's default dialer
    const numericPhoneNumber = phoneNumber.replace(/\D/g, "");
    const url = `tel:${numericPhoneNumber}`;
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      console.error(`Unable to open URL: ${url}`);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={{ color: "blue", textDecorationLine: "underline" }}>
        Call: {phoneNumber}
      </Text>
    </TouchableOpacity>
  );
};

const SMSComponent = ({ phoneNumber }) => {
  const handlePress = async () => {
    // Use Linking to open the phone's default dialer
    const numericPhoneNumber = phoneNumber.replace(/\D/g, "");
    const url = `sms:${numericPhoneNumber}`;
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      console.error(`Unable to open URL: ${url}`);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={{ color: "blue", textDecorationLine: "underline" }}>
        Txt: {phoneNumber}
      </Text>
    </TouchableOpacity>
  );
};

export const ViewAppointments = () => {
  const route = useRoute();
  const { appointments } = route.params;

  const getOrderTotal = (service, addOns) => {
    const servicePrice = service ? service.price : 0;
    const addOnPrice =
      addOns.length === 0
        ? 0
        : addOns.reduce((total, addOn) => total + addOn.price, 0);

    return servicePrice + addOnPrice;
  };

  return (
    <SafeArea>
      <AppointmentCardList
        data={appointments}
        renderItem={({ item, index }) => {
          return (
            <Spacer position="bottom" size="large">
              <FadeInView>
                <AppointmentCard elevation={2}>
                  <Container>
                    <View>
                      <ClientName>Name: {item.clientName}</ClientName>
                      <PhoneNumberComponent
                        phoneNumber={item.clientPhoneNumber}
                      />
                      <SMSComponent phoneNumber={item.clientPhoneNumber} />

                      <Spacer position="top" size="large">
                        <Text>
                          Time: {item.startTime} - {item.endTime}
                        </Text>
                        <Text>{showDurationTotal(item.estimatedDuration)}</Text>
                      </Spacer>
                      <Spacer position="top" size="large">
                        <Text>
                          Total: ${getOrderTotal(item.service, item.addOns)}
                        </Text>
                      </Spacer>
                    </View>

                    <View>
                      <CustomText>{item.service.title}</CustomText>
                      {item.addOns.length > 0 &&
                        item.addOns.map((addOn, idx) => {
                          return (
                            <View key={idx}>
                              <CustomText>
                                + {addOn.title.toUpperCase()}
                              </CustomText>
                            </View>
                          );
                        })}
                    </View>
                  </Container>
                </AppointmentCard>
              </FadeInView>
            </Spacer>
          );
        }}
        keyExtractor={(item) => item.startTime}
      />
    </SafeArea>
  );
};
