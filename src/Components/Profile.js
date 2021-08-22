import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Play from "./UserProfile";
import Practice from "./BattleHistory";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

const myIcon = <Icon name="rocket" size={30} color="#900" />;

export default function Profile(props) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "User Profile") {
            iconName = focused
              ? (iconName = (
                  <Ionicons name={"person-circle"} size={size} color={color} />
                ))
              : (iconName = (
                  <Ionicons
                    name={"person-circle-outline"}
                    size={size}
                    color={color}
                  />
                ));
          } else if (route.name === "Battle History") {
            iconName = focused
              ? (iconName = <Icon name="history" size={size} color={color} />)
              : (iconName = <Icon name="history" size={size} color={color} />);
          }

          // You can return any component that you like here!
          return iconName;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",

        headerShown: false,
      })}
    >
      <Tab.Screen name="User Profile" component={Play} />
      <Tab.Screen name="Battle History" component={Practice} />
    </Tab.Navigator>
  );
}
