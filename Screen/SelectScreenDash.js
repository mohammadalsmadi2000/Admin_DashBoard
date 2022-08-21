import {
  Alert,
  BackHandler,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Component } from "react";

import { Header } from "react-native-elements";
import { StatusBar } from "expo-status-bar";

export default class SelectScreenDash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 1,
          title: "Add User",
          image:
            "https://firebasestorage.googleapis.com/v0/b/jor-pipeline-6a736.appspot.com/o/DashApp_DontTouchThisFile%2FaddUser.png?alt=media&token=add7e231-34b6-46cd-8f3a-e441cbbf6171",
        },
        {
          id: 2,
          title: "Ads",
          image:
            "https://firebasestorage.googleapis.com/v0/b/jor-pipeline-6a736.appspot.com/o/DashApp_DontTouchThisFile%2Fads.png?alt=media&token=4a52d57d-2f34-4dba-a45c-bdc716d7c014",
        },
        {
          id: 3,
          title: "Event",
          image:
            "https://firebasestorage.googleapis.com/v0/b/jor-pipeline-6a736.appspot.com/o/DashApp_DontTouchThisFile%2Fevent.png?alt=media&token=25644573-cf1e-4ece-93e3-6d0d7576338e",
        },
        {
          id: 4,
          title: "Delete Post",
          image:
            "https://firebasestorage.googleapis.com/v0/b/jor-pipeline-6a736.appspot.com/o/DashApp_DontTouchThisFile%2Fdelete.png?alt=media&token=7261ef73-db5e-4fc8-b45d-329745993d1d",
        },
        {
          id: 5,
          title: "Block User",
          image:
            "https://firebasestorage.googleapis.com/v0/b/jor-pipeline-6a736.appspot.com/o/DashApp_DontTouchThisFile%2Fblock.png?alt=media&token=5d8e3f8d-090c-46b6-aab7-f2261e1c3ce4",
        },
        {
          id: 6,
          title: "Analytics",
          image:
            "https://firebasestorage.googleapis.com/v0/b/jor-pipeline-6a736.appspot.com/o/DashApp_DontTouchThisFile%2Fanalayes.png?alt=media&token=c227eb2f-d5a6-4d3b-b53a-356724cf6ec5",
        },
        {
          id: 7,
          title: "More",
          image:
            "https://firebasestorage.googleapis.com/v0/b/jor-pipeline-6a736.appspot.com/o/DashApp_DontTouchThisFile%2Fmore.png?alt=media&token=f29cc1f3-f5a9-48a9-a159-d09e65d53d19",
        },
      ],
    };
  }

  backAction = () => {
    Alert.alert("Exit the app!", "Are you sure you want to exit the app?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  };

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.backAction
    );
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  clickEventListener(item) {
    if (item.id > 4) {
      Alert.alert(item.title);
    } else {
      this.props.onPress(item.title);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <Header
          lightTheme={true}
          backgroundColor="#393e42"
          leftComponent={{
          
          }}
          centerComponent={{ text: "DASHBOARD", style: { color: "#fff" } }}
          rightComponent={{}}
        />
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={this.state.data}
          horizontal={false}
          numColumns={2}
          keyExtractor={(item) => {
            return item.id;
          }}
          renderItem={({ item }) => {
            return (
              <View>
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => {
                    this.clickEventListener(item);
                  }}
                >
                  <Image
                    style={styles.cardImage}
                    source={{ uri: item.image }}
                  />
                </TouchableOpacity>

                <View style={styles.cardHeader}>
                  <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <Text style={styles.title}>{item.title}</Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: "#393e42",
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor: "#393e42",
  },
  listContainer: {
    alignItems: "center",
  },
  /******** card **************/
  card: {
    shadowColor: "#474747",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    marginVertical: 20,
    marginHorizontal: 40,
    backgroundColor: "#e2e2e2",
    //flexBasis: '42%',
    width: 120,
    height: 120,
    borderRadius: 60,
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
    color: "#fff",
  },
});
