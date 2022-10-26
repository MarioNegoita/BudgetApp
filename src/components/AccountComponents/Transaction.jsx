import React, { useState } from "react";
import { HStack, Box, Icon, Text, Button } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export const Transaction = ({ type, sum, isRecieved }) => {
  const [shown, setShown] = useState("details");

  const icon = {
    Hobbies: "american-football",
    Car: "car",
    Cigarettes: "logo-no-smoking",
    Parking: "speedometer",
    Taxes: "briefcase",
    Food: "fast-food",
    Drinks: "cafe",
  };

  if (shown == "details") {
    return (
      <TouchableOpacity onPress={() => setShown("buttons")}>
        <HStack
          backgroundColor="muted.700"
          alignItems="center"
          padding="2"
          marginX="2"
          borderRadius="lg"
          justifyContent="space-between"
          borderBottomColor="muted.500"
          borderBottomWidth="2"
        >
          <HStack alignItems="center" marginLeft="2">
            <Box backgroundColor="orange.600" padding="2" borderRadius="lg">
              <Icon
                size="6"
                color="white"
                as={<Ionicons name={icon[type]} />}
              />
            </Box>
            <Text fontSize="18" color="white" ml="2">
              {type}
            </Text>
          </HStack>

          {isRecieved == "Spent" ? (
            <Text
              fontSize="18"
              fontWeight="bold"
              color="danger.500"
              marginRight="2"
            >
              -{sum} Ron
            </Text>
          ) : (
            <Text
              fontSize="18"
              fontWeight="bold"
              color="success.500"
              marginRight="2"
            >
              +{sum} Ron
            </Text>
          )}
        </HStack>
      </TouchableOpacity>
    );
  } else
    return (
      <HStack
        backgroundColor="muted.700"
        alignItems="center"
        padding="2"
        marginX="2"
        borderRadius="lg"
        justifyContent="space-between"
        borderBottomColor="muted.500"
        borderBottomWidth="2"
      >
        <TouchableOpacity
          onPress={() => {
            setShown("details");
          }}
        >
          <Box
            backgroundColor="primary2.500"
            padding="2"
            borderRadius="lg"
            ml="2"
          >
            <Icon size="6" color="white" as={<Ionicons name={"backspace"} />} />
          </Box>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setShown("details");
          }}
        >
          <Box
            backgroundColor="orange.600"
            padding="2"
            borderRadius="lg"
            ml="2"
          >
            <Icon
              size="6"
              color="white"
              as={<Ionicons name={"information-circle"} />}
            />
          </Box>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setShown("details");
          }}
        >
          <Box backgroundColor="red.600" padding="2" borderRadius="lg" ml="2">
            <Icon size="6" color="white" as={<Ionicons name={"trash"} />} />
          </Box>
        </TouchableOpacity>
      </HStack>
    );
};

export default Transaction;
