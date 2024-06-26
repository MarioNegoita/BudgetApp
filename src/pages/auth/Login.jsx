import React, { useState } from "react";

import * as yup from "yup";

import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  Link,
  Text,
  useToast,
  VStack,
} from "native-base";
import { TouchableWithoutFeedback, Keyboard } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { signIn } from "../../../config/firebase-functions";

const loginSchema = yup.object({
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 charachters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Must be a valid email"),
});

export const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);
  const [passWordHidden, setPasswordHidden] = useState(true);

  const toast = useToast();
  const id = "error-toasts";

  const [isLoading, setIsLoading] = useState(false);

  const resetFieldsErrors = () => {
    setIsInvalidEmail(true);
    setIsInvalidPassword(true);

    setTimeout(() => {
      setIsInvalidEmail(false);
      setIsInvalidPassword(false);
    }, 2500);
  };

  const onSubmit = () => {
    loginSchema
      .isValid({
        email: email,
        password: password,
      })
      .then(async (isValid) => {
        if (isValid) {
          setIsLoading(true);

          await signIn(email, password).then((value) => {
            if (value === 200) {
              return;
            } else if (value === 500) {
              if (!toast.isActive(id)) {
                toast.show({
                  id,
                  duration: 2500,
                  placement: "top",
                  render: () => {
                    return (
                      <Box bg="red.500" px="2" py="1" rounded="sm" mb={5}>
                        Your email or password is incorect
                      </Box>
                    );
                  },
                });
              }

              resetFieldsErrors();
              setIsLoading(false);
            }
          });
        }
      });

    loginSchema.validate({ email: email, password: password }).catch((err) => {
      if (!toast.isActive(id)) {
        toast.show({
          id,
          duration: 2500,
          placement: "top",
          render: () => {
            return (
              <Box bg="red.500" px="2" py="1" rounded="sm" mb={5}>
                {err.message}
              </Box>
            );
          },
        });
      }

      if (err.path === "email") {
        setIsInvalidEmail(true);
      } else {
        setIsInvalidPassword(true);
      }
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Center bg="primary5.500" h="100%" w="100%">
        <Box safeArea w="full" px="16">
          <Heading size="xl" fontWeight="600" color="primary3.500">
            Welcome,
          </Heading>

          <Heading mt="1" size="md" fontWeight="semibold" color="primary4.500">
            Sign in to continue!
          </Heading>

          <VStack space={4} mt="4">
            <Input
              padding={2}
              borderBottomWidth="2"
              borderColor={`${isInvalidEmail ? "red.500" : "black"}`}
              style={{ color: "black", fontSize: 15 }}
              _focus={
                isInvalidEmail
                  ? {
                      borderColor: "red.500",
                      placeholderTextColor: "red.500",
                    }
                  : {
                      borderColor: "primary4.500",
                      placeholderTextColor: "primary4.500",
                    }
              }
              InputRightElement={
                <Icon
                  as={<Ionicons name="mail" />}
                  size={6}
                  mr="2"
                  color={isInvalidEmail ? `red.500` : "primary4.500"}
                />
              }
              variant="underlined"
              placeholder="Email"
              placeholderTextColor={isInvalidEmail ? `red.500` : "black"}
              color={isInvalidEmail ? "red.500" : "white"}
              value={email}
              onChangeText={(value) => {
                setIsInvalidEmail(false);
                setEmail(value);
              }}
            />

            <Input
              padding={2}
              borderBottomWidth="2"
              borderColor={`${isInvalidEmail ? "red.500" : "black"}`}
              style={{ color: "black", fontSize: 15 }}
              _focus={
                isInvalidEmail
                  ? {
                      borderColor: "red.500",
                      placeholderTextColor: "red.500",
                    }
                  : {
                      borderColor: "primary4.500",
                      placeholderTextColor: "primary4.500",
                    }
              }
              type={passWordHidden ? "password" : "text"}
              InputRightElement={
                <Icon
                  as={<Ionicons name={passWordHidden ? "eye-off" : "eye"} />}
                  size={6}
                  mr="2"
                  color={isInvalidEmail ? `red.500` : "primary4.500"}
                  onPress={() => setPasswordHidden(!passWordHidden)}
                />
              }
              variant="underlined"
              placeholder="Password"
              placeholderTextColor={isInvalidPassword ? `red.500` : "black"}
              color={isInvalidPassword ? "red.500" : "white"}
              value={password}
              onChangeText={(value) => {
                setIsInvalidPassword(false);
                setPassword(value);
              }}
            />

            <Link
              _text={{
                fontSize: "xs",
                fontWeight: "500",
                color: "primary2.500",
              }}
              onPress={() => {
                navigation.navigate("ForgotPassword");
              }}
              alignSelf="flex-end"
              mt="1"
            >
              Forgot Password?
            </Link>

            <Button
              title="Sign in"
              rounded="lg"
              medium
              bg="primary1.500"
              _pressed={{ bg: "primary2.500" }}
              onPress={onSubmit}
              disabled={isLoading}
              isLoading={isLoading}
              //the size didnt match so i had to do this..
              _spinner={{ paddingY: "0.45" }}
            >
              <Text fontWeight="semibold" color="primary3.500" fontSize="15">
                Sign in
              </Text>
            </Button>

            <HStack mt="1" justifyContent="center">
              <Text fontSize="sm" color="black">
                Don't have an account ? &nbsp;
              </Text>

              <Link
                _text={{
                  color: "primary2.500",
                  fontWeight: "medium",
                  fontSize: "sm",
                }}
                onPress={() => {
                  navigation.navigate("Register");
                }}
              >
                Sign Up
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Center>
    </TouchableWithoutFeedback>
  );
};

export default LoginPage;
