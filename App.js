import React from "react";

import { StyleSheet, StatusBar } from "react-native";

import MainScreen from "./app/screens/MainScreen";
import OngoingScreen from "./app/screens/OngoingScreen";
import ProfileScreen from "./app/screens/ProfileScreen";
import SelectScreen from "./app/screens/SelectScreen";
import LoginScreen from "./app/screens/LoginScreen";
import CreateScreen from "./app/screens/CreateScreen";
import Intro from "./app/screens/Intro";
//import Mainpage from "./app/screens/Mainpage";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import { firebaseConfig } from "./app/config/firebaseconfig";
import firebase from "firebase";
import * as Permissions from "expo-permissions";

const Main = createStackNavigator();
const TabNavigator = createBottomTabNavigator();
firebase.initializeApp(firebaseConfig);

function SettingsTabs() {
  return (
    <TabNavigator.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === "Main") {
            return <FontAwesome5 name="home" color={color} size={size} />;
          } else if (route.name === "Ongoing") {
            return <FontAwesome5 name="tasks" color={color} size={size} />;
          } else {
            return <FontAwesome5 name="user" color={color} size={size} />;
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: "#23A6D9",
        inactiveTintColor: "gray",
      }}
    >
      <TabNavigator.Screen name="Main" component={MainScreen} />
      <TabNavigator.Screen name="Ongoing" component={OngoingScreen} />
      <TabNavigator.Screen name="Profile" component={ProfileScreen} />
    </TabNavigator.Navigator>
  );
}

export default class App extends React.Component {
  async componentDidMount() {
    const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (permission.status !== "granted") {
      const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (newPermission.status === "granted") {
        console.log("Permission Granted");
      }
    }
  }
  render() {
    return (
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        <Main.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Main.Screen name="Intro" component={Intro} />
          <Main.Screen name="Login" component={LoginScreen} />
          <Main.Screen name="Select" component={SelectScreen} />
          <Main.Screen name="Create" component={CreateScreen} />
          <Main.Screen name="TabNavigator" component={SettingsTabs} />
        </Main.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
});
