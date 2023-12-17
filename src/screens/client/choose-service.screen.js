import { Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  ServiceList,
  Service,
  Duration,
  Title,
  Price,
  Icon,
} from "./styles/choose-service.styles";
import { SafeArea } from "../../components/utility/safe-area.component";
import { useDispatch } from "react-redux";
import {
  addService,
  removeService,
  addAddOn,
  removeAddOn,
  removeAddOns,
} from "../../redux/cart/cartSlice";
import { Entypo } from "@expo/vector-icons";

export const ChooseServiceScreen = ({ navigation }) => {
  const services = useSelector((state) => state.services.services);
  const selectedService = useSelector((state) => state.cart.service);
  const selectedProfessional = useSelector((state) => state.cart.professional);

  const dispatch = useDispatch();

  const selectedAddOns = useSelector((state) => state.cart.addOns);
  const [isSelected, setIsSelected] = useState(null);
  const [isAddOn, setIsAddOn] = useState(false);

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

  const clickHandler = (service) => {
    if (!selectedService) dispatch(addService({ service }));
    else if (!isSelectedAddOn(service.id))
      dispatch(addAddOn({ addOn: service }));
    else dispatch(removeAddOn({ addOn: service }));
  };

  const onClearHandler = () => {
    dispatch(removeService());
    dispatch(removeAddOns());
  };

  const isServiceSelected = () => {
    if (isSelected) return true;
    else return false;
  };

  const isSelectedAddOn = (id) => {
    return selectedAddOns.some((addOn) => addOn.id === id);
  };
  return (
    <SafeArea>
      {selectedService && (
        <Service isSelectedService>
          <Title isSelectedService>{selectedService.title.toUpperCase()}</Title>
          <Duration isSelectedService>{selectedService.duration} min</Duration>
          <Price isSelectedService>${selectedService.price}</Price>

          <Icon>
            <TouchableOpacity onPress={onClearHandler}>
              <Entypo name="cross" size={22} />
            </TouchableOpacity>
          </Icon>
        </Service>
      )}
      <ServiceList
        data={filteredList}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => clickHandler(item)}>
              <Service isSelectedAddOn={isSelectedAddOn(item.id)}>
                <Title>{item.title.toUpperCase()}</Title>
                <Duration>{item.duration} min</Duration>
                <Price>${item.price}</Price>
              </Service>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.title}
        numColumns={2}
      />
    </SafeArea>
  );
};
