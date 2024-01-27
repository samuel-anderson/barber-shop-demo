import { useDispatch, useSelector } from "react-redux";
import { ServiceList } from "../../components/service-list/service-list.component";
import { ServiceBottomSheet } from "../../components/service-bottom-sheet/service-bottom-sheet.component";
import { useEffect } from "react";
import { setServiceDate, setStartTime } from "../../redux/cart/cartSlice";
import { useIsFocused } from "@react-navigation/native";

export const ChooseServiceScreen = ({ navigation }) => {
  const services = useSelector((state) => state.services.services);
  const dispatch = useDispatch();

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      dispatch(setServiceDate(null));
      dispatch(setStartTime(null));
    }
  }, [isFocused]);

  return (
    <>
      <ServiceList services={Object.values(services)} navigation={navigation} />
      <ServiceBottomSheet />
    </>
  );
};
