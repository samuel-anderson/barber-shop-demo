import { useDispatch, useSelector } from "react-redux";
import { setStartTime } from "../../../redux/cart/cartSlice";
import { TouchableOpacity } from "react-native";
import { CellText, Cell } from "./time-slot-cell.styles";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import { isBeforeNoon, isBetweenNoonAndFive } from "../../../util/date";

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

  const slotClass = getTimeSlotClass(slot);

  const getIcon = () => {
    const size = 18;
    if (isBeforeNoon(slot)) {
      if (slotClass === "selected")
        return <Ionicons name="partly-sunny" size={size} color="black" />;
      else
        return (
          <Ionicons name="partly-sunny-outline" size={size} color="black" />
        );
    } else if (isBetweenNoonAndFive(slot)) {
      if (slotClass === "selected")
        return <Ionicons name="sunny" size={size} color="black" />;
      else return <Ionicons name="sunny-outline" size={size} color="black" />;
    } else {
      if (slotClass === "selected")
        return <Ionicons name="moon" size={size} color="black" />;
      else return <Ionicons name="moon-outline" size={size} color="black" />;
    }
  };
  return (
    <TouchableOpacity onPress={clickHandler}>
      <Cell class={slotClass}>
        {getIcon(slot)}
        <CellText class={slotClass}>{slot}</CellText>
      </Cell>
    </TouchableOpacity>
  );
};
