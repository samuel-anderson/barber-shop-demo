import React, { useRef, useEffect } from "react";
import { Animated } from "react-native"; //What is this for?

export const FadeInView = ({ duration = 1500, ...props }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: duration,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, duration]);

  useEffect(() => {
    const listener = fadeAnim.addListener(({ _ }) => {
      // Handle the value update here
    });

    // Make sure to remove the listener when the component unmounts
    return () => {
      fadeAnim.removeListener(listener);
    };
  }, [fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
};
