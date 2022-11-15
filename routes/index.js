import "react-native-gesture-handler";

import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";

import {
  LoginPage,
  ForgotPasswordPage,
  RegisterPage,
} from "../src/pages/auth/index";
import IndexTabs from "./indexTabs";
import TransactionsPage from "../src/pages/TransactionsPage";
import ManageAccounts from "../src/pages/ManageAccounts";

const Stack = createStackNavigator();

const AppRouter = ({ page }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        {page === "Login" ? (
          <Stack.Screen name="Login" component={LoginPage} />
        ) : (
          <Stack.Screen name="HomeTabs" component={IndexTabs} />
        )}
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordPage} />
        <Stack.Screen name="TransactionsPage" component={TransactionsPage} />
        <Stack.Screen name="ManageAccounts" component={ManageAccounts} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRouter;
