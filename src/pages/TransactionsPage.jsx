import React, { useState, useEffect } from "react";
import {
  Box,
  Center,
  HStack,
  Icon,
  ScrollView,
  Select,
  Text,
  VStack,
} from "native-base";
import { useGlobal } from "../../state";
import Transaction from "../components/AccountComponents/Transaction";
import moment from "moment/moment";

const TransactionsPage = ({ route, navigation }) => {
  const [{ accountsData }] = useGlobal();
  const [whatAcc, setWhatAcc] = useState("");
  const transactions = route.params.transactions;
  const [todaySpendings, setTodaySpendings] = useState(0);
  const [thisMonthSpendings, setThisMonthSpendings] = useState(0);

  useEffect(() => {
    let today = 0;
    let month = 0;
    const isToday = moment().format("DD-MMM");
    const isThisMonth = moment().format("MMM");
    console.log(isThisMonth);
    if (whatAcc)
      for (let i = 0; i <= transactions.length; i++) {
        if (
          whatAcc == "All" &&
          transactions[i]?.date == isToday &&
          transactions[i].isIncome == "Spent"
        )
          today = today + Number(transactions[i].sum);
        else if (
          transactions[i]?.whatAcc == whatAcc &&
          transactions[i].isIncome == "Spent" &&
          transactions[i].date == isToday
        )
          today = today + Number(transactions[i].sum);
      }

    if (whatAcc)
      for (let i = 0; i <= transactions.length; i++) {
        if (
          whatAcc == "All" &&
          transactions[i]?.date.includes(isThisMonth) &&
          transactions[i].isIncome == "Spent"
        )
          month = today + Number(transactions[i].sum);
        else if (
          transactions[i]?.whatAcc == whatAcc &&
          transactions[i].isIncome == "Spent" &&
          transactions[i]?.date.includes(isThisMonth)
        )
          month = month + Number(transactions[i].sum);
      }

    setThisMonthSpendings(month);
    setTodaySpendings(today);
  }, [whatAcc]);

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
            <Select.Item label={"show all..."} value={"All"} />
          </Select>
          <Box mr="4" borderBottomWidth="3" borderBottomColor="green.400">
            {accountsData?.accountsList?.map((account, index) => {
              if (account.name == whatAcc)
                return (
                  <Text key={index} fontSize="18" color="white">
                    {account.sum}
                  </Text>
                );
            })}
          </Box>
        </HStack>
      </Box>

      {!whatAcc && (
        <Center mt="4">
          <Text color="white" fontSize="20" textAlign="center">
            Choose an account to see recent transactions
          </Text>
        </Center>
      )}

      {whatAcc && (
        <HStack
          mt="6"
          borderColor="primary5.500"
          backgroundColor="#1d1d42"
          borderTopWidth="2"
          borderBottomWidth="2"
          justifyContent="space-around"
          alignItems="center"
        >
          <VStack justifyContent="center" alignItems="center" my="4">
            <Text fontSize="16" color="white">
              Spent Today:
            </Text>
            <Box
              backgroundColor="#4e2ecf"
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
            <Text fontSize="16" color="white">
              Spent This Month:
            </Text>
            <Box
              backgroundColor="#4e2ecf"
              justifyContent="center"
              alignItems="center"
              borderRadius="100"
              width="82"
              height="82"
            >
              <Text fontSize="20" color="white" textAlign="center">
                {thisMonthSpendings} ron
              </Text>
            </Box>
          </VStack>
        </HStack>
      )}

      {whatAcc && (
        <Box
          mt="6"
          borderRadius="35"
          backgroundColor="primary5.500"
          mx="2"
          paddingY="5"
        >
          {transactions?.map((transaction, index) => {
            if (transaction.whatAcc == whatAcc || whatAcc == "All")
              return (
                <Transaction
                  key={index}
                  type={transaction.type}
                  date={transaction.date}
                  sum={transaction.sum}
                  isIncome={transaction.isIncome}
                  whatAcc={transaction.whatAcc}
                  UITYPE="without details"
                />
              );
          })}
        </Box>
      )}
    </ScrollView>
  );
};

export default TransactionsPage;
