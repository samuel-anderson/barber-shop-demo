import { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { SafeArea } from "../../components/utility/safe-area.component";
import { Text } from "../../components/typography/text.component";
import { CustomButton } from "../../components/custom-button/custom-button.component";
import {
  SelectList,
  MultipleSelectList,
} from "react-native-dropdown-select-list";

export const Reports = () => {
  const [selectedStatuses, setSelectedStatuses] = useState([]);

  const statuses = [
    { key: "1", value: "Pending" },
    { key: "2", value: "Cancelled" },
    { key: "3", value: "Paid" },
  ];

  return (
    <SafeArea>
      <View
        style={{
          padding: 20,
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <ScrollView>
          <Text>Start Date - End Date</Text>

          <Text>Status</Text>

          <MultipleSelectList
            setSelected={(val) => setSelectedStatuses(val)}
            onSelect={() => console.log(selectedStatuses)}
            data={statuses}
            save="value"
            label="Statuses"
            placeholder="Select Status"
          />
        </ScrollView>

        <TouchableOpacity onPress={() => {}} style={{ zIndex: -100 }}>
          <CustomButton variant="dark" text="Generate Report" />
        </TouchableOpacity>
      </View>
    </SafeArea>
  );
};
