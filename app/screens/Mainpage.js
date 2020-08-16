import React, { Component } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import LinearGradient from "expo-linear-gradient";
import firebase from "firebase";

export default class Mainpage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
    };
  }

  render() {
    const user = firebase.auth().currentUser;
    const email = user.email;
    const name = email.split("@")[0];
    return (
      <View style={styles.container}>
        <View style={styles.toplayer}>
          <Image
            source={require("../Images/Avatar.jpg")}
            style={styles.avatar}
          />
          <Text
            style={styles.Username}
            onPress={() => {
              this.props.navigation.navigate("Profile");
            }}
          >
            {" "}
            {name}
          </Text>
        </View>
        <View style={styles.middlelayer}>
          <View style={styles.rectangle}>
            <Text
              style={styles.ongoing}
              onPress={() => {
                this.props.navigation.navigate("Ongoing");
              }}
            >
              Process Duration
            </Text>
            <Text style={styles.dd}>
              <Text style={styles.inside1}>Time </Text>
              <Text style={styles.inside2}>4:23:07</Text>
            </Text>
          </View>
        </View>
        <View style={styles.bottomlayer}>
          <View style={styles.big_rectangle}>
            <Text
              style={styles.history}
              onPress={() => {
                this.props.navigation.navigate("History");
              }}
            >
              History
            </Text>
            <Text style={styles.num}> number of request </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Select");
            }}
            style={styles.buttonL}
          >
            <Text style={styles.signin}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: "#FFF",
  },

  //second layer

  avatar: {
    marginLeft: 20,
  },

  toplayer: {
    flex: 2,
    marginTop: 30,
    marginBottom: 50,
  },
  middlelayer: {
    flex: 2,
    marginTop: 50,
  },
  bottomlayer: {
    flex: 2.5,
    marginBottom: 40,
  },

  Username: {
    top: 30,
    fontSize: 30,
    textAlign: "center",
    marginBottom: 20,
  },
  avatar: {
    marginTop: 30,
    alignSelf: "center",
    marginBottom: 10,
  },
  dd: {
    marginLeft: 30,
  },
  rectangle: {
    borderRadius: 30,
    backgroundColor: "#F4F5F6",
    alignSelf: "stretch",
    marginHorizontal: 30,
    height: "80%",
  },
  ongoing: {
    padding: 15,
    left: 55,
    fontSize: 25,
  },
  big_rectangle: {
    borderRadius: 30,
    backgroundColor: "#F4F5F6",
    marginHorizontal: 30,
    alignSelf: "stretch",
    marginBottom: 10,
    height: "70%",
  },
  history: {
    fontSize: 30,
    padding: 15,
    left: 25,
  },
  lastweek: {
    fontSize: 15,
    left: 260,
    bottom: 45,
  },
  inside1: {
    marginLeft: 30,
    fontSize: 20,
    color: "gray",
    textAlign: "center",
  },
  inside2: {
    bottom: 24,
    fontSize: 30,
    left: 180,
    paddingRight: 15,
  },
  buttonL: {
    borderWidth: 1,
    height: 50,
    backgroundColor: "#2D31AC",
    marginTop: 15,
    marginHorizontal: 40,
    marginBottom: 30,
    borderRadius: 30,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    alignSelf: "stretch",
  },
  signin: {
    fontSize: 20,
    color: "white",
  },

  num: {
    fontSize: 20,
    marginLeft: 30,
  },
});
