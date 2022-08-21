import {
  Alert,
  Dimensions,
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Tooltip, colors } from "react-native-elements";

import { Button } from "react-native-elements";
import Cards from "../Components/Cards";
import { Input } from "react-native-elements";
import LogInScreen from "./sellersScreen";
import { StatusBar } from "expo-status-bar";

const { heights } = Dimensions.get("window");

export default function Home(props) {
  const [check, setCheck] = useState(false);
  const [val, setVal] = useState("jorpipline");

 

  return (
    <View style={styles.container}>
      
        <TouchableOpacity
          activeOpacity={100}
          onPress={Keyboard.dismiss}
          style={styles.container2}
        >
          <StatusBar style="auto" />
          <View style={styles.inputView}>
            <View
              style={{ marginBottom: 50, width: "100%", alignItems: "center" }}
            >
              <Tooltip
                popover={<Text>Welcome to the best team</Text>}
                width={200}
                backgroundColor={colors.primary}
              >
                <Text
                  style={{
                    fontSize: 34,
                    fontWeight: "bold",
                    fontStyle: "italic",
                    textAlign: "center",
                    color: "#fff",
                  }}
                >
                  SAY HELLO ...
                </Text>
              </Tooltip>
            </View>
            <Input
            
              autoCapitalize="none"
              autoComplete={false}
              autoCorrect={false}
              style={{ width: "80%",color:'#fff' }}
              textAlignVertical={("top", "bottom")}
              textAlign={"center"}
              placeholderTextColor="#fff"
              placeholder="ADMIN CODE"
              secureTextEntry={false}
              keyboardType="email-address"
              
              onChangeText={(value) => {
                setVal(value);
              }}
            />
          </View>
          <View style={styles.buttonView}>
            <Button
              title="ADMIN"
              icon={{
                name: "lock",
                type: "font-awesome",
                size: 15,
                color: "white",
              }}
              iconRight
              iconContainerStyle={{ marginLeft: 10 }}
              titleStyle={{ fontWeight: "700" }}
              buttonStyle={{
                backgroundColor: "rgba(78, 116, 289, 1)",
                borderColor: "transparent",
                borderWidth: 0,
                borderRadius: 30,
              }}
              containerStyle={{
                width: "40%",
                marginHorizontal: 10,
                marginVertical: 10,
              }}
              onPress={
                val === "jorpipeline"
                  ? props.onPress.bind(this, "SelectScreenDash")
                  : () =>
                      Alert.alert(
                        "Wrong Code",
                        "The code is wrong, please enter a valid code."
                      )
              }
            />
            <TouchableOpacity onPress={()=>{alert("soon")}} >
              <Text
                style={{ textDecorationLine: "underline", color: "#888888" }}
              >
                Password request
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{ flex: 1, width: "100%", justifyContent: "flex-start" }}
          >
            
          </View>
        </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: "#393e42",
  },
  container2: {
    flex: 1,
    marginTop: 25,
    backgroundColor: "#393e42",
  },

  image: {
    marginBottom: 10,
    width: 175,
    height: 175,
  },
  loginText: {
    fontSize: 30,
    color: "#ffffffff",
    fontWeight: "bold",
    fontStyle: "italic",
  },

  inputView: {
    backgroundColor: "#E3CAA5",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    paddingTop: 60,
    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "rgba(78, 116, 289, 1)",
  },
  inputView: {
    flex: 1.5,
    height: Dimensions.get("window").height / 2.5,
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
  },
  buttonView: {
    flex: 1,
    height: Dimensions.get("window").height / 8,
    marginTop: 10,
    alignItems: "center",
  },
});
