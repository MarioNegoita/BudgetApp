import React, { useState } from "react";
import { Modal, Input, Button, Text } from "native-base";
import { TouchableWithoutFeedback } from "react-native";
import { Keyboard } from "react-native";
import { setDoc, doc, db, auth } from "../../../config/firebase-key-config";

const ModalAcc = ({ showModal, close = () => {} }) => {
  const [name, setName] = useState();
  const [sum, setSum] = useState();

  async function handleSaveAcc() {
    const unsubscribe = await setDoc(
      doc(db, "users", auth.currentUser.uid, "accounts", name),
      {
        sum: sum,
        name: name,
      }
    ).then(close);
    return unsubscribe;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Modal isOpen={showModal}>
        <Modal.Content maxWidth="400px" backgroundColor="primary5.500">
          <Modal.CloseButton onPress={close} />

          <Modal.Header backgroundColor="primary5.600">
            <Text fontSize="15" color="primary3.500">
              Create a new account
            </Text>
          </Modal.Header>

          <Modal.Body>
            <Text fontSize="15" color="primary3.500">
              Account Name
            </Text>

            <Input
              padding="2"
              borderWidth="3"
              borderRadius="10"
              borderColor="black"
              _focus={{ borderColor: "white" }}
              color="primary3.500"
              fontSize="15"
              onChangeText={(value) => {
                setName(value);
              }}
            />

            <Text fontSize="15" color="primary3.500">
              Initial Sum
            </Text>

            <Input
              padding="2"
              keyboardType="decimal-pad"
              borderWidth="3"
              borderRadius="10"
              borderColor="black"
              _focus={{ borderColor: "white" }}
              fontSize="15"
              color="primary3.500"
              onChangeText={(value) => {
                setSum(value);
              }}
            />
          </Modal.Body>

          <Modal.Footer backgroundColor="primary5.600">
            <Button.Group justifyContent={"space-between"}>
              <Button
                backgroundColor="red.400"
                onPress={close}
                _pressed={{ backgroundColor: "grey" }}
              >
                <Text fontSize="15" color="black">
                  Cancel
                </Text>
              </Button>

              <Button
                backgroundColor="orange.300"
                onPress={handleSaveAcc}
                _pressed={{ backgroundColor: "grey" }}
              >
                <Text fontSize="15" color="primary3.500">
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
