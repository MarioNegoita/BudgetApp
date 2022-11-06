import React, { useState, useEffect } from "react";
import { Box, HStack, Icon, Text } from "native-base";
import { TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalAcc from "./modalAcc";
import {
  auth,
  onSnapshot,
  query,
  db,
  collection,
  orderBy,
} from "../../../config/firebase-key-config";
import AccountBox from "./accountBox";
import { useGlobal } from "../../../state";

export const Balance = () => {
  const [showModal, setShowModal] = useState(false);
  const [{ accountsData }, dispatch] = useGlobal();
  const [accounts, setAccounts] = useState();

  useEffect(() => {
    if (accounts) {
      dispatch({
        type: "ACCOUNTS_INFO",
        accountsList: accounts,
      });
    }
  }, [accounts]);

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const q = query(
      collection(db, `users/${auth.currentUser.uid}/accounts`),
      orderBy("sum", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setAccounts(
        querySnapshot.docs.map((doc) => ({
          sum: doc.data().sum,
          name: doc.data().name,
        }))
      );
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <ModalAcc showModal={showModal} close={closeModal} />

      <Box width="100%" backgroundColor="primary5.500" padding="2" my="5">
        <HStack alignItems="center" justifyContent="space-between">
          <HStack>
            <Text fontSize="24" color="primary3.500" ml="1">
              Balance
            </Text>
            <Icon
              as={<FontAwesome5 name="piggy-bank" />}
              size="8"
              mr="2"
              color="pink.300"
              ml="2"
            />
          </HStack>

          <TouchableOpacity onPress={() => setShowModal(true)}>
            <Icon
              as={<Ionicons name="add-circle" />}
              size="8"
              mr="2"
              color="orange.400"
              ml="2"
            />
          </TouchableOpacity>
        </HStack>

        <Box alignItems={"center"}>
          {accounts?.map((account, index) => {
            return (
              <AccountBox key={index} name={account.name} sum={account.sum} />
            );
          })}
        </Box>
      </Box>
    </>
  );
};

export default Balance;
