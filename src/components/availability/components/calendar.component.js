import moment from "moment";
import { useEffect, useState } from "react";
import {
  CalendarContainer,
  DateContainer,
  Date,
  DateLabel,
  DateText,
  DateLabelText,
  DateBefore,
  DisplayDate,
  DateAfter,
} from "./calendar.styles";
import { useDispatch, useSelector } from "react-redux";

import { setServiceDate, setStartTime } from "../../../redux/cart/cartSlice";
import { TouchableOpacity, View } from "react-native";
import { Spacer } from "../../spacer/spacer.component";

export const Calendar = ({ clickHandler, serviceDate }) => {
  const dispatch = useDispatch();
  const [displayDate, setDisplayedDate] = useState(
    moment().format("MMMM Do, YYYY")
  );

  useEffect(() => {
    dispatch(setServiceDate(moment().format("YYYY-MM-DD"))); //Set to today's date
  }, []);

  const getClass = (date) => {
    if (!clickHandler(date)) return "notAvailable";

    if (moment(serviceDate).isSame(date)) return "selected";
    else return "notSelected";
  };
  const generateNext14Days = () => {
    const currentDate = moment();

    const dates = Array.from({ length: 14 }, (_, idx) => {
      const nextDate = currentDate.clone().add(idx, "days");
      return {
        value: nextDate.format("YYYY-MM-DD"),
        date: nextDate.date(),
        displayDate: nextDate.format("MMMM Do, YYYY"),
        day: nextDate.format("dd"),
      };
    });

    return dates;
  };

  const handleDateSelection = (item) => {
    setDisplayedDate(item.displayDate);
    dispatch(setServiceDate(item.value));
    dispatch(setStartTime(null));
  };

  return (
    <CalendarContainer>
      <Spacer position="top" size="large">
        <DisplayDate>{displayDate}</DisplayDate>
      </Spacer>
      <Spacer position="top" size="large">
        <DateContainer>
          {generateNext14Days().map((item, idx) => {
            let today = moment().isSame(item.value, "day");
            const disabled = getClass(item.value) === "notAvailable";

            return (
              <TouchableOpacity
                key={idx}
                disabled={disabled}
                onPress={() => !disabled && handleDateSelection(item)}
              >
                <Date class={getClass(item.value)}>
                  <DateBefore class={getClass(item.value)} />
                  <DateText>{item.date}</DateText>
                  {today && <DateAfter />}
                </Date>
                <DateLabel>
                  <DateLabelText>{item.day}</DateLabelText>
                </DateLabel>
              </TouchableOpacity>
            );
          })}
        </DateContainer>
      </Spacer>
    </CalendarContainer>
  );
};
