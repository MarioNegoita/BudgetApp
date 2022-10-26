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

export const AllTransactions = () => {
  const [transactions, setTransactions] = useState();

  useEffect(() => {
    const q = query(
      collection(db, `users/${auth.currentUser.uid}/transactions`),
      orderBy("date", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setTransactions(
        querySnapshot.docs.map((doc) => ({
          type: doc.data().type,
          sum: doc.data().sum,
          date: doc.data().date,
          isIncome: doc.data().isIncome,
          id: doc.data().id,
        }))
      );
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
      mt={2}
      borderBottomColor="white"
      borderBottomWidth={"1"}
      paddingBottom={5}
    >
      <Text marginLeft="2" fontSize="22" color="white">
        Recent Transactions
      </Text>
      {transactions?.slice(0, 5).map((transaction, index) => {
        return (
          <Transaction
            key={index}
            type={transaction.type}
            sum={transaction.sum}
            isIncome={transaction.isIncome}
            remove={() => removeTransaction(transaction)}
          />
        );
      })}
      <TouchableOpacity>
        <Box
          backgroundColor="primary4.500"
          marginTop="2"
          alignItems="center"
          justifyContent="center"
          borderRadius="lg"
          mx="2"
        >
          <Text>Show More...</Text>
        </Box>
      </TouchableOpacity>
    </Box>
  );
};

export default AllTransactions;
