import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { useSelector } from "react-redux";

export const ChooseServiceScreen = ({ navigation }) => {
  const services = useSelector((state) => state.services.services);
  const selectedService = useSelector((state) => state.cart.service);
  const selectedProfessional = useSelector((state) => state.cart.professional);

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
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {selectedService && <Text>Selected: {selectedService.title}</Text>}
      {serviceList
        .filter((service) => {
          if (!selectedService) return true;
          return service.id !== selectedService.id;
        })
        .map((service) => {
          return <Text>{service.title}</Text>;
        })}
      <Button onPress={() => navigation.navigate("Choose Time")}>
        Choose Time
      </Button>
    </View>
  );
};
