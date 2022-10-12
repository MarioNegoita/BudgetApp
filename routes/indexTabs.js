import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { AccountPage, GoalsBudgetsPage } from "../src/pages/index";

const Tab = createMaterialTopTabNavigator();

export const IndexTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: "#749F82",
        },
        tabBarLabelStyle: { fontSize: 15, fontWeight: "bold" },
      }}
    >
      <Tab.Screen name="Account" component={AccountPage} />
      <Tab.Screen name="Goals & Budgets" component={GoalsBudgetsPage} />
    </Tab.Navigator>
  );
};

export default IndexTabs;
