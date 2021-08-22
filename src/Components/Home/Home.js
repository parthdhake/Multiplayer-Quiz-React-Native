import React from "react";
import { Card } from "react-native-elements";
import {
  Text,
  View,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import firebase from "../../utils/firebase";
import { useSelector, useDispatch } from "react-redux";
import { setUserDetails } from "../../store/userSlice";

const Home = (props) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <View style={styles.button}>
          <Ionicons
            onPress={() => props.navigation.navigate("Profile")}
            name="person-circle"
            size={40}
            color={"#000"}
          />
          <Ionicons
            onPress={() => {
              firebase.auth().signOut();
              dispatch(setUserDetails({ name: "", email: "", userID: "" }));
            }}
            name="log-out"
            size={40}
            color={"#000"}
          />
        </View>
      ),
    });
  }, [props.navigation]);
  return (
    <View style={styles.container}>
      {/* <Header /> */}
      <Card containerStyle={{}} wrapperStyle={{}}>
        <Card.Title>CARD WITH DIVIDER</Card.Title>
        <Card.Divider />
        <View
          style={{
            position: "relative",
            alignItems: "center",
          }}
        >
          <Image
            style={{ width: "100%", height: 100 }}
            resizeMode="contain"
            source={{
              uri: "https://avatars0.githubusercontent.com/u/32242596?s=460&u=1ea285743fc4b083f95d6ee0be2e7bb8dcfc676e&v=4",
            }}
          />
          <Text>Pranshu Chittora</Text>
        </View>
      </Card>
      <Button
        title="Go to Details"
        onPress={() =>
          props.navigation.navigate("Profile", {
            itemId: 86,
            otherParam: "anything you want here",
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    display: "flex",
    flexDirection: "row",
    color: "#648459",
    marginRight: 10,
  },
});

export default Home;
