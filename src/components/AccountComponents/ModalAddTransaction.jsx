import React, { useState } from "react";
import {
  Modal,
  Input,
  Button,
  Text,
  Center,
  FormControl,
  Select,
  CheckIcon,
  WarningOutlineIcon,
  HStack,
  InputGroup,
  InputRightAddon,
} from "native-base";
import { TouchableWithoutFeedback } from "react-native";
import { Keyboard } from "react-native";
import {
  addDoc,
  doc,
  updateDoc,
  db,
  auth,
  collection,
  increment,
} from "../../../config/firebase-key-config";
import { useGlobal } from "../../../state";

export const ModalAddTransaction = ({ showModal, close = () => {} }) => {
  const [transactionType, setTransactionType] = useState("");
  const [sum, setSum] = useState("");
  const [isRecieved, setIsRecieved] = useState("");
  const [whatAcc, setWhatAcc] = useState("");
  const [{ accountsData }] = useGlobal();

  const Reset = () => {
    setTransactionType("");
    setSum("");
    setWhatAcc("");
    setIsRecieved("");
    close();
  };

  async function handleOnAdd() {
    if (transactionType && sum && whatAcc && isRecieved) {
      const unsubscribe = await addDoc(
        collection(db, "users", auth.currentUser.uid, "transactions"),
        {
          type: transactionType,
          sum: sum,
          date: new Date(),
          isRecieved: isRecieved,
        }
      );

      if (isRecieved == "Spent") {
        const docRef = doc(
          db,
          "users",
          auth.currentUser.uid,
          "accounts",
          whatAcc
        );
        await updateDoc(docRef, {
          sum: increment(-sum),
        });
      }

      if (isRecieved == "Recieved") {
        const docRef = doc(
          db,
          "users",
          auth.currentUser.uid,
          "accounts",
          whatAcc
        );
        await updateDoc(docRef, {
          sum: increment(sum),
        });
      }
      Reset();
      return unsubscribe;
    } else {
      console.log("type is required");
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Modal isOpen={showModal}>
        <Modal.Content maxWidth="400px" backgroundColor="primary2.500">
          <Modal.CloseButton onPress={close} backgroundColor="white" />

          <Modal.Header backgroundColor="primary1.500">
            <Text fontSize="15" color="white">
              Add a transaction
            </Text>
          </Modal.Header>

          <Modal.Body justifyContent={"center"} alignItems="center">
            <Select
              minWidth="210"
              accessibilityLabel="Choose Service"
              placeholder="Transaction Category"
              placeholderTextColor={"lightgrey"}
              color="white"
              mt="1"
              borderColor="white"
              onValueChange={(value) => setTransactionType(value)}
              fontSize="15"
            >
              <Select.Item label="Hobbies" value="Hobbies" />
              <Select.Item label="Car" value="Car" />
              <Select.Item label="Cigarettes" value="Cigarettes" />
              <Select.Item label="Parking" value="Parking" />
              <Select.Item label="Taxes" value="Taxes" />
              <Select.Item label="Food" value="Food" />
              <Select.Item label="Drinks" value="Drinks" />
            </Select>

            <HStack mt={4} alignItems="center">
              <Input
                borderColor="white"
                _focus={{ borderColor: "white" }}
                color="white"
                width="110"
                ml="2"
                fontSize="15"
                onChangeText={(sum) => setSum(sum)}
                placeholder="Sum"
                placeholderTextColor="lightgrey"
              />
              <Text color="white" ml="-9">
                RON
              </Text>
            </HStack>

            <Select
              minWidth="200"
              accessibilityLabel="isRecieved"
              placeholder="Spent or Recieved?"
              placeholderTextColor={"lightgrey"}
              color="white"
              mt="4"
              borderColor="white"
              onValueChange={(value) => setIsRecieved(value)}
              fontSize="15"
            >
              <Select.Item label="Spent" value="Spent" />
              <Select.Item label="Recieved" value="Recieved" />
            </Select>

            <Select
              minWidth="200"
              accessibilityLabel="Account"
              placeholder="Account"
              placeholderTextColor={"lightgrey"}
              color="white"
              mt="4"
              borderColor="white"
              onValueChange={(value) => setWhatAcc(value)}
              fontSize="15"
            >
              {accountsData?.accountsList?.map((account, index) => {
                return (
                  <Select.Item
                    label={account.name}
                    value={account.name}
                    key={index}
                  />
                );
              })}
            </Select>
          </Modal.Body>

          <Modal.Footer backgroundColor="primary1.500">
            <Button.Group justifyContent={"space-between"}>
              <Button
                backgroundColor="red.500"
                onPress={close}
                _pressed={{ backgroundColor: "grey" }}
              >
                <Text fontSize="15" color="black">
                  Cancel
                </Text>
              </Button>

              <Button
                backgroundColor="primary3.500"
                _pressed={{ backgroundColor: "grey" }}
                onPress={handleOnAdd}
              >
                <Text fontSize="15" color="black">
                  Add
                </Text>
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </TouchableWithoutFeedback>
  );
};

export default ModalAddTransaction;
