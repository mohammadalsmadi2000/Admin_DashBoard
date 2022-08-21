import * as ImagePicker from "expo-image-picker";

import {
  ImageBackground,
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import { Button } from "react-native-elements";
import { Input } from "react-native-elements";
import Photo from "./Photo";
import { StatusBar } from "expo-status-bar";
import UploadPhotoToDB from "../Components/UploadPhotoToDB";

export default function sellers(props) {
  
  //state section
  
  const [fullName, setFullName] = useState("1");
  const [phone, setPhone] = useState("1");
  const [done, setDone] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [uid, setUid] = useState(props.obj.uid);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uriPhotoLogo, setUriPhotoLogo] = useState("");
  const [uriPhotoBackground, setUriPhotoBackground] = useState("");
  const [talent, setTalent] = useState("1");

  //http request
  useEffect(async () => {
    console.log(props.obj.uid);
    setUid(props.obj.uid);
  }, []);

  const ss = () => {};
  const getMovies = async () => {
    if (talent && fullName && phone === "1") {
      return alert("plz enter user info");
    } else {
      try {
        const response = await fetch(
          `https://jor-pipeline-6a736-default-rtdb.firebaseio.com/users/${uid}.json`,
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              is_owner: "yes",
              user_talent: talent,
              user_full_name: fullName,
              user_id: uid,
              user_phone_number: phone,
              user_type: "service",
              user_logo: props.obj.uriPhotoLogo,
              user_Background: props.obj.uriPhotoBackground,
              description:"1 string,2 String,3 string ...."
            }),
          }
        );
        const json = await response.json();
        //setData(json.movies);
      } catch (error) {
        console.error(error);
      } finally {
        alert("Done Request");
      }
    }
  };

  useEffect(async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  });

  useEffect(() => {
    getMovies();
  }, [done]);

  const sendRequest = () => {
    setDone(!done);
  };

  const clearTextInput = () => {
    setFullName("");
    setPhone("");
    setPlace("");
  };

  const fetchUriLogoFromPhoto = (uri) => {
    setUriPhotoLogo(uri);
  };

  const fetchUriBackgroundFromPhoto = (uri) => {
    setUriPhotoBackground(uri);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity
          activeOpacity={100}
          onPress={Keyboard.dismiss}
          style={styles.container2}
        >
          <ImageBackground
            style={styles.image}
            source={require("../assets/Illustrator-Vector-Illustration-1.jpg")}
          />

          <StatusBar style="auto" />
          <View style={styles.bottomView}>
            <Button
              title="back"
              onPress={props.onPress.bind(this, "SelectScreenDash")}
            />
            

            <Input
              secureTextEntry={false}
              onChangeText={(val) => {
                setTalent(val.replace(/\s/g, ""));
              }}
              label="Talent"
            />
            <Input
              secureTextEntry={false}
              onChangeText={(val) => {
                setFullName(val);
              }}
              label="Full Name"
            />

            <Input
              secureTextEntry={false}
              onChangeText={(val) => {
                setPhone(val.replace(/\s/g, ""));
              }}
              label="Phone Number"
            />
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <Button
                title="DONE"
                icon={{
                  name: "check-circle",
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
                onPress={sendRequest}
              />
              <Button
                title="HOME"
                icon={{
                  name: "home",
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
                onPress={props.onPress.bind(this, "home")}
              />
            </View>
          </View>
        </TouchableOpacity>
        <StatusBar style="light" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 25,
    backgroundColor: "#fff",
  },
  container2: {
    flex: 1,
    marginTop: 25,
    backgroundColor: "#fff",
    alignItems: "center",
  },

  image: {
    marginBottom: 10,
    width: "100%",
    height: 200,
    marginBottom: 30,
  },

  inputView: {
    backgroundColor: "#E3CAA5",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,

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
    backgroundColor: "#CEAB93",
  },
  bottomView: {
    paddingTop: 30,
    paddingHorizontal: 30,
    width: "100%",
    flex: 1.5,
    backgroundColor: "#ffffffff",
    bottom: 50,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
  },
});
