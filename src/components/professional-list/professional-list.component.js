import { TouchableOpacity } from "react-native";
import { ProfessionalCardList } from "./professional-list.styles";
import { ProfessionalInfo } from "../professional-card/professional-card.component";
import { useDispatch } from "react-redux";
import { setProfessional } from "../../redux/cart/cartSlice";
import { FadeInView } from "../animations/fade.animation";
import { Spacer } from "../spacer/spacer.component";
import { SafeArea } from "../utility/safe-area.component";
import { PhotoBottomSheetProvider } from "../../contexts/PhotoBottomSheet.context";
export const ProfessionalList = ({ professionals, navigation }) => {
  const dispatch = useDispatch();

  return (
    <SafeArea>
      <PhotoBottomSheetProvider>
        <ProfessionalCardList
          data={professionals}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  dispatch(setProfessional({ professional: item }));
                  navigation.navigate("Choose a Service");
                }}
              >
                <Spacer position="bottom" size="large">
                  <FadeInView>
                    <ProfessionalInfo professional={item} index={index} />
                  </FadeInView>
                </Spacer>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.name}
        />
      </PhotoBottomSheetProvider>
    </SafeArea>
  );
};

export default ProfessionalCardList;
