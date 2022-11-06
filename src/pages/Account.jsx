import React, { useState } from "react";
import { Icon, ScrollView, Fab } from "native-base";

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
        backgroundColor="orange.400"
        onPress={() => {
          setShowModal(true);
        }}
        _pressed={{ backgroundColor: "orange.300" }}
        icon={
          <Icon size="lg" color="primary3.500" as={<Ionicons name="card" />} />
        }
      />
    </ScrollView>
  );
};

export default AccountPage;
