import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { useSelector } from "react-redux";
import { setProfessional } from "../../redux/cart/cartSlice";
import { useDispatch } from "react-redux";

export const ChooseBarberScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const professionals = useSelector((state) => state.professionals.barbers);

  const clickHandler = (professional) => {
    dispatch(setProfessional({ professional: professional }));
    navigation.navigate("Choose Service");
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {professionals.length &&
        professionals.map((profesional) => (
          <Button onPress={() => clickHandler(profesional)}>
            {profesional.name}
          </Button>
        ))}
    </View>
  );
};
