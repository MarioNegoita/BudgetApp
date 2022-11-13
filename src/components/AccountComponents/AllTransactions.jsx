import React, { useState, useEffect } from "react";
import { Box, Text } from "native-base";
import Transaction from "./Transaction";
import { TouchableOpacity } from "react-native";
import {
  query,
  collection,
  db,
  auth,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
} from "../../../config/firebase-key-config";
import { useNavigation } from "@react-navigation/native";

export const AllTransactions = () => {
  const [transactions, setTransactions] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    const q = query(
      collection(db, `users/${auth.currentUser.uid}/transactions`),
      orderBy("time", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setTransactions(
        querySnapshot.docs.map((doc) => ({
          type: doc.data().type,
          sum: doc.data().sum,
          date: doc.data().date,
          isIncome: doc.data().isIncome,
          id: doc.data().id,
          whatAcc: doc.data().acc,
          time: doc.data().time,
        }))
      );
      console.log(transactions);
    });

    return () => unsubscribe();
  }, []);

  const removeTransaction = async (item) => {
    let filteredArr = transactions.filter((el) => el.id !== item.id);
    setTransactions(filteredArr);

    deleteDoc(doc(db, "users", auth.currentUser.uid, "transactions", item.id));
  };

  return (
    <Box
      paddingBottom={5}
      backgroundColor="primary5.500"
      borderRadius="35"
      borderWidth="3"
      mt="4"
      borderColor="#3441cb"
    >
      <Box alignItems="center">
        <Text
          marginLeft="2"
          fontSize="22"
          color="primary3.500"
          my="2"
          textDecorationLine="underline"
        >
          Recent Transactions
        </Text>
      </Box>
      {transactions?.slice(0, 5).map((transaction, index) => {
        return (
          <Transaction
            key={index}
            type={transaction.type}
            date={transaction.date}
            sum={transaction.sum}
            isIncome={transaction.isIncome}
            remove={() => removeTransaction(transaction)}
            UITYPE="with details"
          />
        );
      })}
      <Box alignItems="center" justifyContent="center">
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("TransactionsPage", { transactions })
          }
        >
          <Box
            backgroundColor="primary5.500"
            marginTop="6"
            borderRadius="xl"
            width="100"
            alignItems="center"
          >
            <Text color="oran.500" fontSize="15">
              Show More...
            </Text>
          </Box>
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

export default AllTransactions;
