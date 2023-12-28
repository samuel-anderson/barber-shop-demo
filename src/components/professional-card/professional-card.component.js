import React, { useEffect, useState } from "react";
import { Linking, TouchableOpacity, View } from "react-native";
import { Text } from "../typography/text.component";
import {
  ProfessionalCard,
  ProfessionalCardCover,
  Info,
} from "./professional-card.styles";
// import { SvgXml } from "react-native-svg";
import { FontAwesome } from "@expo/vector-icons";
import { IconButton } from "react-native-paper";

export const ProfessionalInfo = ({ professional = {}, index = 1 }) => {
  const [instagramHandle, setInstagramHandle] = useState(null);

  useEffect(() => {
    let obj =
      professional.socialMedia &&
      professional.socialMedia.find((obj) => obj.id === "instagram");

    if (obj) setInstagramHandle(obj.username);
  }, []);

  const handleInstagramPress = () => {
    const instagramURL = `https://www.instagram.com/${instagramHandle}/`;

    // Open Instagram profile in the browser or Instagram app
    Linking.openURL(instagramURL).catch((err) =>
      console.error(`Failed to open Instagram: ${err}`)
    );
  };

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

        {instagramHandle && (
          <TouchableOpacity onPress={handleInstagramPress}>
            <IconButton
              icon={() => (
                <FontAwesome name="instagram" size={28} color="black" />
              )}
            />
          </TouchableOpacity>
        )}
      </Info>
    </ProfessionalCard>
  );
};
