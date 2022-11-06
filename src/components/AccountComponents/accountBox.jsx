import React from "react";
import { Box, HStack, Text } from "native-base";

const AccountBox = ({ name, sum }) => {
  return (
    <Box
      borderRadius="lg"
      mt="3"
      width="100%"
      padding="2"
      backgroundColor="orange.300"
    >
      <HStack alignItems="center" justifyContent="space-between">
        <Text fontSize="18" color="primary3.500" ml="2">
          {name}
        </Text>

        <Text fontSize="17" color="primary3.500" mr="2">
          {sum} ron
        </Text>
      </HStack>
    </Box>
  );
};
export default AccountBox;
