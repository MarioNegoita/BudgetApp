import React, { useState, useEffect } from "react";
import {
  Box,
  HStack,
  Icon,
  ScrollView,
  Select,
  Text,
  VStack,
} from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { useGlobal } from "../../state";
import Transaction from "../components/AccountComponents/Transaction";
import moment from "moment/moment";

const TransactionsPage = ({ route, navigation }) => {
  const [{ accountsData }] = useGlobal();
  const [whatAcc, setWhatAcc] = useState("");
  const transactions = route.params.transactions;
  const [todaySpendings, setTodaySpendings] = useState(0);
  const [thisMonthSpendings, setThisMonthSpendings] = useState(0);

  console.log(transactions);
  useEffect(() => {
    let today = 0;
    const isToday = moment().format("DD-MMM");
    if (whatAcc)
      for (let i = 0; i <= transactions.length; i++) {
        if (
          transactions[i]?.whatAcc == whatAcc &&
          transactions[i].isIncome == "Spent" &&
          transactions[i].date == isToday
        )
          today = today + Number(transactions[i].sum);
      }
    setTodaySpendings(today);
  }, [whatAcc]);

  return (
    <ScrollView flex="1" backgroundColor="white">
      <Box mt="5" mx="1" backgroundColor="#3441cb" borderRadius="35" shadow="9">
        <Box
          justifyContent="center"
          alignItems="center"
          mt="5"
          borderRadius="35"
        >
          <Text fontSize="25" fontWeight="extrabold" color="white">
            All Transactions
          </Text>
        </Box>
        <HStack justifyContent="center" alignItems="center" mt="5">
          <Text fontSize="18" fontWeight="bold" color="white">
            Current Account
          </Text>
        </HStack>
        <HStack
          mt="10"
          mb="5"
          alignItems="center"
          justifyContent="space-between"
        >
          <Select
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
          <Box mr="4" borderBottomWidth="3" borderBottomColor="green.400">
            <Text fontSize="18" color="white">
              1500
            </Text>
          </Box>
        </HStack>
      </Box>

      <HStack
        mt="6"
        borderColor="primary5.600"
        backgroundColor="primary5.500"
        borderWidth="2"
        justifyContent="space-around"
        alignItems="center"
      >
        <VStack justifyContent="center" alignItems="center" my="4">
          <Text fontSize="16" color="black">
            Spent Today:
          </Text>
          <Box
            backgroundColor="#3441cb"
            justifyContent="center"
            alignItems="center"
            borderRadius="100"
            width="82"
            height="82"
          >
            <Text fontSize="20" color="white" textAlign="center">
              {todaySpendings} ron
            </Text>
          </Box>
        </VStack>

        <VStack justifyContent="center" alignItems="center" my="4">
          <Text fontSize="16" color="black">
            Spent Today:
          </Text>
          <Box
            backgroundColor="#3441cb"
            justifyContent="center"
            alignItems="center"
            borderRadius="100"
            width="82"
            height="82"
          >
            <Text fontSize="20" color="white" textAlign="center">
              {todaySpendings} ron
            </Text>
          </Box>
        </VStack>
      </HStack>

      <Box mt="6">
        {transactions?.map((transaction, index) => {
          if (transaction.whatAcc == whatAcc)
            return (
              <Transaction
                key={index}
                type={transaction.type}
                date={transaction.date}
                sum={transaction.sum}
                isIncome={transaction.isIncome}
                UITYPE="without details"
              />
            );
        })}
      </Box>
    </ScrollView>
  );
};

export default TransactionsPage;
