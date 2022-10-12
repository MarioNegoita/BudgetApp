import React from "react";
import { Modal, Input, Button, Text } from "native-base";
import { TouchableWithoutFeedback } from "react-native";
import { Keyboard } from "react-native";

const ModalAcc = ({ showModal, close = () => {} }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Modal isOpen={showModal}>
        <Modal.Content maxWidth="400px" backgroundColor="primary2.500">
          <Modal.CloseButton onPress={close} />

          <Modal.Header backgroundColor="primary1.500">
            <Text fontSize="15" color="white">
              Create a new account
            </Text>
          </Modal.Header>

          <Modal.Body>
            <Text fontSize="15" color="white">
              Account Name
            </Text>

            <Input
              padding={2}
              borderWidth={2}
              borderRadius={10}
              borderColor="black"
              _focus={{ borderColor: "white" }}
              color="white"
              fontSize="15"
            />

            <Text fontSize="15" color="white">
              Initial Sum
            </Text>

            <Input
              padding={2}
              borderWidth={2}
              borderRadius={10}
              borderColor="black"
              _focus={{ borderColor: "white" }}
              fontSize="15"
              color="white"
            />
          </Modal.Body>

          <Modal.Footer backgroundColor="primary1.500">
            <Button.Group justifyContent={"space-between"}>
              <Button backgroundColor="red.500" onPress={close}>
                <Text fontSize="15" color="black">
                  Cancel
                </Text>
              </Button>

              <Button backgroundColor="primary3.500" onPress={close}>
                <Text fontSize="15" color="black">
                  Save
                </Text>
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </TouchableWithoutFeedback>
  );
};

export default ModalAcc;
