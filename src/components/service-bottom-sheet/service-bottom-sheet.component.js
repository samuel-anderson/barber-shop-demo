import { useRef, useMemo, useEffect, useState, useCallback } from "react";
import styled, { useTheme } from "styled-components";

import { Cart } from "../cart/cart.component";
import { TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { selectDurationTotal } from "../../redux/cart/cartSelector";
import { setEstimatedDuration } from "../../redux/cart/cartSlice";

import { CartButton } from "./service-bottom-sheet.styles";
import BottomSheet from "@gorhom/bottom-sheet";
import { Text } from "../typography/text.component";
import { Spacer } from "../spacer/spacer.component";

const BtnText = styled(Text)`
  color: ${({ theme }) => theme.colors.text.inverse};
  font-weight: bold;
`;

export const ServiceBottomSheet = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const selectedService = useSelector((state) => state.cart.service);
  const [cartIndex, setCartIndex] = useState(-1);
  const durationTotal = useSelector(selectDurationTotal);

  const navigation = useNavigation();

  useEffect(() => {
    if (selectedService) handleExpand();
    else handleClose();
  }, [selectedService]);

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["10%", "33%"], []);

  const handleClose = () => {
    bottomSheetRef.current.close();
  };
  const handleExpand = () => {
    bottomSheetRef.current.expand();
  };

  const handleSheetChanges = useCallback((index) => {
    setCartIndex(index);
  }, []);

  const handleIconClick = (index) => bottomSheetRef.current.snapToIndex(index);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={cartIndex}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      backgroundStyle={{ backgroundColor: theme.colors.bg.tertiary }}
    >
      <Cart handleIconClick={handleIconClick} cartIndex={cartIndex} />

      <TouchableOpacity
        onPress={() => {
          dispatch(setEstimatedDuration(durationTotal));
          navigation.navigate("Choose a Time");
        }}
      >
        <Spacer position="top" size="xl">
          <CartButton>
            <BtnText>Choose Time</BtnText>
          </CartButton>
        </Spacer>
      </TouchableOpacity>
    </BottomSheet>
  );
};
