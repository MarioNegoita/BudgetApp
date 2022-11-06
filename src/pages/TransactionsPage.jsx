import React from "react";
import { Box, HStack, Icon, ScrollView, Select, Text } from "native-base";
import { FontAwesome } from "@expo/vector-icons";

const TransactionsPage = ({ route, navigation }) => {
  const transactions = route.params;

  return (
    <ScrollView flex="1" backgroundColor="white">
      <Box justifyContent="center" alignItems="center" mt="5">
        <Text fontSize="25" fontWeight="extrabold" color="primary3.500">
          All Transactions
        </Text>
      </Box>
      <Box
        mt="5"
        borderWidth="2"
        mx="2"
        borderColor="primary5.600"
        backgroundColor="primary5.500"
      >
        <HStack justifyContent="center" alignItems="center" mt="3">
          <Icon size="5" as={<FontAwesome name="bank" />} />
          <Text fontSize="18" fontWeight="bold">
            Current Account
          </Text>
        </HStack>
        <HStack my="3" alignItems="center" justifyContent="space-around">
          <Select
            textAlign="center"
            borderWidth="2"
            borderColor="black"
            width="200"
            fontSize="16"
            placeholder="choose an account "
          >
            <Select.Item label="Cash" value="Cash" />
            <Select.Item label="Testdadadadadadadada" value="Test" />
          </Select>
          <Box mr="2" borderBottomWidth="3" borderBottomColor="green.400">
            <Text fontSize="18">1500</Text>
          </Box>
        </HStack>
      </Box>

      {/* SKELET SKELET SKELET SKELET */}
      <Box
        height="60"
        marginX="2"
        marginY="3"
        backgroundColor="primary5.500"
        borderWidth="2"
        borderColor="black"
      />
      <Box
        height="60"
        marginX="2"
        marginY="1"
        backgroundColor="primary5.500"
        borderWidth="2"
        borderColor="black"
      />
      <Box
        height="60"
        marginX="2"
        marginY="1"
        backgroundColor="primary5.500"
        borderWidth="2"
        borderColor="black"
      />
      <Box
        height="60"
        marginX="2"
        marginY="1"
        backgroundColor="primary5.500"
        borderWidth="2"
        borderColor="black"
      />
      <Box
        height="60"
        marginX="2"
        marginY="1"
        backgroundColor="primary5.500"
        borderWidth="2"
        borderColor="black"
      />
      {/* SKELET SKELET SKELET SKELET */}
    </ScrollView>
  );
};

export default TransactionsPage;
