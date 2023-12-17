import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { emptyCart } from "../../redux/cart/cartSlice";
import { ProfessionalList } from "../../components/professional-list/professional-list.component";
import { useIsFocused } from "@react-navigation/native";

export const ChooseBarberScreen = ({ navigation }) => {
  const professionals = useSelector((state) => state.professionals.barbers);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFocused) {
      dispatch(emptyCart());
    }
  }, [isFocused]);

  return (
    <ProfessionalList professionals={professionals} navigation={navigation} />
  );
};
