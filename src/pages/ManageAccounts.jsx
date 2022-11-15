import { Box, ScrollView, Text, HStack, Select, Center } from "native-base";
import React, { useState } from "react";
import { useGlobal } from "../../state";
import Transaction from "../components/AccountComponents/Transaction";
import moment from "moment/moment";

const ManageAccounts = ({ navigation }) => {
  const [{ accountsData }] = useGlobal();
  const [whatAcc, setWhatAcc] = useState("");

  return (
    <ScrollView flex="1" backgroundColor="#1d1d42">
      <Box mt="5" mx="1" backgroundColor="#4e2ecf" borderRadius="35" shadow="9">
        <Box
          justifyContent="center"
          alignItems="center"
          mt="5"
          borderRadius="35"
        >
          <Text fontSize="25" fontWeight="extrabold" color="white">
            Manage Your Accounts
          </Text>
        </Box>
        <HStack justifyContent="center" alignItems="center" mt="5">
          <Text fontSize="18" fontWeight="bold" color="white">
            Current Account
          </Text>
        </HStack>
        <HStack mt="10" mb="5" alignItems="center" justifyContent="center">
          <Select
            textAlign="center"
            borderWidth="0"
            width="200"
            fontSize="16"
            backgroundColor="white"
            placeholder="choose an account "
            onValueChange={(value) => setWhatAcc(value)}
            ml="2"
            borderRadius="30"
          >
            {accountsData?.accountsList?.map((account, index) => {
              return (
                <Select.Item
                  label={account.name}
                  value={account.name}
                  key={index}
                />
              );
            })}
          </Select>
        </HStack>
      </Box>

      <Box mt="5">
        <Text color="white" fontSize="20">
          TODO:
        </Text>
        <Text color="white" fontSize="17">
          -Delete account
        </Text>
        <Text color="white" fontSize="17">
          -Update sum
        </Text>
        <Text color="white" fontSize="17">
          -Maybe Show some Pie Charts
        </Text>
      </Box>
    </ScrollView>
  );
};

export default ManageAccounts;
