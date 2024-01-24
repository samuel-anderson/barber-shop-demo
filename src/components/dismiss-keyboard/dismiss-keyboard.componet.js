import { Keyboard, TouchableWithoutFeedback } from "react-native";

export const DismissKeyboardComponent = ({ children }) => {
  const dismiss = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback onPress={dismiss}>
      {children}
    </TouchableWithoutFeedback>
  );
};
