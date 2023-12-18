import { useRef, useMemo, useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";

import { View, Text } from "react-native";

import BottomSheet from "@gorhom/bottom-sheet";
import { CartHeader } from "./components/cart-header.component";
import { CartContent } from "./components/cart-content.component";
import { CartContainer } from "./cart.styles";

export const Cart = () => {
  const selectedService = useSelector((state) => state.cart.service);
  const [cartIndex, setCartIndex] = useState(-1);

  useEffect(() => {
    if (selectedService) handleExpand();
    else handleClose();
  }, [selectedService]);

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["10%", "33%"], []);

  const handleClose = () => bottomSheetRef.current.close();
  const handleExpand = () => bottomSheetRef.current.expand();
  //const handleMinimize = () => bottomSheetRef.current.snapToIndex(0);

  const handleSheetChanges = useCallback((index) => {
    setCartIndex(index);
  }, []);

  const handleIconClick = (index) => bottomSheetRef.current.snapToIndex(index);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      backgroundStyle={{ backgroundColor: "black" }}
    >
      <CartContainer>
        <CartHeader cartIndex={cartIndex} expandHandler={handleIconClick} />
        <CartContent />
      </CartContainer>
    </BottomSheet>
  );
};
