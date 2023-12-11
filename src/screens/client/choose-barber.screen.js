import { View } from "react-native";
import { useSelector } from "react-redux";

import { ProfessionalList } from "../../components/professional-list/professional-list.component";

export const ChooseBarberScreen = ({ navigation }) => {
  const professionals = useSelector((state) => state.professionals.barbers);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ProfessionalList professionals={professionals} navigation={navigation} />
    </View>
  );
};
