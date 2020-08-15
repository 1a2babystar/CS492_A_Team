import React from "react";
import { StyleSheet, View, Button, TouchableOpacity, Text } from "react-native";
import colors from "../config/colors";
import firebase from "firebase";
import { TextInput } from "react-native-gesture-handler";
import Fontisto from "react-native-vector-icons/Fontisto";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";

export default class CreateScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "email",
      password: "password",
      passwordconfirm: "confirm password",
    };
    this.handleChangeemail = this.handleChangeemail.bind(this);
    this.handleChangepassword = this.handleChangepassword.bind(this);
    this.handleChangePasswordConfirm = this.handleChangePasswordConfirm.bind(
      this
    );
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
  handleChangePasswordConfirm(newText) {
    this.setState({
      passwordconfirm: newText,
    });
  }
  async OnSignUpPress() {
    this.setState({
      error: "",
      loading: true,
    });

    if (!(this.state.password === this.state.passwordconfirm)) {
      alert("Password confirm failed!!");
      await this.setState({
        password: "",
        passwordconfirm: "",
      });
      return;
    }

    const { email, password } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({
          error: "",
          loading: false,
        });
        this.props.navigation.navigate("Login");
      })
      .catch(() => {
        this.setState({
          error: "Authentification failed",
          loading: false,
        });
        alert(this.state.error);
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backbutton}
          onPress={() => {
            this.props.navigation.navigate("Login");
          }}
        >
          <View style={styles.titleBar}>
            <AntDesign name="back" size={28} color="#52575D" />
          </View>
        </TouchableOpacity>
        <View style={styles.Theme}>
          <Text style={styles.Title}>Create Account</Text>
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
              placeholder="password confirm"
              onChangeText={this.handleChangePasswordConfirm}
            ></TextInput>
          </View>
          <TouchableOpacity
            style={styles.buttonS}
            onPress={() => {
              this.OnSignUpPress();
            }}
          >
            <Text>Create</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Title: {
    color: "black",
    fontSize: 30,
    fontWeight: "100",
    fontWeight: "bold",
  },
  Theme: {
    flex: 1,
    top: 70,
    alignItems: "center",
  },
  backbutton: {
    flex: 1,
    position: "absolute",
    top: 20,
    left: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignContent: "center",
    justifyContent: "space-evenly",
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  text: {
    color: "#161924",
    fontSize: 20,
    fontWeight: "500",
  },
  button: {
    marginTop: 32,
    backgroundColor: "#FFF",
    paddingVertical: 12,
    width: 250,
    borderRadius: 12,
    alignItems: "center",
  },
  inputtogether: {
    flexDirection: "row",
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: "#719AFE",
    marginVertical: 15,
    marginHorizontal: 20,
    borderRadius: 30,
    padding: 1,
    alignSelf: "stretch",
  },
  form: {
    flex: 15,
    justifyContent: "center",
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
  buttonS: {
    height: 50,
    borderWidth: 1,
    marginTop: 30,
    marginHorizontal: 20,
    borderColor: colors.c3,
    borderRadius: 30,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
  },
});
