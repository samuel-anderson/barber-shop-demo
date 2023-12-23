import { useDispatch, useSelector } from "react-redux";
import { setStartTime } from "../../../redux/cart/cartSlice";
import { TouchableOpacity } from "react-native";
import { CellText, Cell } from "./time-slot-cell.styles";

export const TimeSlotCell = ({ slot }) => {
  const dispatch = useDispatch();

  const startTime = useSelector((state) => state.cart.startTime);

  const getTimeSlotClass = (slot) => {
    if (slot === startTime) return "selected";
    return "notSelected";
  };

  const clickHandler = () => {
    if (slot === startTime) dispatch(setStartTime(null));
    else dispatch(setStartTime(slot));
  };
  return (
    <TouchableOpacity onPress={clickHandler}>
      <Cell class={getTimeSlotClass(slot)}>
        <CellText class={getTimeSlotClass(slot)}>{slot}</CellText>
      </Cell>
    </TouchableOpacity>
  );
};
