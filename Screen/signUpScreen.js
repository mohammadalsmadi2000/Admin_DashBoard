import {
  ActivityIndicator,
  BackHandler,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { Button, ButtonGroup, withTheme } from "react-native-elements";
import { CheckBox, Icon } from "react-native-elements";
import React, { useEffect, useState } from "react";
import { Tooltip, colors } from "react-native-elements";

import { Header } from "react-native-elements";
import { Input } from "react-native-elements";
import { fetchSignInMethodsForEmail } from "firebase/auth";

const WelcomeScreen = (props) => {
  useEffect(() => {
    const backAction = () => {
      props.onBack.bind(this, "SelectScreenDash");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const [check2, setCheck2] = useState(true);
  const [check1, setCheck1] = useState(false);
  const [type, setType] = useState("services");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [uploading, seUploading] = useState(false);
  const [uid, setUid] = useState("no");
  const [err, setErr] = useState(false);

  const check = (C) => {
    if (C === "1") {
      setCheck1(true);
      setCheck2(false);
      setType("sellers");
    } else if (C === "2") {
      setCheck1(false);
      setCheck2(true);
      setType("services");
    }
  };
  const obj = {
    screen: "UploadImageDBScreen",
    type: type,
    email: email,
    password: password,
    uid: uid,
  };

  const handleError = () => {};

  const logIn = async () => {
    setErr(false);
    /*const  user = await fetchSignInMethodsForEmail("mohahasansmadi@jorpipline.com")
    .then((signInMethods) => { 
      if (signInMethods.length) {
        alert(" The email already exists in the Auth database. You can check the")
        // sign-in methods associated with it by checking signInMethods array.
        // Show the option to sign in with that sign-in method.
      } else {
        alert(" User does not exist. Ask user to sign up.");
      }
    })
    .catch((error) => { 
      alert(error)
    });*/

    if (email.length <= 5) {
      return null;
    } else
      try {
        seUploading(true);
        const resp = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCja87Re3jDKYrf5Ajb-Gz1H0jjb4_DgIw",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          }
        );

        /*if (!resp.ok) {
          
          throw new  Error("Something Error")
          
        }*/
        console.log(resp.status);
        if(resp.status==400){throw new setErr(true)}

        const resData = await resp.json();
        
        
        setUid(resData.localId);
        console.log(resData.localId);
      } catch (err) {
        console.log(err);
      } finally {
        seUploading(false);
      }

    if (uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "rgba(0,0,0,0.4)",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  return (
    <View style={{flex:1}}>
    <View>
    <Header
          lightTheme={true}
          backgroundColor="#393e42"
          leftComponent={{
            icon: "west",
            color: "#fff",
            onPress: props.onBack.bind(this, "SelectScreenDash"),
          }}
          centerComponent={{ text: "ADD USER", style: { color: "#fff" } }}
          rightComponent={{}}
        />
    </View>
     
    <ScrollView
      style={{ flex: 1, backgroundColor: "#393e42" }}
      showsVerticalScrollIndicator={false}
    >
    
      <ImageBackground
        source={require("../assets/542084d53f492cc8d8f7b31d5e935741.png")}
        style={{ height: Dimensions.get("window").height / 2.5 }}
      >
        
        <View style={styles.brandView}>
          <Text style={styles.brandViewText}>JOR Admin</Text>
        </View>
      </ImageBackground>
      <View style={styles.bottomView}>
        <View style={{ padding: 40 }}>
          <Text style={{ color: "rgba(78, 116, 289, 1)", fontSize: 34 }}>
            Welcome
          </Text>
          <Text style={{color:'#fff'}}>
            You are one of the people responsible for this application
            <Text
              style={{
                color: "rgba(78, 116, 289, 1)",
                fontStyle: "italic",
                fontWeight: "bold",
              }}
            >
              {" "}
              Add new user page{" "}
            </Text>
          </Text>
          <View style={{ marginTop: 50, flex: 1 }}>
            {err ? (
              <Text style={{ color: "red" }}>
                Email Already in use by another account !
              </Text>
            ) : null}
            <Input
            style={{ width: "80%",color:'#fff' }}
              placeholder="Email"
              secureTextEntry={false}
              keyboardType="email-address"
              onChangeText={(val) => {
                setEmail(val);
              }}
              errorMessage={
                email.length <= 25 && email.length != 0
                  ? "The email is too short "
                  : null
              }
            />
            <Input
            style={{ width: "80%",color:'#fff' }}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(val) => {
                setPassword(val.replace(/\s/g, ""));
              }}
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <CheckBox
                center
                title="Seller"
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={check1}
                onPress={() => check("1")}
              />

              <CheckBox
                center
                title="Service"
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={check2}
                onPress={() => check("2")}
              />
            </View>
          </View>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {uploading ? (
            <Button
              title="Solid"
              buttonStyle={{
                borderColor: "rgba(78, 116, 289, 1)",
              }}
              type="outline"
              titleStyle={{ color: "rgba(78, 116, 289, 1)" }}
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              loading
            />
          ) : (
            <Button
              disabled={uid === "no" ? false : true}
              title="log in"
              buttonStyle={{
                borderColor: "rgba(78, 116, 289, 1)",
              }}
              type="outline"
              titleStyle={{ color: "rgba(78, 116, 289, 1)" }}
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              onPress={logIn}
            />
          )}

          {uid === "no" ? (
            <Text style={{ color: "red" }}>
              *Please Log in to be able to Next Step
            </Text>
          ) : null}

          <Button
            disabled={uid === "no" ? true : false}
            title="Next Step"
            buttonStyle={{
              borderColor: "rgba(78, 116, 289, 1)",
            }}
            type="outline"
            titleStyle={{ color: "rgba(78, 116, 289, 1)" }}
            containerStyle={{
              width: 200,
              marginHorizontal: 50,
              marginVertical: 10,
            }}
            onPress={props.onPress.bind(this, obj)}
          />
        </View>
      </View>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  brandView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    
  },
  brandViewText: {
    color: "rgba(78, 116, 289, 1)",
    fontSize: 40,
    fontWeight: "bold",
    textTransform: "uppercase",
    
  },
  bottomView: {
    flex: 1.5,
    backgroundColor: "#ffffffff",
    bottom: 50,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
    backgroundColor:'#393e42'
  },
});

export default WelcomeScreen;
