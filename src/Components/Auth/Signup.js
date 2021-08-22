import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import FormInput from "../FormComponents/FormInput";
import FormButton from "../FormComponents/FormButton";
import SocialButton from "../FormComponents/SocialButton";
import { useFonts, Kufam_600SemiBold } from "@expo-google-fonts/kufam";
import { Lato_400Regular } from "@expo-google-fonts/lato";
import firebase from "../../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../../store/userSlice";

const Signup = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Kufam_600SemiBold,
    Lato_400Regular,
  });
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const register = (name, email, password, confirmPassword) => {
    if (password === confirmPassword) {
      if (email !== "" && password !== "" && name !== "") {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            console.log(user);
            user.updateProfile({
              displayName: name,
            });

            setTimeout(() => {
              let data = {
                name: user.displayName,
                email: user.email,
                userID: user.uid,
              };

              dispatch(setUserDetails(data));
              // setsignedUp(true);
            }, 1000);

            // ...
          })
          .catch((error) => {
            var errorMessage = error.message;
            alert(errorMessage);

            // ..
          });
      } else {
        alert("Please fill All details");
      }
    }
  };

  useEffect(() => {
    console.log(user);
    // fetch("http://localhost:5000/api/users", {
    //   method: "POST",
    //   body: JSON.stringify(user),
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log(data));
    try {
      axios
        .post("http://localhost:5000/api/user/", user)
        .then(function (response) {
          console.log(response);
        });
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Create an account</Text>
        <FormInput
          labelValue={name}
          onChangeText={(userName) => setName(userName)}
          placeholderText="Name"
          iconType="user"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

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

        <FormInput
          labelValue={confirmPassword}
          onChangeText={(userPassword) => setConfirmPassword(userPassword)}
          placeholderText="Confirm Password"
          iconType="lock"
          secureTextEntry={true}
        />

        <FormButton
          buttonTitle="Sign Up"
          onPress={() => register(name, email, password, confirmPassword)}
        />

        <View style={styles.textPrivate}>
          <Text style={styles.color_textPrivate}>
            By registering, you confirm that you accept our{" "}
          </Text>
          <TouchableOpacity onPress={() => alert("Terms Clicked!")}>
            <Text style={[styles.color_textPrivate, { color: "#e88832" }]}>
              Terms of service
            </Text>
          </TouchableOpacity>
          <Text style={styles.color_textPrivate}> and </Text>
          <Text style={[styles.color_textPrivate, { color: "#e88832" }]}>
            Privacy Policy
          </Text>
        </View>

        {Platform.OS === "android" ? (
          <View>
            <SocialButton
              buttonTitle="Sign Up with Facebook"
              btnType="facebook"
              color="#4867aa"
              backgroundColor="#e6eaf4"
              onPress={() => {}}
            />

            <SocialButton
              buttonTitle="Sign Up with Google"
              btnType="google"
              color="#de4d41"
              backgroundColor="#f5e7ea"
              onPress={() => {}}
            />
          </View>
        ) : null}

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.navButtonText}>Have an account? Sign In</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9fafd",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
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
  navButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#2e64e5",
    fontFamily: "Lato_400Regular",
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 35,
    justifyContent: "center",
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: "400",
    fontFamily: "Lato_400Regular",
    color: "grey",
  },
});
