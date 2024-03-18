import { BARBER_SHOP_DATA } from "../data/index";
import { firebaseService } from "../services";
import { useEffect } from "react";
import { REACT_APP_FIREBASE_DB } from "@env";

const useFirebase = () => {
  useEffect(() => {
    firebaseService.createDocument(REACT_APP_FIREBASE_DB, BARBER_SHOP_DATA);
  });

  return {};
};

export default useFirebase;
