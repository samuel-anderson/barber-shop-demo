import { TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

import { selectDurationTotal } from "../../redux/cart/cartSelector";
import { showDurationTotal } from "../../util/cart";
import { Header, Duration, Title, ExpandIcon } from "./cart.styles";
import { MaterialIcons } from "@expo/vector-icons";
import styled, { useTheme } from "styled-components/native";
import { Text } from "../../components/typography/text.component";

export const Order = ({ durationTotal }) => {
  return (
    <Title>
      Your Order <Duration>{showDurationTotal(durationTotal)}</Duration>
    </Title>
  );
};
export const CartHeader = ({ cartIndex, expandHandler }) => {
  const durationTotal = useSelector(selectDurationTotal);
  const theme = useTheme();

  return (
    <Header>
      <Order durationTotal={durationTotal} />
      <ExpandIcon>
        <TouchableOpacity onPress={() => expandHandler(1)}>
          {cartIndex == 0 && (
            <MaterialIcons
              name="expand-less"
              size={30}
              color={theme.colors.text.secondary}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => expandHandler(0)}>
          {cartIndex == 1 && (
            <MaterialIcons
              name="expand-more"
              size={30}
              color={theme.colors.text.secondary}
            />
          )}
        </TouchableOpacity>
      </ExpandIcon>
    </Header>
  );
};
