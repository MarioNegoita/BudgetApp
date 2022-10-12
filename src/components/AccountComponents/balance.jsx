import React, { useState } from "react";
import { Box, HStack, Icon, Text } from "native-base";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalAcc from "./modalAcc";

export const Balance = () => {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <ModalAcc showModal={showModal} close={closeModal} />

      <Box
        width="100%"
        backgroundColor="primary1.500"
        marginY={3}
        padding="2"
        borderBottomColor="white"
        borderBottomWidth="1"
      >
        <Text fontSize="22" color="white">
          Balance
        </Text>

        <HStack alignItems={"center"} justifyContent="space-between" my="3">
          <Box
            backgroundColor="orange.600"
            borderRadius="lg"
            padding={2}
            paddingRight="10"
            minWidth={"45%"}
          >
            <Text fontSize="15" color="white">
              Cash
            </Text>

            <Text fontSize="15" color="white">
              5000 ron
            </Text>
          </Box>

          <TouchableOpacity onPress={() => setShowModal(true)}>
            <HStack
              borderColor="primary3.500"
              borderWidth="2"
              borderRadius="lg"
              padding="4"
              alignItems="center"
            >
              <Text fontSize="15" color="white">
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
