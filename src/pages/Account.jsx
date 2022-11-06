import React, { useState, useEffect } from "react";
import { TouchableOpacity, ImageBackground } from "react-native";
import { Icon, Center, Button, Box, ScrollView, Fab } from "native-base";

import {
  Balance,
  AllTransactions,
} from "../components/AccountComponents/index";
import { Ionicons } from "@expo/vector-icons";
import ModalAddTransaction from "../components/AccountComponents/ModalAddTransaction";

export const AccountPage = ({ navigation }) => {
  const [showModal, setShowModal] = useState(false);

  const onCloseModal = () => {
    setShowModal(false);
  };

  return (
    <ScrollView flex={1} backgroundColor="white">
      <ModalAddTransaction showModal={showModal} close={onCloseModal} />
      <Balance />
      <AllTransactions />
      <Fab
        backgroundColor="white"
        onPress={() => {
          setShowModal(true);
        }}
        _pressed={{ backgroundColor: "primary2.500" }}
        icon={
          <Icon size="lg" color="primary1.500" as={<Ionicons name="card" />} />
        }
      />
    </ScrollView>
  );
};

export default AccountPage;
