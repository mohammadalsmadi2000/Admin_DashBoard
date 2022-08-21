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

import DateTimePicker from "@react-native-community/datetimepicker";
import { Input } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import UploadPhotoToDB from "../Components/UploadPhotoToDB";

const Event = (props) => {
  const [uriPhotoLogo, setUriPhotoLogo] = useState("no");
  const [value, setValue] = React.useState("");
  const [fullName, setFullName] = useState("1");
  const [eventName, setEventName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date(1598051730000));
  const [date2, setDate2] = useState(new Date(1598051720000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    mode==="date"?setDate(currentDate):setDate2(currentDate); 
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const sendReq = async () => {
    try {
      const response = await fetch(
        `https://jor-pipeline-6a736-default-rtdb.firebaseio.com/Event.json`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            Ads_image_uri: uriPhotoLogo,
            description: fullName,
            time: `${date.getHours().toLocaleString()}:${date
              .getMinutes()
              .toLocaleString()}`,
            Date: `${date2.getFullYear().toLocaleString()}/${date2
              .getMonth()
              .toLocaleString()}/${date2.getDay().toLocaleString()}`,
            Location: location,

            Event_name: eventName,
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
        source={require("../assets/varga-social-media-ads-img-04.png")}
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
            <Text>ADD Event</Text>
          </View>
          <View style={{ marginHorizontal: 100 }}>
            <UploadPhotoToDB
              uid={"Event"}
              onUri={fetchUriLogoFromPhoto}
              title="Pick an image Ads"
              type="Admin."
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            <View>
              <Button onPress={showDatepicker} title="Set date!" />
            </View>
            <View style={{ paddingHorizontal: 5 }}>
              <Button onPress={showTimepicker} title="Set time!" />
            </View>
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={mode==="date"?date:date2}
              mode={mode}
              is24Hour={true}
              onChange={onChange}
            />
          )}
          <View style={{ marginTop: 20 }}>
            <Input
              secureTextEntry={false}
              onChangeText={(val) => {
                setEventName(val);
              }}
              label="Event Name"
              textAlignVertical="top"
            />
            <Input
              multiline={true}
              numberOfLines={4}
              secureTextEntry={false}
              onChangeText={(val) => {
                setFullName(val);
              }}
              label="Description"
              textAlignVertical="top"
            />

            <Input
              secureTextEntry={false}
              onChangeText={(val) => {
                setLocation(val);
              }}
              label="Location"
              textAlignVertical="top"
            />
          </View>
          {uriPhotoLogo === "no" ? (
            <Text style={{ color: "red" }}>
              *Please confirm the photo to be able to upload the ad
            </Text>
          ) : null}
          <Button
            disabled={uriPhotoLogo === "no" ? true : false}
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

export default Event;
