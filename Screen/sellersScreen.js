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
import { List, Snackbar } from "react-native-paper";
import React, { useEffect, useState } from "react";

import { Button } from "react-native-elements";
import { Header } from "react-native-elements";
import { Input } from "react-native-elements";
import { StatusBar } from "expo-status-bar";

export default function sellers(props) {
  //state section
  const [expanded, setExpanded] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const handlePress = () => setExpanded(!expanded);
  const [place, setPlace] = useState("1");
  const [fullName, setFullName] = useState("1");
  const [phone, setPhone] = useState("1");
  const [done, setDone] = useState(false);
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [uid, setUid] = useState(props.obj.uid);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uriPhotoLogo, setUriPhotoLogo] = useState("");
  const [college, setCollege] = useState("Hijjawi");
  const [uriPhotoBackground, setUriPhotoBackground] = useState("");
  //http request
  useEffect(async () => {
    console.log(props.obj.uid);
    setUid(props.obj.uid);
  }, []);
  const Colleges = [
    "Hijjawi",
    "Pharmacy",
    "medicine",
    "Sharia and Islamic Studies",
    "Media",
    "Fine Arts",
    "Literature",
    "Science",
    "Economics",
    "Education",
    "Physical",
    "It",
    "Archeology and Anthropology",
    "Tourism and Hotels",
  ];

  const ss = () => {};
  const getMovies = async () => {
    if (place && fullName && phone === "1") {
      null;
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
              place: college,
              user_full_name: fullName,
              user_id: uid,
              user_phone_number: phone,
              user_type: "seller",
              user_logo: props.obj.uriPhotoLogo,
              user_Background: props.obj.uriPhotoBackground,
              description: description,
            }),
          }
        );
        const json = await response.json();
      } catch (error) {
        console.error(error);
      } finally {
        onToggleSnackBar();
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

  return (
    <View style={{ flex: 1 }}>
      <Header
        lightTheme={true}
        backgroundColor="#393e42"
        leftComponent={{}}
        centerComponent={{ text: "SELLER INFO", style: { color: "#fff" } }}
        rightComponent={{}}
      />
      <View style={styles.container}>
        <ScrollView>
          <TouchableOpacity
            activeOpacity={100}
            onPress={Keyboard.dismiss}
            style={styles.container2}
          >
            <ImageBackground
              style={styles.image}
              source={require("../assets/3214373.jpg")}
            />

            <View style={styles.bottomView}>
              <Input
                secureTextEntry={false}
                onChangeText={(val) => {
                  setFullName(val);
                }}
                label="Full Name"
                style={{ color: "#fff" }}
                placeholderTextColor="#fff"
              />

              <Input
                secureTextEntry={false}
                onChangeText={(val) => {
                  setPhone(val.replace(/\s/g, ""));
                }}
                label="Phone Number"
              />
              <Input
                multiline={true}
                numberOfLines={4}
                secureTextEntry={false}
                onChangeText={(val) => {
                  setDescription(val);
                }}
                label="Description"
                textAlignVertical="top"
              />
              <List.Section title="Colleges" titleStyle={{ color: "#fff" }}>
                <List.Accordion
                  title={college}
                  titleStyle={{ color: "#fff" }}
                  expanded={expanded}
                  onPress={handlePress}
                  style={{ backgroundColor: "#393e42" }}
                >
                  <List.Item
                    titleStyle={{ color: "#fff" }}
                    title={Colleges[0]}
                    onPress={() => {
                      setCollege(Colleges[0]);
                      handlePress();
                    }}
                  />
                  <List.Item
                    titleStyle={{ color: "#fff" }}
                    title={Colleges[1]}
                    onPress={() => {
                      setCollege(Colleges[1]);
                      handlePress();
                    }}
                  />
                  <List.Item
                    titleStyle={{ color: "#fff" }}
                    title={Colleges[2]}
                    onPress={() => {
                      setCollege(Colleges[2]);
                      handlePress();
                    }}
                  />
                  <List.Item
                    titleStyle={{ color: "#fff" }}
                    title={Colleges[3]}
                    onPress={() => {
                      setCollege(Colleges[3]);
                      handlePress();
                    }}
                  />
                  <List.Item
                    titleStyle={{ color: "#fff" }}
                    title={Colleges[4]}
                    onPress={() => {
                      setCollege(Colleges[4]);
                      handlePress();
                    }}
                  />
                  <List.Item
                    titleStyle={{ color: "#fff" }}
                    title={Colleges[5]}
                    onPress={() => {
                      setCollege(Colleges[5]);
                      handlePress();
                    }}
                  />
                  <List.Item
                    titleStyle={{ color: "#fff" }}
                    title={Colleges[6]}
                    onPress={() => {
                      setCollege(Colleges[6]);
                      handlePress();
                    }}
                  />
                  <List.Item
                    titleStyle={{ color: "#fff" }}
                    title={Colleges[7]}
                    onPress={() => {
                      setCollege(Colleges[7]);
                      handlePress();
                    }}
                  />
                  <List.Item
                    titleStyle={{ color: "#fff" }}
                    title={Colleges[8]}
                    onPress={() => {
                      setCollege(Colleges[8]);
                      handlePress();
                    }}
                  />
                  <List.Item
                    titleStyle={{ color: "#fff" }}
                    title={Colleges[9]}
                    onPress={() => {
                      setCollege(Colleges[9]);
                      handlePress();
                    }}
                  />
                  <List.Item
                    titleStyle={{ color: "#fff" }}
                    title={Colleges[10]}
                    onPress={() => {
                      setCollege(Colleges[10]);
                      handlePress();
                    }}
                  />
                  <List.Item
                    titleStyle={{ color: "#fff" }}
                    title={Colleges[11]}
                    onPress={() => {
                      setCollege(Colleges[11]);
                      handlePress();
                    }}
                  />
                  <List.Item
                    titleStyle={{ color: "#fff" }}
                    title={Colleges[12]}
                    onPress={() => {
                      setCollege(Colleges[12]);
                      handlePress();
                    }}
                  />
                  <List.Item
                    titleStyle={{ color: "#fff" }}
                    title={Colleges[13]}
                    onPress={() => {
                      setCollege(Colleges[13]);
                      handlePress();
                    }}
                  />
                  <List.Item
                    titleStyle={{ color: "#fff" }}
                    title={Colleges[14]}
                    onPress={() => {
                      setCollege(Colleges[14]);
                      handlePress();
                    }}
                  />
                </List.Accordion>
              </List.Section>

              <View style={{ width: "100%" }}></View>
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
                    color: "#393e42",
                  }}
                  iconRight
                  iconContainerStyle={{ marginLeft: 10 }}
                  titleStyle={{ fontWeight: "700", color: "#393e42" }}
                  buttonStyle={{
                    backgroundColor: "#f8f9fa",
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
                    color: "#393e42",
                  }}
                  iconRight
                  iconContainerStyle={{ marginLeft: 10 }}
                  titleStyle={{ fontWeight: "700", color: "#393e42" }}
                  buttonStyle={{
                    backgroundColor: "#f8f9fa",
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
        <Snackbar
          visible={visible}
          onDismiss={onDismissSnackBar}
          style={{ backgroundColor: "#fff" }}
        >
          <Text style={{ color: "black" }}> Add User Done.</Text>
        </Snackbar>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff",
  },
  container2: {
    flex: 1,

    backgroundColor: "#393e42",
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
    backgroundColor: "#393e42",
    bottom: 50,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
  },
});
