import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
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
    <ScrollView flex={1} backgroundColor="primary1.500">
      <ModalAddTransaction showModal={showModal} close={onCloseModal} />
      <Balance />
      <AllTransactions />
      <Fab
        backgroundColor="primary4.500"
        onPress={() => {
          setShowModal(true);
        }}
        _pressed={{ backgroundColor: "primary3.500" }}
        icon={<Icon size="lg" color="black" as={<Ionicons name="card" />} />}
      />
    </ScrollView>
  );
};

export default AccountPage;
