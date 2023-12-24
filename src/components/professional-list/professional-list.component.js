import { TouchableOpacity } from "react-native";
import { ProfessionalCardList } from "./professional-list.styles";
import { ProfessionalInfo } from "../professional-card/professional-card.component";
import { useDispatch } from "react-redux";
import { setProfessional } from "../../redux/cart/cartSlice";
import { FadeInView } from "../animations/fade.animation";
import { Spacer } from "../spacer/spacer.component";
import { SafeArea } from "../utility/safe-area.component";
import { ClientNav_Screens } from "../../navigation/client.navigator";

export const ProfessionalList = ({ professionals, navigation }) => {
  const dispatch = useDispatch();

  return (
    <SafeArea>
      <ProfessionalCardList
        data={professionals}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                dispatch(setProfessional({ professional: item }));
                navigation.navigate(ClientNav_Screens.chooseService);
              }}
            >
              <Spacer position="bottom" size="large">
                <FadeInView>
                  <ProfessionalInfo professional={item} />
                </FadeInView>
              </Spacer>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  );
};

export default ProfessionalCardList;
