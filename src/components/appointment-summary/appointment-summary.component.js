import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import { showDurationTotal } from "../../util/cart";
import { selectDurationTotal } from "../../redux/cart/cartSelector";
import { showProfessional } from "../../util/cart";
import { showOrderTotal } from "../../util/cart";
import { selectOrderTotal } from "../../redux/cart/cartSelector";
export const AppointmentSummary = () => {
  const { professional, service } = useSelector((state) => state.cart);
  const durationTotal = useSelector(selectDurationTotal);
  const orderTotal = useSelector(selectOrderTotal);

  return (
    <View>
      <Text>Estimated Time: {showDurationTotal(durationTotal)}</Text>
      <Text>Professional: {showProfessional(professional)}</Text>
      <Text>Service: {service.title.toUpperCase()}</Text>
      <Text>Total: {showOrderTotal(orderTotal)}</Text>
    </View>
  );
};
