import { createContext, useRef, useContext, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import styled, { useTheme } from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";
import {
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Linking,
} from "react-native";

const IconButton = styled(TouchableOpacity)`
  position: absolute;
  right: 10px;
  top: 0;
  padding: 15px;
`;

const PhotoBottomSheetContext = createContext();

export const PhotoBottomSheetProvider = ({ children }) => {
  const bottomSheetRef = useRef();
  const theme = useTheme();
  const [handle, setHandle] = useState(null);
  const [profileImages, setProfileImages] = useState(null);

  const handleInstagramPress = () => {
    const instagramURL = `https://www.instagram.com/${handle}/`;

    // Open Instagram profile in the browser or Instagram app
    Linking.openURL(instagramURL).catch((err) =>
      console.error(`Failed to open Instagram: ${err}`)
    );
  };

  const openBottomSheet = () => {
    bottomSheetRef.current.expand();
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current.close();
  };

  return (
    <PhotoBottomSheetContext.Provider
      value={{ openBottomSheet, setHandle, setProfileImages }}
    >
      {children}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={["50%"]}
        backgroundStyle={{ backgroundColor: theme.colors.bg.primary }}
      >
        {/* Content of your bottom sheet */}
        <IconButton onPress={closeBottomSheet}>
          <FontAwesome name="close" size={24} color="gray" />
        </IconButton>
        <View style={styles.container}>
          {profileImages &&
            profileImages.map((url, idx) => {
              if (url.includes("display")) {
                return (
                  <Image
                    key={idx}
                    style={styles.thumbnail}
                    source={{ uri: url }}
                  />
                );
              }
            })}
        </View>
        {handle && (
          <TouchableOpacity onPress={handleInstagramPress}>
            <View style={styles.instagramContainer}>
              <FontAwesome name="instagram" size={28} color="black" />

              <Text style={styles.instagramText}>
                See more pictures on Instagram
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </BottomSheet>
    </PhotoBottomSheetContext.Provider>
  );
};

export const usePhotoBottomSheet = () => {
  const context = useContext(PhotoBottomSheetContext);
  if (!context) {
    throw new Error(
      "usePhotoBottomSheet must be used within a PhotoBottomSheetProvider"
    );
  }
  return context;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "start",
    padding: 16,
    flexWrap: "wrap",
    marginTop: 40,
  },
  thumbnail: {
    width: 120,
    height: 120,
    borderRadius: 8,
    margin: 3,
  },
  instagramContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  instagramText: {
    fontSize: 20,
    marginLeft: 10,
  },
});
