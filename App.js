import { Platform, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import {combineReducers, createStore} from 'redux';
import { getApps, initializeApp } from "firebase/app";

import Ads from "./Screen/Ads";
import DeletePost from "./Screen/DeletePost";
import Event from "./Screen/Event";
import Home from "./Screen/home";
import {Provider} from 'react-redux'
import { SafeAreaProvider } from "react-native-safe-area-context";
import SelectScreenDash from "./Screen/SelectScreenDash";
import Sellers from "./Screen/sellersScreen";
import ServiceScreen from "./Screen/serviceScreen";
import Temp from "./Screen/Temp";
import UploadImageDBScreen from "./Screen/UploadImageDBScreen";
import WelcomeScreen from "./Screen/signUpScreen";
import filterReducer from './store/reducer/filterReducer';
import firebaseConfig from "./firebaseConfig";

const RootReducer=combineReducers({
  filter:filterReducer
})
const store=createStore(RootReducer);

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

export default function App() {
  const [screen, setScreen] = useState("");
  const [obj, setObj] = useState({ screen: "home", type: "sellers" });

  const oo = (ss) => {
    console.log(ss);
    setScreen(ss.screen);
    setObj(ss);
  };

  const screenHandle = (sc) => {
    setObj(sc);
    setScreen(sc);
  };

  let Content = <Temp onPress={screenHandle}  obj={obj}/>;

  if (screen === "sellers") {
    Content = <Sellers onPress={screenHandle} obj={obj} />;
  } else if (screen === "services") {
    Content = <ServiceScreen onPress={screenHandle} obj={obj} />;
  } else if (screen === "Add User") {
    Content = <WelcomeScreen onPress={oo} onBack={screenHandle} />;
  } else if (screen === "home") {
    Content = <Home onPress={screenHandle} />;
  } else if (screen === "Ads") {
    Content = <Ads onPress={screenHandle} />;
  } else if (screen === "Event") {
    Content = <Event onPress={screenHandle} />;
  } else if (screen === "SelectScreenDash") {
    Content = <SelectScreenDash onPress={screenHandle} />;
  } else if (screen === "UploadImageDBScreen") {
    Content = (
      <UploadImageDBScreen onPress={oo} obj={obj} onBack={screenHandle} />
    );
  } else if (screen === "Delete Post") {
    Content = <DeletePost onPress={screenHandle} />;
  }

  return  <SafeAreaProvider><Provider store={store} >{Content}</Provider></SafeAreaProvider>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
