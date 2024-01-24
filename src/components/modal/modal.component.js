import { Modal } from "react-native";
import styled from "styled-components/native";

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  backgroundcolor: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.View`
  background-color: black;
  padding: 50px;
  border-radius: 10px;
  elevation: 5;
  width: 97%;
  justify-content: center;
`;
export const ModalComponent = ({ children, isModalVisible = false }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => {}}
    >
      <ModalContainer>
        <ModalContent>{children}</ModalContent>
      </ModalContainer>
    </Modal>
  );
};
