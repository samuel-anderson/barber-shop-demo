import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import {
  showDurationTotal,
  showOrderTotal,
  showProfessional,
  showAddOnsMobile,
} from "../../util/cart";
import {
  selectDurationTotal,
  selectOrderTotal,
  selectAddOnTotal,
} from "../../redux/cart/cartSelector";
import {
  Summary,
  Header,
  Title,
  Professional,
  AddOns,
  Service,
  ServiceTitle,
  ServicePrice,
  Duration,
  Content,
  Name,
  Total,
} from "./appointment-summary.styles";

export const AppointmentSummary = () => {
  const { professional, service, addOns } = useSelector((state) => state.cart);
  const durationTotal = useSelector(selectDurationTotal);
  const orderTotal = useSelector(selectOrderTotal);
  const addOnTotal = useSelector(selectAddOnTotal);

  return (
    <Summary>
      <Header>
        <Title>
          Your Order <Duration>{showDurationTotal(durationTotal)}</Duration>
        </Title>
      </Header>

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
    </Summary>
  );
};
