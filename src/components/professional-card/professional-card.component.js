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
import { usePhotoBottomSheet } from "../../contexts/PhotoBottomSheet.context";
import { useSelector } from "react-redux";

export const ProfessionalInfo = ({ professional = {}, index = 1 }) => {
  const { profileImages } = useSelector((state) => state.profileImages);

  const [instagramHandle, setInstagramHandle] = useState(null);
  const [images, setImages] = useState(null);

  const { openBottomSheet, setHandle, setProfileImages } =
    usePhotoBottomSheet();

  useEffect(() => {
    if (
      profileImages[professional.id] &&
      profileImages[professional.id].length > 0
    ) {
      setImages(profileImages[professional.id]);
    }
  }, [profileImages, professional]);

  useEffect(() => {
    let obj = professional.socialMedia && professional.socialMedia.instagram;

    if (obj) setInstagramHandle(obj.handle);
  }, []);

  const handleInstagramPress = () => {
    const instagramURL = `https://www.instagram.com/${instagramHandle}/`;

    // Open Instagram profile in the browser or Instagram app
    Linking.openURL(instagramURL).catch((err) =>
      console.error(`Failed to open Instagram: ${err}`)
    );
  };

  const getImageUrl = () => {
    let profile =
      images &&
      profileImages[professional.id].find((url) => url.includes("profile.jpg"));

    if (profile) return { uri: profile };
    else return require(`../../../assets/profile-image-1.jpg`);
  };

  const handleCameraPress = () => {
    setHandle(instagramHandle);
    setProfileImages(images);
    openBottomSheet();
  };
  return (
    <ProfessionalCard elevation={2}>
      <View>
        <ProfessionalCardCover
          key={professional.lastName}
          source={getImageUrl()}
        />
      </View>
      <Info>
        <Text variant="label">{professional.displayName?.toUpperCase()}</Text>

        <View style={{ flexDirection: "row" }}>
          {images && (
            <TouchableOpacity onPress={handleCameraPress}>
              <IconButton
                icon={() => (
                  <FontAwesome name="camera-retro" size={25} color="black" />
                )}
              />
            </TouchableOpacity>
          )}
          {instagramHandle && (
            <TouchableOpacity onPress={handleInstagramPress}>
              <IconButton
                icon={() => (
                  <FontAwesome name="instagram" size={25} color="black" />
                )}
              />
            </TouchableOpacity>
          )}
        </View>
      </Info>
    </ProfessionalCard>
  );
};
