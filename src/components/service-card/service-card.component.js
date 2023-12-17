import { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  removeAddOn,
  addAddOn,
  addService,
  removeAddOns,
  removeService,
} from "../../redux/cart/cartSlice";
import { Service, Title, Duration, Price, Icon } from "./service-card.styles";
import { Entypo } from "@expo/vector-icons";

export const ServiceCard = ({ service }) => {
  const dispatch = useDispatch();

  const [isSelectedService, setIsSelectedService] = useState(false);
  const [isAddOn, setIsAddOn] = useState(false);

  const selectedService = useSelector((state) => state.cart.service);
  const selectedAddOns = useSelector((state) => state.cart.addOns);

  useEffect(() => {
    selectedService && setIsSelectedService(service.id === selectedService.id);
    selectedAddOns &&
      setIsAddOn(selectedAddOns.some((addOn) => addOn.id === service.id));
  });

  const clickHandler = (service) => {
    if (!selectedService) dispatch(addService({ service }));
    else if (!isAddOn) dispatch(addAddOn({ addOn: service }));
    else dispatch(removeAddOn({ addOn: service }));
  };

  const onClearHandler = () => {
    dispatch(removeService());
    dispatch(removeAddOns());
  };
  return (
    <TouchableOpacity
      onPress={() => {
        if (isSelectedService) return;
        clickHandler(service);
      }}
    >
      <Service isSelectedService={isSelectedService} isAddOn={isAddOn}>
        <Title isSelectedService={isSelectedService}>
          {service.title.toUpperCase()}
        </Title>
        <Duration isSelectedService={isSelectedService}>
          {service.duration} min
        </Duration>
        <Price isSelectedService={isSelectedService}>${service.price}</Price>

        {isSelectedService && (
          <Icon>
            <TouchableOpacity onPress={onClearHandler}>
              <Entypo name="cross" size={22} />
            </TouchableOpacity>
          </Icon>
        )}
      </Service>
    </TouchableOpacity>
  );
};
