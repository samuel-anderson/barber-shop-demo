import { SafeArea } from "../utility/safe-area.component";
import { ServiceCard } from "../service-card/service-card.component";
import { ServiceCardList } from "./service-list.styles";
import { useSelector } from "react-redux";
import { View } from "react-native";
import { Spacer } from "../spacer/spacer.component";
import styled from "styled-components/native";
import { Text } from "../typography/text.component";

const Title = styled(Text)`
  font-size: ${({ theme }) => theme.fontSizes.title};
  font-weight: bold;
`;

export const ServiceList = ({ services }) => {
  const selectedProfessional = useSelector((state) => state.cart.professional);
  const selectedService = useSelector((state) => state.cart.service);

  const filterServiceByBarber = (barber) => {
    const barberServices = Object.values(barber.services);

    const filteredServices = services
      .filter((service) =>
        barberServices.some((filterService) => filterService?.id === service.id)
      )
      .map((service) => {
        const customService = barberServices.find(
          (item) => item?.id === service.id
        );
        return {
          ...service,
          duration: customService.duration,
        };
      });
    return filteredServices;
  };

  const getServiceList = () => {
    if (selectedProfessional && selectedProfessional.services) {
      if (Object.entries(selectedProfessional.services).length > 0)
        return filterServiceByBarber(selectedProfessional);
    }

    return services.filter(
      (service) => service.id == "haircut" || service.id == "lineup_neck"
    );
  };

  const filteredList = getServiceList().filter((service) => {
    if (!selectedService) return true;
    return service.id !== selectedService.id;
  });

  return (
    <SafeArea>
      {selectedService && <ServiceCard service={selectedService} />}

      <Spacer />
      {selectedService && filteredList.length > 0 && (
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
