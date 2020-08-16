import React, { Component } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";

export default class Mainpage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
    };
  }

  render() {
    return (
      <View>
        <Text>History</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
