import React, { useState, useEffect } from "react";
import { Box, HStack, Icon, Text } from "native-base";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalAcc from "./modalAcc";
import {
  signOut,
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

      <Box
        width="100%"
        backgroundColor="primary1.500"
        padding="2"
        borderBottomColor="white"
        borderBottomWidth="1"
      >
        <Text fontSize="22" color="white" ml="1">
          Balance
        </Text>

        <HStack
          alignItems={"center"}
          justifyContent={"space-evenly"}
          flexWrap="wrap"
          my="3"
        >
          {accounts?.map((account, index) => {
            return (
              <AccountBox key={index} name={account.name} sum={account.sum} />
            );
          })}

          <TouchableOpacity onPress={() => setShowModal(true)}>
            <HStack
              borderColor="primary3.500"
              borderWidth="2"
              borderRadius="lg"
              paddingY="4"
              paddingX="2"
              alignItems="center"
              justifyContent="center"
            >
              <Text fontSize="15" color="white" ml="2">
                Add an account
              </Text>

              <Icon
                as={<Ionicons name="add-circle" />}
                size={6}
                mr="2"
                color="primary3.500"
                ml="2"
              />
            </HStack>
          </TouchableOpacity>
        </HStack>
      </Box>
    </>
  );
};

export default Balance;
