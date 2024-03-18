import {
  sendSMS,
  appointmentObjectToAdd,
  updateDocument,
  barberObjectToAdd,
} from "../../util/firebase";
import {
  REACT_APP_FIREBASE_DB,
  REACT_APP_FIREBASE_PROFESSIONALS_DOC,
} from "@env";

const showAddOns = (cart) => {
  if (cart.addOns.length === 0) return "";
  else if (cart.addOns.length === 1) return ` with ${cart.addOns.length} addon`;
  else return ` with ${cart.addOns.length} addons`;
};

export const insertBarber = (barberId, barberInfo) => {
  const updateObj = barberObjectToAdd(barberId, barberInfo);
  updateDocument(
    REACT_APP_FIREBASE_DB,
    REACT_APP_FIREBASE_PROFESSIONALS_DOC,
    updateObj
  );
};

export const insertBooking = (cart, clientInfo, status = "pending") => {
  const { clientFirstName, clientLastName, clientPhoneNumber, clientName } =
    clientInfo;

  const updateObj = appointmentObjectToAdd(
    cart.professional.id,
    cart.serviceDate,
    {
      clientName: clientName || `${clientFirstName} ${clientLastName}`,
      clientPhoneNumber: clientPhoneNumber,
      service: cart.service,
      addOns: cart.addOns,
      serviceDate: cart.serviceDate,
      startTime: cart.startTime,
      endTime: cart.endTime,
      estimatedDuration: cart.estimatedDuration,
      status: status,
    }
  );
  updateDocument(
    REACT_APP_FIREBASE_DB,
    REACT_APP_FIREBASE_APPOINTMENTS_DOC,
    updateObj
  );
};

export const submitBooking = (cart, clientInfo) => {
  try {
    const { clientFirstName, clientLastName, clientPhoneNumber } = clientInfo;
    insertBooking(cart, clientInfo);
    if (cart.professional) {
      return sendSMS({
        clientName: `${clientFirstName} ${clientLastName}`,
        professionalPhoneNumber: cart.professional.phoneNumber,
        date: cart.serviceDate,
        startTime: cart.startTime,
        endTime: cart.endTime,
        service: cart.service.title + showAddOns(cart),
        clientPhoneNumber: clientPhoneNumber,
      });
    }
  } catch (e) {
    console.log(e);
  }
};
