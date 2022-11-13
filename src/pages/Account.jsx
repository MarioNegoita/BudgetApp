import React, { useState } from "react";
import { Icon, ScrollView, Fab, Box } from "native-base";

import {
  Balance,
  AllTransactions,
} from "../components/AccountComponents/index";
import { Ionicons } from "@expo/vector-icons";
import ModalAddTransaction from "../components/AccountComponents/ModalAddTransaction";
import { useIsFocused } from "@react-navigation/native";

export const AccountPage = ({ navigation, route }) => {
  const [showModal, setShowModal] = useState(false);
  const [showFab, setShowFab] = useState(false);
  const isFocused = useIsFocused();

  const onCloseModal = () => {
    setShowModal(false);
  };

  return (
    <ScrollView flex={1} backgroundColor="#1d1d42">
      <ModalAddTransaction showModal={showModal} close={onCloseModal} />
      <Balance />
      <AllTransactions />

      {isFocused && (
        <Fab
          placement="bottom-right"
          backgroundColor="orange.400"
          onPress={() => {
            setShowModal(true);
          }}
          _pressed={{ backgroundColor: "orange.300" }}
          icon={
            <Icon
              size="lg"
              color="primary3.500"
              as={<Ionicons name="card" />}
            />
          }
        />
      )}
    </ScrollView>
  );
};

export default AccountPage;
