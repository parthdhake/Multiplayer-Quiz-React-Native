import React, { Component } from "react";
import { View, Text, Button } from "react-native";
// import { TabNavigator } from "r@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Play from "./Play";
import Practice from "./Practice";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export default function Profile(props) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Play") {
            iconName = focused ? "play-circle" : "play-circle-outline";
          } else if (route.name === "Practice") {
            iconName = focused ? "ios-list-box" : "ios-list";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",

        headerShown: false,
      })}
    >
      <Tab.Screen name="Play" component={Play} />
      <Tab.Screen name="Practice" component={Practice} />
    </Tab.Navigator>
  );
}
