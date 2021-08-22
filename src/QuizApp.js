import React from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Profile from "./Components/Profile";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import Home from "./Components/Home/Home";
import PythonQuiz from "./Components/Python/PythonQuiz";
import JavaScriptQuiz from "./Components/JS/JavaScriptQuiz";
import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import { setUserDetails } from "./store/userSlice";
import firebase from "./utils/firebase";
import { useDispatch, useSelector } from "react-redux";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export default function QuizApp() {
  const [isLoading, setLoading] = React.useState(true);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
        let data = {
          name: user.displayName,
          email: user.email,
          userID: user.uid,
        };
        console.log(data);
        dispatch(setUserDetails(data));
      }
      setLoading(false);
    });
  }, []);
  return (
    <NavigationContainer>
      {isLoading ? (
        <ActivityIndicator style={styles.activityIndicator} size="large" />
      ) : user.userID !== "" ? (
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen
            name="Home"
            component={Home}
            options={{
              title: "Home",
              drawerIcon: ({ focused, size }) => (
                <Ionicons
                  name="md-home"
                  size={size}
                  color={focused ? "#7cc" : "#ccc"}
                />
              ),
            }}
          />
          <Drawer.Screen
            options={{
              title: "Profile",
              drawerIcon: ({ focused, size }) => (
                <Ionicons
                  name="person-circle"
                  size={size}
                  color={focused ? "#7cc" : "#ccc"}
                />
              ),
            }}
            name="Profile"
            component={Profile}
          />
          <Drawer.Screen
            options={{
              title: "Python-Quiz",
              drawerIcon: ({ focused, size }) => (
                <Ionicons
                  name="logo-python"
                  size={size}
                  color={focused ? "#7cc" : "#ccc"}
                />
              ),
            }}
            name="Python"
            component={PythonQuiz}
          />
          <Drawer.Screen
            options={{
              title: "JavaScript-Quiz",
              drawerIcon: ({ focused, size }) => (
                <Ionicons
                  name="logo-javascript"
                  size={size}
                  color={focused ? "#7cc" : "#ccc"}
                />
              ),
            }}
            name="JavaScript"
            component={JavaScriptQuiz}
          />
        </Drawer.Navigator>
      ) : (
        <Drawer.Navigator initialRouteName="Login">
          <Drawer.Screen
            options={{
              title: "Login",
              drawerIcon: ({ focused, size }) => (
                <Ionicons
                  name="logo-javascript"
                  size={size}
                  color={focused ? "#7cc" : "#ccc"}
                />
              ),
            }}
            name="Login"
            component={Login}
          />
          <Drawer.Screen
            options={{
              title: "Signup",
              drawerIcon: ({ focused, size }) => (
                <Ionicons
                  name="logo-javascript"
                  size={size}
                  color={focused ? "#7cc" : "#ccc"}
                />
              ),
            }}
            name="Signup"
            component={Signup}
          />
        </Drawer.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
