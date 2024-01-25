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

  const getTimeSlotClass = (slot) =>
    slot === startTime ? "selected" : "notSelected";

  const clickHandler = (slot) => {
    dispatch(setStartTime(slot === startTime ? null : slot));
  };

  const slotClass = getTimeSlotClass(slot);

  const getIcon = () => {
    const size = 18;
    if (isBeforeNoon(slot)) {
      return (
        <Ionicons
          name={
            slotClass === "selected" ? "partly-sunny" : "partly-sunny-outline"
          }
          size={size}
          color="black"
        />
      );
    } else if (isBetweenNoonAndFive(slot)) {
      if (slotClass === "selected")
        return (
          <Ionicons
            name={slotClass === "selected" ? "sunny" : "sunny-outline"}
            size={size}
            color="black"
          />
        );
    } else {
      return (
        <Ionicons
          name={slotClass === "selected" ? "moon" : "moon-outline"}
          size={size}
          color="black"
        />
      );
    }
  };
  return (
    <TouchableOpacity onPress={() => clickHandler(slot)}>
      <Cell class={slotClass}>
        {getIcon()}
        <CellText class={slotClass}>{slot}</CellText>
      </Cell>
    </TouchableOpacity>
  );
};
