import { useSelector } from "react-redux";
import {
  selectAddOnTotal,
  selectOrderTotal,
} from "../../redux/cart/cartSelector";
import { showProfessional, showOrderTotal, showAddOns } from "../../util/cart";
import {
  Professional,
  Service,
  AddOns,
  Name,
  Total,
  ServiceTitle,
  ServicePrice,
  AddOnsText,
  ServiceDateTime,
} from "./cart.styles";
import { Spacer } from "../../components/spacer/spacer.component";
import moment from "moment";
import { View } from "react-native";

export const ProfessionalInfo = ({ professional, orderTotal }) => {
  return (
    <Spacer position="left" size="large">
      <Professional>
        <Name>{showProfessional(professional)}</Name>
        <Total>{showOrderTotal(orderTotal)}</Total>
      </Professional>
    </Spacer>
  );
};

export const ServiceInfo = ({ service }) => {
  return (
    <Spacer position="left" size="xl">
      <Service>
        <ServiceTitle>{service && service.title.toUpperCase()}</ServiceTitle>
        <ServicePrice>${service && service.price}</ServicePrice>
      </Service>
    </Spacer>
  );
};

export const DateInfo = ({ serviceDate, startTime }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-end",
      }}
    >
      {startTime && (
        <ServiceDateTime>
          {moment(serviceDate).format("MMM. Do")} @ {startTime}
        </ServiceDateTime>
      )}
    </View>
  );
};
export const CartContent = () => {
  const { professional, service, addOns, serviceDate, startTime } = useSelector(
    (state) => state.cart
  );

  const addOnTotal = useSelector(selectAddOnTotal);
  const orderTotal = useSelector(selectOrderTotal);

  return (
    <Spacer position="top" size="large">
      <ProfessionalInfo professional={professional} orderTotal={orderTotal} />
      <ServiceInfo service={service} />

      {addOns.length > 0 && (
        <Spacer position="left" size="xl">
          <AddOns>
            <AddOnsText>{showAddOns(addOns).replace("with", "+")}</AddOnsText>
            <AddOnsText>${addOnTotal}</AddOnsText>
          </AddOns>
        </Spacer>
      )}

      <DateInfo serviceDate={serviceDate} startTime={startTime} />
    </Spacer>
  );
};
