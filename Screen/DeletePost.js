import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  Button,
  CheckBox,
  Header,
  Icon,
  SearchBar,
} from "react-native-elements";
import {
  Card,
  CardAction,
  CardButton,
  CardContent,
  CardImage,
  CardTitle,
} from "react-native-cards";

import React from "react";
import axios from "axios";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const DeletePost = (props) => {
  const [data, setData] = React.useState([]);
  const [filter, seFilter] = React.useState([]);
  const [count, setCount] = React.useState();
  const [check2, setCheck2] = React.useState(false);
  const [check1, setCheck1] = React.useState(true);
  const [search, setSearch] = React.useState("");
  const [type, setType] = React.useState("sellers");
  const [isLoading, setIsLoading] = React.useState(false);

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

  const DeleteUnq = async (id) => {
    console.log(id);

    switch (type) {
      case "sellers":
        {
          response = await fetch(
            `https://jor-pipeline-6a736-default-rtdb.firebaseio.com/posts/seller/Hijjawi/${id}.json`,
            {
              method: "DELETE",
            }
          );
        }
        break;
      case "services":
        {
          response = await fetch(
            `https://jor-pipeline-6a736-default-rtdb.firebaseio.com/posts/service/${id}.json`,
            {
              method: "DELETE",
            }
          );
        }
        break;
      default:
        {
          response = await fetch(
            `https://jor-pipeline-6a736-default-rtdb.firebaseio.com/posts/seller/hijawii/${id}.json`,
            {
              method: "DELETE",
            }
          );
        }
        break;
    }
    setCount(count + 1);
    alert("Delete done");
  };
  const renderItem = ({ item }) => (
    <Item
      title={item.id}
      name={item.owner_name}
      image={item.post_images}
      des={item.post_description}
      price={item.post_price}
      talent={item.owner_talent}
    />
  );
  const Item = ({ title, name, image, des, price, talent }) => (
    <View
      style={{
        paddingTop: 5,
        backgroundColor: "#393e42",
        flex: 1,
        borderRadius: 25,
      }}
    >
      <Card >
        <CardImage source={{ uri: image }} title={name} />
        <CardTitle
          subtitle={type === "sellers" ? `${price} JD` : `${talent}`}
        />
        <CardContent text={des} />
        <CardAction separator={true} inColumn={false}>
          <CardButton
            onPress={DeleteUnq.bind(this, title)}
            title="Delete"
            color="#fc3438"
          />
        </CardAction>
      </Card>
    </View>
  );
  React.useEffect(async () => {
    setIsLoading(true);
    let response;
    switch (type) {
      case "sellers":
        {
          response = await fetch(
            `https://jor-pipeline-6a736-default-rtdb.firebaseio.com/posts/seller/Economics.json`
          );
        }
        break;
      case "services":
        {
          response = await fetch(
            `https://jor-pipeline-6a736-default-rtdb.firebaseio.com/posts/service.json`
          );
        }
        break;
      default:
        {
          response = await fetch(
            `https://jor-pipeline-6a736-default-rtdb.firebaseio.com/posts/seller/Economics.json`
          );
        }
        break;
    }

    const resData = await response.json();
    console.log(resData);
    const loadedPost = [];
    setIsLoading(false);
    for (const key in resData) {
      type === "sellers"
        ? loadedPost.push({
            id: key,
            owner_id: resData[key].owner_id,
            owner_name: resData[key].owner_name,
            post_description: resData[key].post_description,
            post_images: resData[key].post_images[0],
            post_price: resData[key].post_price,
            post_title: resData[key].post_title,
          })
        : loadedPost.push({
            id: key,
            owner_id: resData[key].owner_id,
            owner_name: resData[key].owner_name,
            post_description: resData[key].post_description,
            post_images: resData[key].post_images[0],
            owner_talent: resData[key].owner_talent,
            post_title: resData[key].post_title,
          });
    }
    setData(loadedPost.slice());
    seFilter(loadedPost.slice());
    console.log(data);
  }, [count, type]);
  const updateSearch = (text) => {
    if (text) {
      const newData = data.filter((item) => {
        const itemData = item.owner_name
          ? item.owner_name.toUpperCase()
          : "".toLowerCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      seFilter(newData);
      setSearch(text);
    } else {
      seFilter(data);
      setSearch(text);
    }
  };

  if (isLoading) {
    return (
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: "rgba(189,198,207,0.8)",
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
      >
        <ActivityIndicator color="#fff" animating size="large" />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Header
          lightTheme={true}
          backgroundColor="#393e42"
          leftComponent={{
            icon: "west",
            color: "#fff",
            onPress: props.onPress.bind(this, "SelectScreenDash"),
          }}
          centerComponent={{ text: "DELETE POST", style: { color: "#fff" } }}
          rightComponent={{}}
        />
      </View>
      <View style={styles.searchBar}>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={(text) => updateSearch(text)}
          value={search}
        />
      </View>
      <View style={styles.switch}>
        <CheckBox
          title="Sellers Post"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={check1}
          onPress={() => check("1")}
        />

        <CheckBox
          title="Service Post"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={check2}
          onPress={() => check("2")}
        />
      </View>
      <View style={styles.listView}>
        <FlatList
          data={filter}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor:'#393e42'
  },
  header: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#393e42",
    
    justifyContent: "space-between",
  },
  searchBar: {
    width: "100%",
    height: 65,
    backgroundColor: "#393e42",
    
  },
  switch: {
    width: "100%",
    height: 55,
    flexDirection: "row",
    backgroundColor: "#393e42",
    justifyContent: "space-between",
  },
  listView: {
    flex: 1,
    backgroundColor: "#393e42",
  },
});

export default DeletePost;
