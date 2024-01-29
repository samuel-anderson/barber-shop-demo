import DateTimePickerModal from "react-native-modal-datetime-picker";

export const TimePickerComponent = ({
  isDatePickerVisible,
  handleConfirm,
  hideDatePicker,
  minInterval,
}) => {
  return (
    <DateTimePickerModal
      isVisible={isDatePickerVisible}
      mode="time"
      onConfirm={handleConfirm}
      onCancel={hideDatePicker}
      minuteInterval={minInterval}
    />
  );
};
