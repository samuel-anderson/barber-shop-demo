import { TouchableOpacity } from "react-native";
import { ProfessionalCardList } from "./professional-list.styles";
import { ProfessionalInfo } from "../professional-card/professional-card.component";
import { useDispatch } from "react-redux";
import { setProfessional } from "../../redux/cart/cartSlice";
import { FadeInView } from "../animations/fade.animation";
import { Spacer } from "../spacer/spacer.component";
import { SafeArea } from "../utility/safe-area.component";

export const ProfessionalList = ({ professionals, navigation }) => {
  const dispatch = useDispatch();

  return (
    <SafeArea style={{ flexDirection: "row" }}>
      <ProfessionalCardList
        data={professionals}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                dispatch(setProfessional({ professional: item }));
                navigation.navigate("Choose Service");
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
