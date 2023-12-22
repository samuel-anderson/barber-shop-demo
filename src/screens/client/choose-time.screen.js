import { View, Text } from "react-native";
import { Cart } from "../../components/cart/cart.component";
import { TimeBottomSheet } from "../../components/time-bottom-sheet/time-bottom-sheet.component";

export const ChooseTimeScreen = ({ navigation }) => {
  //Availability (component)
  //-calendar (sub components)
  //-timeslot (sub components)
  return (
    <>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Time Screen</Text>
      </View>
      <TimeBottomSheet />
    </>
  );
};
