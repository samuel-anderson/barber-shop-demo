import { useSelector } from "react-redux";
import { ServiceList } from "../../components/service-list/service-list.component";

import { Cart } from "../../components/cart/cart.component";

export const ChooseServiceScreen = ({ navigation }) => {
  const services = useSelector((state) => state.services.services);

  return (
    <>
      <ServiceList services={services} navigation={navigation} />
      <Cart />
    </>
  );
};
