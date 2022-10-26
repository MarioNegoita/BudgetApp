import React, { useState, useEffect } from "react";
import Navigator from "./routes/index";
import theme from "./config/theme";
import { NativeBaseProvider, StatusBar, Text } from "native-base";
import { LogBox } from "react-native";
import { auth, onAuthStateChanged } from "./config/firebase-key-config";
import { StateProvider } from "./state";
import AppReducer from "./reducer/app.reducer";

LogBox.ignoreLogs([
  "Warning: Async Storage has been extracted from react-native core",
]);

export const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn("HomeTabs");
      } else {
        setIsLoggedIn("Login");
      }
    });
  }, []);

  const initialState = {
    accountsData: {
      name: null,
      sum: null,
    },
  };

  return (
    <NativeBaseProvider theme={theme}>
      <StateProvider initialState={initialState} reducer={AppReducer}>
        <StatusBar backgroundColor="#425F57" />
        {isLoggedIn ? <Navigator page={isLoggedIn} /> : <Text>Loading...</Text>}
      </StateProvider>
    </NativeBaseProvider>
  );
};

export default App;
