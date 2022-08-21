import { Button, CheckBox, Header, Icon } from "react-native-elements";
import {
  Dimensions,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";

import { StatusBar } from "expo-status-bar";
import UploadPhotoToDB from "../Components/UploadPhotoToDB";

const UploadImageDBScreen = (props) => {
  const [uid, setUid] = useState(props.obj.uid);
  const [uriPhotoLogo, setUriPhotoLogo] = useState("no");
  const [uriPhotoBackground, setUriPhotoBackground] = useState("no");
  const object = {
    email: props.obj.email,
    password: props.obj.password,
    screen: props.obj.type,
    type: props.obj.type,
    uid: props.obj.uid,
    uriPhotoLogo: uriPhotoLogo,
    uriPhotoBackground: uriPhotoBackground,
  };

  const fetchUriLogoFromPhoto = (uri) => {
    setUriPhotoLogo(uri);
  };

  const fetchUriBackgroundFromPhoto = (uri) => {
    setUriPhotoBackground(uri);
  };

  console.log(`from UploadImage${props.obj.uid}`);

  return (
    <View style={{ flex: 1 }}>
      <Header
        lightTheme={true}
        backgroundColor="#393e42"
        leftComponent={{}}
        centerComponent={{ text: "UPLOAD IMAGE", style: { color: "#fff" } }}
        rightComponent={{}}
      />
      <ScrollView
        style={{ flex: 1, backgroundColor: "#393e42" }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flexDirection: "row" ,flex:1,marginTop:15}}>
          <View style={{ flex: 1, alignItems: "center",height:Dimensions.get('screen').height/2-20,paddingHorizontal:5 }}>
            <Text style={{ color: "#fff" }}>Add Logo</Text>

            <UploadPhotoToDB
              uid={uid}
              onUri={fetchUriLogoFromPhoto}
              title="Pick an image Logo"
              type="Logo"
            />
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <View>
              <Text style={{ color: "#fff" }}>Add Background</Text>
            </View>
            <UploadPhotoToDB
              uid={uid}
              onUri={fetchUriBackgroundFromPhoto}
              title="Pick an image Background"
              type="Background"
            />
          </View>
        </View>
        <View style={{ alignItems: "center", paddingHorizontal: 5,flex:1 }}>
          <View>
            {uriPhotoLogo && uriPhotoBackground === "no" ? (
              <Text style={{ color: "red" }}>
                *Please confirm the photo to be able to Next Step
              </Text>
            ) : null}
          </View>
          
          <Button
            disabled={
              uriPhotoLogo === "no" || uriPhotoBackground === "no"
                ? true
                : false
            }
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
            onPress={props.onPress.bind(this, object)}
          />
        </View>
        <StatusBar style="light" />
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

export default UploadImageDBScreen;
