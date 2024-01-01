import { useRef, useMemo, useEffect, useState, useCallback } from "react";

import { Cart } from "../cart/cart.component";
import { TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { selectDurationTotal } from "../../redux/cart/cartSelector";
import { setEstimatedDuration } from "../../redux/cart/cartSlice";

import { CartButton } from "./time-bottom-sheet.styles";
import BottomSheet from "@gorhom/bottom-sheet";
import { Spacer } from "../spacer/spacer.component";
import { Text } from "../typography/text.component";
import styled from "styled-components/native";
import { CustomButton } from "../custom-button/custom-button.component";

const BtnText = styled(Text)`
  color: ${({ theme }) => theme.colors.text.inverse};
  font-weight: bold;
`;

export const TimeBottomSheet = () => {
  const dispatch = useDispatch();
  const { startTime } = useSelector((state) => state.cart);

  const [cartIndex, setCartIndex] = useState(0);
  const durationTotal = useSelector(selectDurationTotal);

  const navigation = useNavigation();

  useEffect(() => {
    if (startTime) handleExpand();
  }, [startTime]);

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["10%", "33%"], []);

  const handleExpand = () => {
    bottomSheetRef.current.expand();
  };

  const handleSheetChanges = useCallback((index) => {
    setCartIndex(index);
  }, []);

  const handleIconClick = (index) => bottomSheetRef.current.snapToIndex(index);

  const handleNavigation = () => {
    dispatch(setEstimatedDuration(durationTotal));
    navigation.navigate("Book Appointment");
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={cartIndex}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      backgroundStyle={{ backgroundColor: "black" }}
    >
      <Cart handleIconClick={handleIconClick} cartIndex={cartIndex} />

      {startTime && (
        <Spacer position="top" size="medium">
          <CustomButton text={"I'm done"} pressHandler={handleNavigation} />
        </Spacer>
      )}
    </BottomSheet>
  );
};
