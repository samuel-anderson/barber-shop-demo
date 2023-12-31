import { Platform, View, StyleSheet, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import {
  Background,
  CompactImage,
  Container,
  Touchable,
  IconText,
  ErrorText,
  TextInputContainer,
  Pin,
} from "./main.styles";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

const {
  appFeatures: { dashboard },
} = Constants.expoConfig;

const isAndroid = Platform.OS === "android";

export const MainScreen = ({ navigation }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [error, setError] = useState(null);

  const Image = isAndroid ? CompactWebview : CompactImage;
  const shop = useSelector((state) => state.shop.info);
  const [pin, setPin] = useState("");

  useEffect(() => {
    const getPin = async () => {
      try {
        //await AsyncStorage.clear();
        const value = await AsyncStorage.getItem(`@shop-${shop.id}`);

        if (value !== null) {
          const { pin: pin } = JSON.parse(value);
          pin === shop.accessCode && setIsAuthenticated(true);
        } else setIsAuthenticated(false);
      } catch (e) {
        console.log("error storing", e);
      }
    };
    shop && getPin();
  }, [shop]);

  const handlePinChange = (text) => {
    // Limit input to 4 digits
    if (/^\d{0,4}$/.test(text)) {
      setPin(text);
      if (text.length === 4) handlePinSubmit(text);
    }
  };

  const handlePinSubmit = async (pin) => {
    if (pin === shop.accessCode) {
      setIsAuthenticated(true);
      savePin(pin);
    } else setError("PIN is incorrect");
  };

  const savePin = async (pin) => {
    try {
      const jsonValue = JSON.stringify({ pin: pin });
      await AsyncStorage.setItem(`@shop-${shop.id}`, jsonValue); //Async storage
    } catch (e) {
      console.log("error storing", e);
    }
  };

  return (
    <Background>
      <Container>
        <Image source={require("../../assets/legacy.png")} />

        {!isAuthenticated && (
          <TextInputContainer>
            {error && <ErrorText variant="error">{error}</ErrorText>}
            <Pin
              keyboardType="numeric"
              maxLength={4}
              secureTextEntry
              placeholder="Enter PIN"
              placeholderTextColor="rgba(255, 255, 255, 0.7)" // Set placeholder text color with transparency
              value={pin}
              error={!!error}
              onChangeText={handlePinChange}
            />
          </TextInputContainer>
        )}
        {isAuthenticated && (
          <>
            <Touchable onPress={() => navigation.navigate("Choose a Barber")}>
              <IconText>Book Appointment</IconText>
            </Touchable>

            {dashboard && (
              <Touchable onPress={() => navigation.navigate("Access")}>
                <IconText>Barber Access</IconText>
              </Touchable>
            )}
          </>
        )}
      </Container>
    </Background>
  );
};
