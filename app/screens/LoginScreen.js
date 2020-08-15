import React from "react";
import { ImageBackground, StyleSheet, View, Text, Button } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import firebase from "firebase";
import colors from "../config/colors";
import Fontisto from "react-native-vector-icons/Fontisto";
import Entypo from "react-native-vector-icons/Entypo";

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "email",
      password: "password",
      error: "",
      loading: false,
    };
    this.handleChangeemail = this.handleChangeemail.bind(this);
    this.handleChangepassword = this.handleChangepassword.bind(this);
  }

  OnLoginPress() {
    this.setState({
      error: "",
      loading: true,
    });

    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({
          error: "",
          loading: false,
        });
        this.props.navigation.navigate("TabNavigator");
      })
      .catch((e) => {
        this.setState({
          error: e.message,
          loading: false,
        });
        if (e.code == "auth/user-not-found") {
          alert("User not found, Create new account");
          this.props.navigation.navigate("Create");
        } else {
          alert(e.message);
        }
      });
  }

  OnSignUpPress() {
    this.props.navigation.navigate("Create");
  }

  handleChangeemail(newText) {
    this.setState({
      email: newText,
    });
  }
  handleChangepassword(newText) {
    this.setState({
      password: newText,
    });
  }

  render() {
    return (
      <View style={styles.background}>
        <View style={styles.Theme}>
          <Text style={styles.Title}>No Porn Deepfake</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.inputtogether}>
            <Fontisto
              style={{
                flex: 1,
                marginTop: 8,
                marginLeft: 10,
              }}
              name="email"
              size={35}
              color="#719AFE"
            />
            <TextInput
              style={styles.tinput}
              autoCompleteType="email"
              placeholder="email"
              onChangeText={this.handleChangeemail}
            ></TextInput>
          </View>
          <View style={styles.inputtogether}>
            <Entypo
              style={{
                flex: 1,
                marginTop: 8,
                marginLeft: 10,
              }}
              name="lock"
              size={35}
              color="#719AFE"
            />
            <TextInput
              style={styles.tinput}
              secureTextEntry
              placeholder="password"
              onChangeText={this.handleChangepassword}
            ></TextInput>
          </View>
          <TouchableOpacity
            style={styles.buttonL}
            onPress={() => {
              this.OnLoginPress();
            }}
          >
            <Text>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signup}>
          <Text>Don't have account?</Text>
          <Text> </Text>
          <TouchableOpacity
            style={styles.buttonS}
            onPress={() => {
              this.OnSignUpPress();
            }}
          >
            <Text style={{ color: colors.blue }}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "white",
  },
  Theme: {
    flex: 2,
    top: 70,
    alignItems: "center",
  },
  signup: {
    flex: 1,
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
  },
  Title: {
    color: "black",
    fontSize: 30,
    fontWeight: "100",
    fontWeight: "bold",
  },
  inputtogether: {
    flexDirection: "row",
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: "#719AFE",
    marginVertical: 5,
    marginHorizontal: 20,
    borderRadius: 30,
    padding: 1,
    alignSelf: "stretch",
  },
  form: {
    flex: 4,
  },
  tinput: {
    flex: 6,
    marginVertical: 5,
    marginRight: 5,
    height: 40,
    color: "#719AFE",
    borderColor: colors.r1,
    borderRadius: 4,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
  },
  buttonL: {
    borderWidth: 1,
    height: 50,
    borderColor: colors.c3,
    marginTop: 15,
    marginHorizontal: 40,
    marginBottom: 30,
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
  },
  buttonS: {
    height: 50,
    borderColor: colors.c3,
    alignItems: "flex-end",
    alignSelf: "stretch",
  },
});
