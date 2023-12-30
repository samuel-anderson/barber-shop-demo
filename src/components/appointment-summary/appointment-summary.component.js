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
import styled from "styled-components/native";
import { Spacer } from "../spacer/spacer.component";
import { Text } from "../typography/text.component";

const AddOnsText = styled(Text)`
  color: ${({ theme }) => theme.colors.text.inverse};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

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
    </Summary>
  );
};
