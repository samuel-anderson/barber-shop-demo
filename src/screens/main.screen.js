import { Platform } from "react-native";
import Constants from "expo-constants";
import {
  CompactImage,
  ErrorText,
  TextInputContainer,
  Pin,
} from "./main.styles";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { WithBackground } from "../components/with-background/with-background.component.component";
import { CustomButton } from "../components/custom-button/custom-button.component";
import { APP_FEATURE_DASHBOARD, APP_FEATURE_REGISTRATION } from "@env";

const isAndroid = Platform.OS === "android";

export const MainScreen = ({ navigation }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [error, setError] = useState(null);

  const Image = isAndroid ? CompactWebview : CompactImage;
  const shop = useSelector((state) => state.shop.info);
  const professionals = useSelector((state) => state.professionals.barbers);
  const services = useSelector((state) => state.services.services);

  const hasServices = Object.entries(services).length > 0;
  const hasProfessionals = professionals.length !== 0;

  const [pin, setPin] = useState("");

  useEffect(() => {
    const getPin = async () => {
      try {
        //await AsyncStorage.clear();
        const value = await AsyncStorage.getItem(`@shop-${shop.id}`);

        if (value !== null) {
          const { pin: pin } = JSON.parse(value);

          pin === shop.accessCode && setIsAuthenticated(true);
          pin !== shop.accessCode && setIsAuthenticated(false);
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
    <WithBackground>
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
          <CustomButton
            variant="transparent"
            text={
              hasProfessionals && hasServices
                ? "Book Appointment"
                : "Coming Soon"
            }
            buttonOptions={{
              disabled: !hasProfessionals || !hasServices,
              onPress: () => navigation.navigate("Choose a Barber"),
            }}
          />
          {APP_FEATURE_DASHBOARD && (
            <CustomButton
              variant="transparent"
              text={hasProfessionals ? "Barber Access" : "Coming Soon"}
              buttonOptions={{
                disabled: !hasProfessionals,
                onPress: () =>
                  APP_FEATURE_REGISTRATION
                    ? navigation.navigate("Access")
                    : navigation.navigate("Login"),
              }}
            />
          )}
        </>
      )}
    </WithBackground>
  );
};
