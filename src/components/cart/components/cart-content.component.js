import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import {
  selectAddOnTotal,
  selectOrderTotal,
} from "../../../redux/cart/cartSelector";
import {
  showProfessional,
  showOrderTotal,
  showAddOnsMobile,
} from "../../../util/cart";
import { Content, Professional, Service, AddOns } from "../cart.styles";

export const CartContent = () => {
  const { professional, service, addOns } = useSelector((state) => state.cart);
  const addOnTotal = useSelector(selectAddOnTotal);
  const orderTotal = useSelector(selectOrderTotal);

  return (
    <Content>
      <Professional>
        <Text style={{ color: "white", fontWeight: "bold" }}>
          {showProfessional(professional)}
        </Text>
        <Text style={{ color: "white", fontWeight: "bold" }}>
          {showOrderTotal(orderTotal)}
        </Text>
      </Professional>
      <Service>
        <Text style={{ color: "white", fontWeight: "bold" }}>
          {service && service.title.toUpperCase()}
        </Text>
        <Text style={{ color: "white", fontWeight: "bold" }}>
          ${service && service.price}
        </Text>
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
