import moment from "moment";

export const DAYSOFWEEK = {
  0: "sunday",
  1: "monday",
  2: "tuesday",
  3: "wednesday",
  4: "thursday",
  5: "friday",
  6: "saturday",
};

export const matchDatabaseDateFormat = (date) => {
  return moment(date).format("YYYY_MM_DD");
};

export const generateTimeSlots = (startTime, endTime) => {
  const slots = [];
  let currentTime = moment(startTime, "h:mm A");
  const endTimeMoment = moment(endTime, "h:mm A");

  while (currentTime.isSameOrBefore(endTimeMoment)) {
    slots.push(currentTime.format("h:mm A"));
    currentTime.add(15, "minutes");
  }

  return slots;
};

export const isBetweenTimes = (
  slot,
  scheduledAppointments,
  estimatedDuration
) => {
  for (const { startTime, endTime } of scheduledAppointments) {
    const start = moment(startTime, "h:mm A");
    const end = moment(endTime, "h:mm A");
    const startBuffer = moment(startTime, "h:mm A").subtract(
      estimatedDuration,
      "minutes"
    );

    if (
      (slot.isSameOrAfter(start) && slot.isBefore(end)) ||
      (slot.isAfter(startBuffer) && slot.isBefore(start))
    ) {
      return false;
    }
  }
  return true;
};

export const isBeforeNoon = (timeString) =>
  moment(timeString, "h:mm A").isBefore(moment("12:00 PM", "h:mm A"));

export const isBetweenNoonAndFive = (timeString) =>
  moment(timeString, "h:mm A").isBetween(
    moment("12:00 PM", "h:mm A"),
    moment("5:00 PM", "h:mm A"),
    null,
    "[)"
  );

export const sortArrayOfDateStrings = (a, b) =>
  moment(a, "YYYY_MM_DD").diff(moment(b, "YYYY_MM_DD"));
