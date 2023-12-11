import React from "react";
import { View } from "react-native";
import { Text } from "../typography/text.component";
import {
  ProfessionalCard,
  ProfessionalCardCover,
  Info,
} from "./professional-card.styles";
// import { SvgXml } from "react-native-svg";

export const ProfessionalInfo = ({ professional = {} }) => {
  return (
    <ProfessionalCard elevation={2}>
      <View>
        <ProfessionalCardCover
          key={professional.name}
          source={{
            uri: "https://images.fresha.com/lead-images/placeholders/barbershop-35.jpg?class=venue-gallery-large",
          }}
        />
      </View>
      <Info>
        <Text variant="label">{professional.name}</Text>
      </Info>
    </ProfessionalCard>
  );
};
