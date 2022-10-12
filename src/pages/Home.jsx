import { View, Text } from "react-native";
import React from "react";
import { Center, Button } from "native-base";
import { signOut, auth } from "../../config/firebase-key-config";

export const HomePage = ({ navigation }) => {
  const logOut = () => {
    signOut(auth).then(() => {
      navigation.reset({
        routes: [{ name: "Login" }],
      });
    });
  };

  return (
    <Center flex={1}>
      <Button onPress={logOut}>sign out</Button>
    </Center>
  );
};

export default HomePage;
