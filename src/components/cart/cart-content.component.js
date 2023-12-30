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
import styled from "styled-components/native";
import { Spacer } from "../../components/spacer/spacer.component";
import { Text } from "../typography/text.component";

const AddOnsText = styled(Text)`
  color: ${({ theme }) => theme.colors.text.inverse};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const CartContent = () => {
  const { professional, service, addOns } = useSelector((state) => state.cart);
  const addOnTotal = useSelector(selectAddOnTotal);
  const orderTotal = useSelector(selectOrderTotal);

  return (
    <Spacer position="top" size="large">
      <Content>
        <Spacer position="left" size="large">
          <Professional>
            <Name>{showProfessional(professional)}</Name>
            <Total>{showOrderTotal(orderTotal)}</Total>
          </Professional>
        </Spacer>
        <Spacer position="left" size="xl">
          <Service>
            <ServiceTitle>
              {service && service.title.toUpperCase()}
            </ServiceTitle>
            <ServicePrice>${service && service.price}</ServicePrice>
          </Service>
        </Spacer>
        {addOns.length > 0 && (
          <Spacer position="left" size="xl">
            <AddOns>
              <AddOnsText>
                {showAddOnsMobile(addOns).replace("with", "+")}
              </AddOnsText>
              <AddOnsText>${addOnTotal}</AddOnsText>
            </AddOns>
          </Spacer>
        )}
      </Content>
    </Spacer>
  );
};
