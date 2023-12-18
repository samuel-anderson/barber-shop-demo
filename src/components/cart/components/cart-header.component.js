import { View, Text } from "react-native";
import { useSelector } from "react-redux";

import { selectDurationTotal } from "../../../redux/cart/cartSelector";
import { showDurationTotal } from "../../../util/cart";
import { Header, Duration, Title } from "../cart.styles";

export const CartHeader = () => {
  const durationTotal = useSelector(selectDurationTotal);

  return (
    <Header>
      <Title>Your Order</Title>
      <Duration>{showDurationTotal(durationTotal)}</Duration>
    </Header>
  );
};
