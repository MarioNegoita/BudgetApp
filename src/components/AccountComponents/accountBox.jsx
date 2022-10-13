import React from "react";
import { Box, Text } from "native-base";

const AccountBox = ({ name, sum }) => {
  return (
    <Box
      backgroundColor="orange.600"
      borderRadius="lg"
      padding={2}
      minWidth={"45%"}
      mt="3"
    >
      <Text fontSize="15" color="white">
        {name}
      </Text>

      <Text fontSize="15" color="white">
        {sum} ron
      </Text>
    </Box>
  );
};
export default AccountBox;
