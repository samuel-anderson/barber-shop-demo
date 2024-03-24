import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";

export const ProfileImages = () => {
  const [images, setImages] = useState({});

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        // If the permission is not granted, prompt the user to grant it.
        Alert.alert("Please grant access to camera roll!");
        return;
      }
    })();
  }, []);

  const handleImagePick = async (id) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result) {
        return;
      }

      const { uri } = result.assets[0];
      setImages((prev) => ({ ...prev, [id]: uri }));
    } catch (error) {
      console.log("Error occurred:", error);
    }
  };

  const handleViewClick = (id) => {
    handleImagePick(id);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.view} onPress={() => handleViewClick(1)}>
        {images[1] ? (
          <Image
            source={{ uri: images[1] }}
            style={{ width: "100%", height: 150 }}
          />
        ) : null}
      </TouchableOpacity>
      <TouchableOpacity style={styles.view} onPress={() => handleViewClick(2)}>
        {images[2] ? (
          <Image
            source={{ uri: images[2] }}
            style={{ width: "100%", height: 150 }}
          />
        ) : null}
      </TouchableOpacity>
      <TouchableOpacity style={styles.view} onPress={() => handleViewClick(3)}>
        {images[3] ? (
          <Image
            source={{ uri: images[3] }}
            style={{ width: "100%", height: 150 }}
          />
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ecf0f1",
  },
  view: {
    width: "30%",
    height: 150,
    marginHorizontal: 5,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
});
