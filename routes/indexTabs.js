import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Box, Text, Icon, HStack, Center } from "native-base";
import { AccountPage, GoalsBudgetsPage } from "../src/pages/index";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const Tab = createMaterialTopTabNavigator();

export const IndexTabs = () => {
  return (
    <>
      <HStack backgroundColor="#1d1d42" padding="2" alignItems="center">
        <TouchableOpacity>
          <Box borderRadius="150" borderWidth="2" borderColor="white">
            <Icon
              as={<Ionicons name="person" />}
              size="6"
              mr="2"
              color="white"
              ml="2"
            />
          </Box>
        </TouchableOpacity>
        <Center ml="5">
          <Text color="white" fontSize="20" fontWeight="bold">
            FINSOME
          </Text>
        </Center>
        <Icon
          as={<FontAwesome5 name="level-up-alt" />}
          size="6"
          mr="2"
          color="white"
          ml="2"
        />
      </HStack>
      <Tab.Navigator
        screenOptions={{
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            backgroundColor: "#1d1d42",
          },
          tabBarLabelStyle: {
            fontSize: 15,
            fontWeight: "bold",
            color: "white",
          },
          tabBarIndicatorStyle: {
            backgroundColor: "white",
          },
        }}
      >
        <Tab.Screen name="Balance" component={AccountPage} />
        <Tab.Screen name="Goals & Budgets" component={GoalsBudgetsPage} />
      </Tab.Navigator>
    </>
  );
};

export default IndexTabs;
