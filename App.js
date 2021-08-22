import React from "react";
import store from "./src/store/store";
import { Provider } from "react-redux";
import QuizApp from "./src/QuizApp";

export default function App() {
  return (
    <Provider store={store}>
      <QuizApp />
    </Provider>
  );
}
