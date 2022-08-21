import * as Clipboard from "expo-clipboard";
import * as ImagePicker from "expo-image-picker";

import {
  ActivityIndicator,
  Button,
  Image,
  LogBox,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import uuid from "uuid";

const UploadPhotoToDB = (props) => {
  const [image, setImage] = useState(null);
  const [uploading, seUploading] = useState(null);
  const [uid, setUid] = useState(props.uid);

  const uploadImageAsync = async (uri, uid, type) => {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const fileRef = ref(getStorage(), `${uid}/${type}/image`);
    const result = await uploadBytes(fileRef, blob);

    // We're done with the blob, close and release it
    blob.close();

    return await getDownloadURL(fileRef);
  };

  useEffect(async () => {
    setUid(props.uid);
    console.log(`from photo : ${uid}`);

    console.log(`from photo state : ${uid}`);
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  }, []);

  const _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      
    });
    _handleImagePicked(pickerResult);
  };

  const _maybeRenderImage = () => {
    if (!image) {
      return;
    }
    return (
      <View
        style={{
          width: 150,
          borderRadius: 3,
          elevation: 5,
        }}
      >
        <View
          style={{
            borderColor: "#000",
            borderWidth: 1.5,
            borderTopRightRadius: 3,
            borderTopLeftRadius: 3,
            shadowColor: "rgba(0,0,0,1)",
            shadowOpacity: 0.2,
            shadowOffset: { width: 4, height: 4 },
            shadowRadius: 5,
            overflow: "hidden",
          }}
        >
          <Image source={{ uri: image }} style={{ width: 150, height: 150 }} />
        </View>
        <Button title="Confirm" onPress={props.onUri.bind(this, image)} />
      </View>
    );
  };

  const _maybeRenderUploadingOverlay = () => {
    if (uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "rgba(0,0,0,0.1)",
              alignItems: "center",
              justifyContent: "center",
              height: 150,
            },
          ]}
        >
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  const _copyToClipboard = () => {
    Clipboard.setString(image);
    alert("Copied image URL to clipboard");
  };

  const _share = () => {
    Share.share({
      message: image,
      title: "Check out this photo",
      url: image,
    });
  };

  const _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    _handleImagePicked(pickerResult);
  };

  const _handleImagePicked = async (pickerResult) => {
    try {
      seUploading(true);
      () => props.onUri(image);
      if (!pickerResult.cancelled) {
        const uploadUrl = await uploadImageAsync(
          pickerResult.uri,
          uid,
          props.type
        );

        setImage(uploadUrl);
      }
    } catch (e) {
      console.log(e);
      alert("Upload failed, sorry :(");
    } finally {
      seUploading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {uploading ? (
        <TouchableOpacity style={{...styles.card,width:120}} onPress={_pickImage}>
          <ActivityIndicator color="black" animating size="large" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.card} onPress={_pickImage}>
          <Text>{props.title}</Text>
        </TouchableOpacity>
      )}

      {_maybeRenderImage()}

      <StatusBar barStyle="default" />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: "#474747",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    marginVertical: 5,
    marginHorizontal: 5,
    backgroundColor: "#e2e2e2",
    //flexBasis: '42%',
   
    height: 70,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    height: 50,
    width: 50,
    alignSelf: "center",
  },
  title: {
    fontSize: 18,
    flex: 1,
    alignSelf: "center",
    color: "#696969",
  },
});

export default UploadPhotoToDB;
