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

export const Calendar = ({ clickHandler }) => {
  const dispatch = useDispatch();
  const [displayDate, setDisplayedDate] = useState(
    moment().format("MMMM Do, YYYY")
  );

  const serviceDate = useSelector((state) => state.cart.serviceDate);

  useEffect(() => {
    dispatch(setServiceDate(moment().format("YYYY-MM-DD"))); //Set to today's date
  }, []);

  const getClass = (date) => {
    if (!clickHandler(date)) return "notAvailable";

    if (moment(serviceDate).isSame(date)) return "selected";
    else return "notSelected";
  };
  const generateNext14Days = () => {
    const dates = [];
    const currentDate = moment(); // Get the current date

    while (currentDate.isSameOrBefore(moment().add(14, "days"))) {
      dates.push({
        value: currentDate.format("YYYY-MM-DD"),
        date: currentDate.date(),
        displayDate: currentDate.format("MMMM Do, YYYY"),
        day: currentDate.format("dd"),
      });

      currentDate.add(1, "days");
    }
    return dates;
  };

  return (
    <CalendarContainer>
      <Spacer position="top" size="large">
        <DisplayDate>{displayDate}</DisplayDate>
      </Spacer>
      <Spacer position="top" size="large">
        <DateContainer>
          {generateNext14Days().map((item, idx) => {
            let today = moment().dayOfYear() === moment(item.value).dayOfYear();

            return (
              <TouchableOpacity
                key={idx}
                disabled={getClass(item.value) === "notAvailable"}
                onPress={() => {
                  if (getClass(item.value) !== "notAvailable") {
                    setDisplayedDate(item.displayDate);
                    dispatch(setServiceDate(item.value));
                    dispatch(setStartTime(null));
                  }
                }}
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
