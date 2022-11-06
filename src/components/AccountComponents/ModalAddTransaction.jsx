import React, { useState } from "react";
import { Modal, Input, Button, Text, Select } from "native-base";
import { TouchableWithoutFeedback } from "react-native";
import { Keyboard } from "react-native";
import {
  setDoc,
  doc,
  updateDoc,
  db,
  auth,
  getDoc,
} from "../../../config/firebase-key-config";
import { useGlobal } from "../../../state";
import uuid from "react-native-uuid";

export const ModalAddTransaction = ({ showModal, close = () => {} }) => {
  const [transactionType, setTransactionType] = useState("");
  const [sum, setSum] = useState("");
  const [isIncome, setIsIncome] = useState("");
  const [whatAcc, setWhatAcc] = useState("");
  const [id, setId] = useState(uuid.v4());
  const [{ accountsData }] = useGlobal();

  const Reset = () => {
    setTransactionType("");
    setSum("");
    setWhatAcc("");
    setIsIncome("");
    close();
    setId(uuid.v4());
  };

  async function handleOnAdd() {
    if (sum && whatAcc && isIncome) {
      if (isIncome == "Spent") {
        const unsubscribe = await setDoc(
          doc(db, "users", auth.currentUser.uid, "transactions", id),
          {
            type: transactionType,
            sum: sum,
            date: new Date(),
            isIncome: isIncome,
            id: id,
          }
        );

        const docRef = doc(
          db,
          "users",
          auth.currentUser.uid,
          "accounts",
          whatAcc
        );
        const docSnap = await getDoc(docRef);
        await updateDoc(docRef, {
          sum: parseInt(docSnap.data().sum, 10) - sum,
        });

        Reset();
        return unsubscribe;
      } else {
        const unsubscribe = await setDoc(
          doc(db, "users", auth.currentUser.uid, "transactions", id),
          {
            type: "Income",
            sum: sum,
            date: new Date(),
            isIncome: isIncome,
            id: id,
          }
        );

        const docRef = doc(
          db,
          "users",
          auth.currentUser.uid,
          "accounts",
          whatAcc
        );
        const docSnap = await getDoc(docRef);
        await updateDoc(docRef, {
          sum: parseInt(docSnap.data().sum, 10) + parseInt(sum, 10),
        });

        Reset();
        return unsubscribe;
      }
    } else {
      console.log("type is required");
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Modal isOpen={showModal}>
        <Modal.Content maxWidth="400px" backgroundColor="primary5.500">
          <Modal.CloseButton onPress={close} backgroundColor="white" />

          <Modal.Header backgroundColor="primary2.500">
            <Text fontSize="15" color="primary3.500">
              Add a transaction
            </Text>
          </Modal.Header>

          <Modal.Body justifyContent={"center"} alignItems="center">
            {/* Income OR SPENT ? */}
            <Select
              minWidth="210"
              accessibilityLabel="isIncome"
              placeholder="Income or Spent"
              placeholderTextColor="primary3.500"
              color="primary1.500"
              borderColor="primary2.500"
              borderWidth="2"
              onValueChange={(value) => setIsIncome(value)}
              fontSize="15"
            >
              <Select.Item label="Spent" value="Spent" />
              <Select.Item label="Income" value="Income" />
            </Select>

            {isIncome == "Spent" ? (
              <>
                {/* TYPE */}
                <Select
                  minWidth="210"
                  accessibilityLabel="Choose Service"
                  placeholder="Transaction Category"
                  placeholderTextColor="primary3.500"
                  color="primary1.500"
                  mt="4"
                  borderColor="primary2.500"
                  borderWidth="2"
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

                {/* SUM */}

                <Input
                  borderColor="white"
                  _focus={{ borderColor: "primary2.500" }}
                  borderWidth="2"
                  color="primary3.500"
                  width="210"
                  fontSize="15"
                  onChangeText={(sum) => setSum(sum)}
                  placeholder="Sum"
                  placeholderTextColor="primary3.500"
                  alignItems="center"
                  mt="4"
                />

                {/* Which Account? */}
                <Select
                  minWidth="210"
                  accessibilityLabel="Account"
                  placeholder="Account"
                  placeholderTextColor={"primary3.500"}
                  color="primary1.500"
                  mt="4"
                  borderColor="primary2.500"
                  borderWidth="2"
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
              </>
            ) : (
              <>
                {/* Which Account? */}
                <Select
                  minWidth="210"
                  accessibilityLabel="Account"
                  placeholder="Account"
                  placeholderTextColor={"primary3.500"}
                  color="primary1.500"
                  mt="4"
                  borderColor="primary2.500"
                  borderWidth="2"
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

                {/* SUM */}
                <Input
                  borderColor="white"
                  _focus={{ borderColor: "primary2.500" }}
                  borderWidth="2"
                  color="primary3.500"
                  width="210"
                  fontSize="15"
                  onChangeText={(sum) => setSum(sum)}
                  placeholder="Sum"
                  placeholderTextColor="primary3.500"
                  alignItems="center"
                  mt="4"
                />
              </>
            )}
          </Modal.Body>

          <Modal.Footer backgroundColor="primary2.500">
            <Button.Group justifyContent={"space-between"}>
              <Button
                backgroundColor="red.500"
                onPress={close}
                _pressed={{ backgroundColor: "grey" }}
              >
                <Text fontSize="15" color="primary3.500">
                  Cancel
                </Text>
              </Button>

              <Button
                backgroundColor="primary1.500"
                _pressed={{ backgroundColor: "grey" }}
                onPress={handleOnAdd}
              >
                <Text fontSize="15" color="primary3.500">
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
