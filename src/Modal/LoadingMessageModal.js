import { StyleSheet, Text, ActivityIndicator } from "react-native";
import React from "react";
import { Center, Modal, Button } from "native-base";
import ButtonDark from "../AtomComponents/Buttons/ButtonDark";
const LoadingMessageModal = ({
  showModal,
  setShowModal,
  title,
  message,
  setMessage,
}) => {
  return (
    <Center>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setMessage("");
        }}
        size="lg"
      >
        <Modal.Content maxWidth="350">
          <Modal.CloseButton />
          <Modal.Header style={styles.header}>{title}</Modal.Header>
          <Modal.Body style={styles.body}>
            {message ? (
              <Text>{message}</Text>
            ) : (
              <ActivityIndicator size="small" color="#0000ff" />
            )}
          </Modal.Body>
          <Modal.Footer>
            <ButtonDark
              onPress={() => {
                setShowModal(false);
                setMessage("");
              }}
            >
              <Text>Ok</Text>
            </ButtonDark>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
};

export default LoadingMessageModal;

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
  },
  body: {
    justifyContent: "center",
    alignItems: "center",
  },
});
