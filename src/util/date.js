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

export const matchDatabaseDateFormat = (date) =>
  moment(date).format("YYYY_MM_DD");

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
  for (var i = 0; i < scheduledAppointments.length; i++) {
    let { startTime, endTime } = scheduledAppointments[i];

    let start = moment(startTime, "h:mm A");
    let end = moment(endTime, "h:mm A");

    let startBuffer = moment(startTime, "h:mm A");
    startBuffer.subtract(estimatedDuration, "minutes");

    if (slot.isSameOrAfter(start) && slot.isBefore(end)) {
      return false;
    }

    //Allow enough time for the new service to be completed before next appointment
    if (slot.isAfter(startBuffer) && slot.isBefore(start)) {
      return false;
    }
  }
  return true;
};

export const isBeforeNoon = (timeString) => {
  const parsedTime = moment(timeString, "h:mm A");
  const beforeNoon = parsedTime.isBefore(moment("12:00 PM", "h:mm A"));
  return beforeNoon;
};

export const isBetweenNoonAndFive = (timeString) => {
  const parsedTime = moment(timeString, "h:mm A");
  const afterNoon = parsedTime.isSameOrAfter(moment("12:00 PM", "h:mm A"));
  const beforeFive = parsedTime.isBefore(moment("5:00 PM", "h:mm A"));
  return afterNoon && beforeFive;
};

export const sortArrayOfDateStrings = (a, b) => {
  const momentA = moment(a, "YYYY_MM_DD");
  const momentB = moment(b, "YYYY_MM_DD");

  if (momentA.isBefore(momentB)) {
    return -1;
  } else if (momentA.isSame(momentB)) {
    return 0;
  } else {
    return 1;
  }
};
