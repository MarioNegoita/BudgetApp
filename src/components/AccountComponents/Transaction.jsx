import React, { useState, useEffect } from "react";
import { HStack, Box, Icon, Text, VStack, Center } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export const Transaction = ({
  type,
  date,
  sum,
  isIncome,
  remove,
  UITYPE,
  whatAcc,
}) => {
  const [shown, setShown] = useState("details");

  const icon = {
    Hobbies: "american-football",
    Car: "car",
    Cigarettes: "logo-no-smoking",
    Parking: "speedometer",
    Taxes: "briefcase",
    Food: "fast-food",
    Drinks: "cafe",
    Income: "md-trending-up-sharp",
  };

  useEffect(() => {
    setShown("details");
  }, [remove]);

  if (UITYPE == "with details")
    if (shown == "details") {
      return (
        <TouchableOpacity onPress={() => setShown("buttons")}>
          <HStack
            backgroundColor="primary5.500"
            alignItems="center"
            padding="2"
            marginX="2"
            justifyContent="space-between"
            borderBottomColor="primary1.500"
            borderBottomWidth="2"
          >
            <HStack alignItems="center">
              <Icon
                size="8"
                color="#4e2ecf"
                as={<Ionicons name={icon[type]} />}
              />

              <VStack alignItems="center" justifyContent="center" width="100">
                <Text fontSize="18" color="primary3.500" ml="2">
                  {type}
                </Text>
                <Text fontSize="9">{date}</Text>
              </VStack>
            </HStack>

            {isIncome == "Spent" ? (
              <Text
                fontSize="18"
                fontWeight="bold"
                color="danger.400"
                marginRight="2"
              >
                -{sum} Ron
              </Text>
            ) : (
              <Text
                fontSize="18"
                fontWeight="bold"
                color="green.500"
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
          backgroundColor="primary5.500"
          alignItems="center"
          padding="3"
          marginX="2"
          justifyContent="space-between"
          borderBottomColor="primary1.500"
          borderBottomWidth="2"
        >
          <TouchableOpacity
            onPress={() => {
              setShown("details");
            }}
          >
            <Icon size="8" color="black" as={<Ionicons name={"backspace"} />} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setShown("details");
            }}
          >
            <Icon
              size="8"
              color="primary4.500"
              as={<Ionicons name={"information-circle"} />}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => remove()}>
            <Icon
              size="8"
              color="danger.400"
              as={<Ionicons name={"trash"} />}
            />
          </TouchableOpacity>
        </HStack>
      );
  else
    return (
      <TouchableOpacity
        onPress={() => {
          if (shown == "acc") {
            setShown("details");
          } else setShown("acc");
        }}
      >
        {shown == "details" && (
          <HStack
            backgroundColor="primary5.500"
            alignItems="center"
            padding="2"
            marginX="2"
            justifyContent="space-between"
            borderBottomColor="primary1.500"
            borderBottomWidth="2"
          >
            <HStack alignItems="center">
              <Icon
                size="8"
                color="#4e2ecf"
                as={<Ionicons name={icon[type]} />}
              />

              <VStack alignItems="center" width="100">
                <Text fontSize="18" color="primary3.500" ml="2">
                  {type}
                </Text>
                <Text fontSize="9">{date}</Text>
              </VStack>
            </HStack>

            <HStack>
              {isIncome == "Spent" ? (
                <Text
                  fontSize="18"
                  fontWeight="bold"
                  color="danger.400"
                  marginRight="2"
                >
                  -{sum} Ron
                </Text>
              ) : (
                <Text
                  fontSize="18"
                  fontWeight="bold"
                  color="green.500"
                  marginRight="2"
                >
                  +{sum} Ron
                </Text>
              )}
            </HStack>
          </HStack>
        )}

        {shown == "acc" && (
          <HStack
            backgroundColor="primary5.500"
            marginX="2"
            padding="2"
            borderBottomColor="primary1.500"
            borderBottomWidth="2"
            alignItems="center"
            // justifyContent="space-between"
          >
            <Icon
              size="8"
              color="#4e2ecf"
              as={<Ionicons name={icon[type]} />}
            />
            <Box my="2" justifyContent="center" flexGrow="1">
              <Text fontSize="18" textAlign="center">
                Transaction account: {whatAcc}
              </Text>
            </Box>
          </HStack>
        )}
      </TouchableOpacity>
    );
};

export default Transaction;
