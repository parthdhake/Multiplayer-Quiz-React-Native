import { StatusBar } from "expo-status-bar";
import React from "react";
import { Card, Header } from "react-native-elements";
import { StyleSheet, Text, View, Image, Title } from "react-native";

export default function App() {
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
