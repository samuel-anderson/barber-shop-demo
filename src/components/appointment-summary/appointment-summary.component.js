import { useSelector } from "react-redux";
import { Summary, AddOns, AddOnsText } from "./appointment-summary.styles";
import { Spacer } from "../spacer/spacer.component";
import { Order } from "../cart/cart-header.component";
import {
  selectDurationTotal,
  selectOrderTotal,
} from "../../redux/cart/cartSelector";

import {
  DateInfo,
  ProfessionalInfo,
  ServiceInfo,
} from "../cart/cart-content.component";

export const AppointmentSummary = () => {
  const { professional, service, addOns, serviceDate, startTime } = useSelector(
    (state) => state.cart
  );
  const durationTotal = useSelector(selectDurationTotal);
  const orderTotal = useSelector(selectOrderTotal);

  return (
    <Summary>
      <Order durationTotal={durationTotal} />
      <Spacer position="top" size="large">
        <ProfessionalInfo professional={professional} orderTotal={orderTotal} />
        <ServiceInfo service={service} />
        {addOns.length > 0 && (
          <Spacer position="left" size="xl">
            {addOns.map((addOn, idx) => {
              return (
                <AddOns key={idx}>
                  <AddOnsText>+ {addOn.title.toUpperCase()}</AddOnsText>
                  <AddOnsText>${addOn.price}</AddOnsText>
                </AddOns>
              );
            })}
          </Spacer>
        )}
        <DateInfo serviceDate={serviceDate} startTime={startTime} />
      </Spacer>
    </Summary>
  );
};
