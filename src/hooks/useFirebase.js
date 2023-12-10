import { BARBER_SHOP_DATA } from "../data/index";
import { firebaseService } from "../services";
import { useEffect } from "react";

const useFirebase = () => {
  useEffect(() => {
    firebaseService.createDocument("barber_shop", BARBER_SHOP_DATA);
    //firebaseApi.updateDoc("barber_shop", "appointments", objectUpdate);
  });

  return {};
};

export default useFirebase;
