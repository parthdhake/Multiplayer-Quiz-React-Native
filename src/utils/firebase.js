import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC90nW-xjwAitq-9PEDwNkmqa8d1AzXOac",
  authDomain: "multiplayer-quiz-native.firebaseapp.com",
  projectId: "multiplayer-quiz-native",
  storageBucket: "multiplayer-quiz-native.appspot.com",
  messagingSenderId: "181059289034",
  appId: "1:181059289034:web:2f9889958b38a31d689933",
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
}

export const auth = app.auth();
export default app;
