import React from "react";
import { View } from "react-native";
import { Text } from "../typography/text.component";
import {
  ProfessionalCard,
  ProfessionalCardCover,
  Info,
} from "./professional-card.styles";
// import { SvgXml } from "react-native-svg";

export const ProfessionalInfo = ({ professional = {}, index = 1 }) => {
  const getImageUrl = (index) => {
    switch (index) {
      case 0:
        return require(`../../../assets/profile-image-1.jpg`);
      case 1:
        return require(`../../../assets/profile-image-2.jpg`);
      default:
        return require(`../../../assets/profile-image-3.jpg`);
    }
  };
  return (
    <ProfessionalCard elevation={2}>
      <View>
        <ProfessionalCardCover
          key={professional.name}
          source={getImageUrl(index)}
        />
      </View>
      <Info>
        <Text variant="label">{professional.name}</Text>
      </Info>
    </ProfessionalCard>
  );
};
