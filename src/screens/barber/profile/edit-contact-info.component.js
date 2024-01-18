import { Text } from "../../../components/typography/text.component";

export const EditContactInfo = ({ route }) => {
  const { name, email, phoneNumber } = route.params.user;
  return (
    <Text>
      {name}, {email}, {phoneNumber}
    </Text>
  );
};
