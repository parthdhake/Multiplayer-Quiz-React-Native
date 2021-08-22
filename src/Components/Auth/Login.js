import React, { useContext, useState } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../../store/userSlice";

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  ScrollView,
} from "react-native";
import FormInput from "../FormComponents/FormInput";

import FormButton from "../FormComponents/FormButton";
import SocialButton from "../FormComponents/SocialButton";
import { useFonts, Kufam_600SemiBold } from "@expo-google-fonts/kufam";
import { Lato_400Regular } from "@expo-google-fonts/lato";
import firebase from "../../utils/firebase";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  let [fontsLoaded] = useFonts({
    Kufam_600SemiBold,
    Lato_400Regular,
  });
  const dispatch = useDispatch();

  const login = (email, password) => {
    if (email !== "" && password !== "") {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          setTimeout(() => {
            let data = {
              name: user.displayName,
              email: user.email,
              userID: user.uid,
            };

            dispatch(setUserDetails(data));
            navigation.navigate("Home");
            // setloggedIn(true);
          }, 1000);
        })
        .catch((error) => {
          const errorMessage = error.message;
          alert(errorMessage);
          console.log(errorMessage);
        });
    }
  };
  if (!fontsLoaded) {
    return <ActivityIndicator />;
  } else {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {/* <Image source={require("../../../assets/logo.png")} style={styles.logo} /> */}
        <Text style={styles.text}>Multiplayer Quiz</Text>

        <FormInput
          labelValue={email}
          onChangeText={(userEmail) => setEmail(userEmail)}
          placeholderText="Email"
          iconType="user"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <FormInput
          labelValue={password}
          onChangeText={(userPassword) => setPassword(userPassword)}
          placeholderText="Password"
          iconType="lock"
          secureTextEntry={true}
        />

        <FormButton
          buttonTitle="Sign In"
          onPress={() => login(email, password)}
        />

        <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
          <Text style={styles.navButtonText}>Forgot Password?</Text>
        </TouchableOpacity>

        {Platform.OS === "android" ? (
          <View>
            <SocialButton
              buttonTitle="Sign In with Facebook"
              btnType="facebook"
              color="#4867aa"
              backgroundColor="#e6eaf4"
              // onPress={() => fbLogin()}
            />

            <SocialButton
              buttonTitle="Sign In with Google"
              btnType="google"
              color="#de4d41"
              backgroundColor="#f5e7ea"
              // onPress={() => googleLogin()}
            />
          </View>
        ) : null}

        <TouchableOpacity
          style={styles.forgotButton}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={styles.navButtonText}>
            Don't have an acount? Create here
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
};

export default Login;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: "cover",
  },
  text: {
    fontFamily: "Kufam_600SemiBold",
    fontSize: 28,
    marginBottom: 10,
    color: "#051d5f",
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#2e64e5",
    fontFamily: "Lato_400Regular",
  },
});
