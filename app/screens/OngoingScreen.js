import React from "react";
import { StyleSheet, Text, View, FlatList, Button } from "react-native";
import colors from "../config/colors";
import clr from "../config/clr";
import tempData from "./tempData";
import OngoingList from "../../components/OngoingList";
import firebase from "firebase";

for (var i = 0; i < tempData.length; i++) {
  tempData[i]["color"] = clr[i % 7];
}

export default class OngoingScreen extends React.Component {
  constructor(props) {
    super(props);
    var user = firebase.auth().currentUser;
    this.state = {
      datalist: [],
      uid: user.uid,
    };
  }
  async componentDidMount() {
    this.focusListener = this.props.navigation.addListener(
      "focus",
      async () => {
        await this.readdb();
        for (var i = 0; i < tempData.length; i++) {
          tempData[i]["color"] = clr[i % 7];
        }
      }
    );
  }
  async readdb() {
    var path = this.state.uid;
    await firebase
      .database()
      .ref(path)
      .once("value")
      .then(async (snapshot) => {
        var fl = [];
        var OB = Object.entries(snapshot.val());
        for (var i = 0; i < OB.length; i++) {
          OB[i][1]["color"] = clr[i % 7];
          fl.push(OB[i][1]);
        }
        await this.setState({
          datalist: fl,
        });
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.divider} />
          <Text style={styles.title}>
            Ongoing
            <Text> </Text>
            <Text style={{ fontWeight: "100", color: colors.blue }}>
              Converting
            </Text>
          </Text>
          <View style={styles.divider} />
        </View>

        <View style={{ height: 275, paddingLeft: 32 }}>
          <FlatList
            data={this.state.datalist}
            keyExtractor={(item) => item.name}
            horizontal={true}
            extraData={this.state.datalist}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <OngoingList list={item} />}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  divider: {
    backgroundColor: colors.lightBlue,
    height: 1,
    flex: 1,
    alignSelf: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.black,
    paddingHorizontal: 20,
  },
  addList: {
    borderWidth: 2,
    borderColor: colors.lightBlue,
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  add: {
    color: colors.blue,
    fontWeight: "600",
    fontSize: 14,
    marginTop: 8,
  },
});
