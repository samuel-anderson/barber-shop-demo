import { View } from "react-native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Text } from "../../../components/typography/text.component";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBarberStart } from "../../../redux/professionals/professionalsSlice";

export const Main = () => {
  const dispatch = useDispatch();
  const servicesData = useSelector((state) => state.services.services);

  useEffect(() => {
    dispatch(
      addBarberStart({
        barberInfo: {
          id: "joe_johnson",
          firstName: "FirstName",
          lastName: "LastName",
          displayName: "First Last Name",
          phoneNumber: "+17602774923",
          email: "test@test.com",
          services: {
            ["haircut"]: servicesData["haircut"],
            ["lineup_neck"]: servicesData["lineup_neck"],
          },
        },
      })
    );
  }, []);
  return (
    <SafeArea
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <View style={{ width: "80%" }}>
        <Text>Admin Main Screen</Text>
      </View>
    </SafeArea>
  );
};
