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
              onChangeText={(value) => {
                setName(value);
              }}
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
              onChangeText={(value) => {
                setSum(value);
              }}
            />
          </Modal.Body>

          <Modal.Footer backgroundColor="primary1.500">
            <Button.Group justifyContent={"space-between"}>
              <Button backgroundColor="red.500" onPress={close}>
                <Text fontSize="15" color="black">
                  Cancel
                </Text>
              </Button>

              <Button backgroundColor="primary3.500" onPress={handleSaveAcc}>
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
