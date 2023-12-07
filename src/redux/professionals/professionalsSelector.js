import { createSelector } from "@reduxjs/toolkit";

const selectBarbers = (state) => state.professionals.barbers;
const selectCurrentUser = (state) => state.user.currentUser;

export const selectBarberEmails = createSelector(selectBarbers, (barbers) => {
  return barbers.map((barber) => barber.email);
});

export const selectBarberWithCurrentUser = createSelector(
  selectBarbers,
  selectCurrentUser,
  (barbers, currentUser) => {
    if (currentUser)
      return barbers.filter((barber) => barber.email === currentUser.email)[0];

    return null;
  }
);
