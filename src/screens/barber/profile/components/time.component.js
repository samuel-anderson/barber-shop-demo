import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "../../../../components/typography/text.component";

export const TimeComponent = ({
  onPressHandler,
  updatedSchedule,
  day,
  selection,
}) => {
  const time = updatedSchedule[day.toLowerCase()][selection];
  return (
    <View style={styles.container}>
      <Text>{selection.toUpperCase()}</Text>
      <TouchableOpacity onPress={onPressHandler}>
        <View style={styles.text_container}>
          <Text style={styles.text}>{time}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  text_container: {
    backgroundColor: "black",
    padding: 5,
    borderRadius: 5,
    width: 90,
  },
  text: {
    color: "white",
    textAlign: "center",
  },
});
