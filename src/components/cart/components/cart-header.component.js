import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

import { selectDurationTotal } from "../../../redux/cart/cartSelector";
import { showDurationTotal } from "../../../util/cart";
import { Header, Duration, Title, ExpandIcon } from "../cart.styles";
import { MaterialIcons } from "@expo/vector-icons";

export const CartHeader = ({ cartIndex, expandHandler }) => {
  const durationTotal = useSelector(selectDurationTotal);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Header>
      <Title>
        Your Order <Duration>{showDurationTotal(durationTotal)}</Duration>
      </Title>
      <ExpandIcon>
        <TouchableOpacity onPress={() => expandHandler(1)}>
          {cartIndex == 0 && (
            <MaterialIcons name="expand-less" size={30} color="gray" />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => expandHandler(0)}>
          {cartIndex == 1 && (
            <MaterialIcons name="expand-more" size={30} color="gray" />
          )}
        </TouchableOpacity>
      </ExpandIcon>
    </Header>
  );
};
