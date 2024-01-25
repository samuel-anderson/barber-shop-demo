import { useSelector } from "react-redux";
import { View, StyleSheet } from "react-native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { selectBarberWithCurrentUser } from "../../../redux/professionals/professionalsSelector";
import { Spacer } from "../../../components/spacer/spacer.component";
import { CustomButton } from "../../../components/custom-button/custom-button.component";
import { useNavigation } from "@react-navigation/native";

export const Profile = () => {
  const navigation = useNavigation();
  const currentUser = useSelector(selectBarberWithCurrentUser);

  return (
    <SafeArea>
      <View style={{ width: "100%", padding: 20 }}>
        {["Contact Information", "Work Schedule", "Days Off"].map((screen) => {
          return (
            <Spacer position="top" size="small" key={screen}>
              <CustomButton
                text={screen}
                variant="dark"
                buttonOptions={{
                  style: { borderRadius: 10 },
                  onPress: () => {
                    navigation.navigate(screen, { user: currentUser });
                  },
                }}
              />
            </Spacer>
          );
        })}
      </View>
    </SafeArea>
  );
};
