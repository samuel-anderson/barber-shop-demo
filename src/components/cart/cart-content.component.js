import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import {
  selectAddOnTotal,
  selectOrderTotal,
} from "../../redux/cart/cartSelector";
import {
  showProfessional,
  showOrderTotal,
  showAddOnsMobile,
} from "../../util/cart";
import {
  Content,
  Professional,
  Service,
  AddOns,
  Name,
  Total,
  ServiceTitle,
  ServicePrice,
} from "./cart.styles";

export const CartContent = () => {
  const { professional, service, addOns } = useSelector((state) => state.cart);
  const addOnTotal = useSelector(selectAddOnTotal);
  const orderTotal = useSelector(selectOrderTotal);

  return (
    <Content>
      <Professional>
        <Name>{showProfessional(professional)}</Name>
        <Total>{showOrderTotal(orderTotal)}</Total>
      </Professional>
      <Service>
        <ServiceTitle>{service && service.title.toUpperCase()}</ServiceTitle>
        <ServicePrice>${service && service.price}</ServicePrice>
      </Service>
      {addOns.length > 0 && (
        <AddOns>
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {showAddOnsMobile(addOns).replace("with", "+")}
          </Text>
          <Text style={{ color: "white", fontWeight: "bold" }}>
            ${addOnTotal}
          </Text>
        </AddOns>
      )}
    </Content>
  );
};
