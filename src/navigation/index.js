import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { ClientNavigator } from "./client.navigator";
import { BarberNavigator } from "./barber.navigator";
import { useSelector, useDispatch } from "react-redux";
import { checkUserSession } from "../redux/user/userSlice";
import useFirebase from "../hooks/useFirebase";
import { updateProfessionalEmail } from "../util/firebase";

export const Navigation = () => {
  const dispatch = useDispatch();
  useFirebase(); //INITIAL LAUNCH

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  useEffect(() => {
    if (user.currentUser) setIsAuthenticated(true);
    else setIsAuthenticated(false);
  }, [user]);

  useEffect(() => {
    const test = async () => {
      //await updateProfessionalEmail("samuel_anderson", "same@test.com");
    };

    test();
  });
  return (
    <NavigationContainer>
      {isAuthenticated ? <BarberNavigator /> : <ClientNavigator />}
    </NavigationContainer>
  );
};
