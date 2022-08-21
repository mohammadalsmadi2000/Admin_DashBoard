import {
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Button, ButtonGroup, withTheme } from "react-native-elements";
import { CheckBox, Icon } from "react-native-elements";
import React, { useState } from "react";
import { Tooltip, colors } from "react-native-elements";

import { Input } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import UploadPhotoToDB from "../Components/UploadPhotoToDB";

const Ads = (props) => {
  const [uriPhotoLogo, setUriPhotoLogo] = useState("no");
  const [value, setValue] = React.useState("");
  const [fullName, setFullName] = useState("1");
  const [check2, setCheck2] = useState(true);
  const [check1, setCheck1] = useState(false);
  const [type, setType] = useState("services");
  const check = (C) => {
    if (C === "1") {
      
      setCheck2(false);
      setCheck1(true);
      setType("sellers");
    } else if (C === "2") {
      setCheck1(false);
      setCheck2(true);
      setType("services");
    }
  };
  const sendReq = async () => {
    try {
      const response = await fetch(
        `https://jor-pipeline-6a736-default-rtdb.firebaseio.com/Ads/${type}.json`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            Ads_image_uri: uriPhotoLogo,
            description: fullName,
            type:type
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
  };
  const fetchUriLogoFromPhoto = (uri) => {
    setUriPhotoLogo(uri);
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#ffffffff" }}
      showsVerticalScrollIndicator={false}
    >
      <ImageBackground
        source={require("../assets/ad-serving-add-on-creatopy-1024x576.png")}
        style={{ height: Dimensions.get("window").height / 2.5 }}
      >
        <View></View>
        <View style={{paddingLeft:5,paddingTop:25}} >
        <Icon
            raised
            name="arrow-left"
            type="font-awesome"
            color="rgba(78, 116, 289, 1)"
            onPress={props.onPress.bind(this, "SelectScreenDash")}
          />
        </View>
        <View style={styles.brandView}></View>
      </ImageBackground>
      <View style={styles.bottomView}>
        <View style={{ padding: 25 }}>
          <View style={{ alignItems: "center" }}>
            <Text>ADD ADs</Text>
          </View>
          <View style={{ marginHorizontal: 100 }}>
            <UploadPhotoToDB
              uid={"Ads"}
              onUri={fetchUriLogoFromPhoto}
              title="Pick an image Ads"
              type="Admin."
            />
          </View>
        <View style={{marginTop:20}} >
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
          <Input
            multiline={true}
            numberOfLines={4}
            secureTextEntry={false}
            onChangeText={(val) => {setFullName(val)}}
            label="Description"
            textAlignVertical="top"
          />
          </View>
         {uriPhotoLogo==="no"?<Text style={{color:'red'}} >*Please confirm the photo to be able to upload the ad</Text>:null}
          <Button
            disabled={uriPhotoLogo==="no"?true:false}
            title="Upload"
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
            onPress={sendReq}
          />
        </View>
      </View>
      <StatusBar style="light" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  brandView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  brandViewText: {
    color: "#ffffffff",
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
  },
  container: {
    flexDirection: "row",
  },
  input: {
    flex: 1,
    margin: 2,
  },
});

export default Ads;
