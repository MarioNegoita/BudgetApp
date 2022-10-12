import React, { useState } from "react";
import { Center, Button, Box } from "native-base";
import { signOut, auth } from "../../config/firebase-key-config";

import { Balance } from "../components/AccountComponents/index";

export const AccountPage = ({ navigation }) => {
  const logOut = () => {
    signOut(auth).then(() => {
      navigation.reset({
        routes: [{ name: "Login" }],
      });
    });
  };

  return (
    <Box flex={1} backgroundColor="primary1.500">
      <Balance />
    </Box>
  );
};

export default AccountPage;
