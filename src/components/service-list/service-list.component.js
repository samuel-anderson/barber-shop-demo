import { SafeArea } from "../utility/safe-area.component";
import { ServiceCard } from "../service-card/service-card.component";
import { ServiceCardList } from "./service-list.styles";
import { useSelector } from "react-redux";
import { View } from "react-native";
import { Spacer } from "../spacer/spacer.component";
import styled from "styled-components/native";
import { FadeInView } from "../animations/fade.animation";
import { Text } from "../typography/text.component";

const Title = styled(Text)`
  font-size: ${({ theme }) => theme.fontSizes.title};
  font-weight: bold;
`;

export const ServiceList = ({ services }) => {
  const selectedProfessional = useSelector((state) => state.cart.professional);
  const selectedService = useSelector((state) => state.cart.service);

  const filterServiceByBarber = (barber) => {
    const filteredServices = services
      .filter((service) =>
        barber.services.some((filterService) => filterService.id === service.id)
      )
      .map((service) => {
        const customService = barber.services.find(
          (item) => item.id === service.id
        );
        return {
          ...service,
          duration: customService.duration,
        };
      });
    return filteredServices;
  };

  const serviceList =
    selectedProfessional && selectedProfessional.services
      ? filterServiceByBarber(selectedProfessional)
      : services;

  const filteredList = serviceList.filter((service) => {
    if (!selectedService) return true;
    return service.id !== selectedService.id;
  });

  return (
    <SafeArea>
      {selectedService && (
        <FadeInView duration={1000}>
          <ServiceCard service={selectedService} />
        </FadeInView>
      )}

      <Spacer />
      {selectedService && (
        <View style={{ margin: 15 }}>
          <Title>Anything you wish to add?</Title>
        </View>
      )}

      <ServiceCardList
        data={filteredList}
        renderItem={({ item }) => {
          return <ServiceCard service={item} />;
        }}
        keyExtractor={(item) => item.title}
        numColumns={2}
      />

      <Spacer size="xxl" />
    </SafeArea>
  );
};
