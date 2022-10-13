import React, { useState, useEffect } from "react";
import { Center, Button, Box } from "native-base";
// import {
//   signOut,
//   auth,
//   onSnapshot,
//   query,
//   db,
//   collection,
//   orderBy,
// } from "../../config/firebase-key-config";

import { Balance } from "../components/AccountComponents/index";

export const AccountPage = ({ navigation }) => {
  // const logOut = () => {
  //   signOut(auth).then(() => {
  //     navigation.reset({
  //       routes: [{ name: "Login" }],
  //     });
  //   });
  // };

  // const [accounts, setAccounts] = useState();
  // useEffect(() => {
  //   const q = query(
  //     collection(db, `users/${auth.currentUser.uid}/accounts`),
  //     orderBy("sum", "desc")
  //   );

  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //     setAccounts(
  //       querySnapshot.docs.map((doc) => ({
  //         sum: doc.data().sum,
  //         name: doc.data().name,
  //       }))
  //     );
  //   });

  //   return () => unsubscribe();
  // }, []);

  return (
    <Box flex={1} backgroundColor="primary1.500">
      <Balance name="cash" sum="5000" />
    </Box>
  );
};

export default AccountPage;
