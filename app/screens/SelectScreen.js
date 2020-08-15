import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Button,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";
import colors from "../config/colors";
import Entypo from "react-native-vector-icons/Entypo";
import { Video } from "expo-av";
import firebase from "firebase";
import "firebase/firestore";
import Constants from "expo-constants";
import axios from "axios";

export default class SelectScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      output: null,
      uid: null,
      ImageSource: null,
      videoSource: null,
    };

    this.handleoutputname = this.handleoutputname.bind(this);
  }

  handleoutputname(newText) {
    this.setState({
      output: newText,
    });
  }

  componentDidMount() {
    this.getPermissionAsync();
    var user = firebase.auth().currentUser;
    if (user != null) {
      this.setState({
        uid: user.uid,
      });
    }
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  uploadPhotoAsync = async (uri) => {
    const path = `7.jpg`;
    return new Promise(async (res, rej) => {
      const response = await fetch(uri);
      const blobb = await response.blob();

      let upload = firebase.storage().ref(path).put(blobb);

      upload.on(
        "state_changed",
        (snapshot) => {},
        (err) => {
          rej(err);
        },
        async () => {
          const url = await upload.snapshot.ref.getDownloadURL();
          res(url);
        }
      );
    });
  };

  uploadVideoAsync = async (uri) => {
    const path = `8.mp4`;
    return new Promise(async (res, rej) => {
      const response = await fetch(uri);
      const blobb = await response.blob();

      let upload = firebase.storage().ref(path).put(blobb);

      upload.on(
        "state_changed",
        (snapshot) => {},
        (err) => {
          rej(err);
        },
        async () => {
          const url = await upload.snapshot.ref.getDownloadURL();
          res(url);
        }
      );
    });
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ ImageSource: result.uri });
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  _pickVideo = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ videoSource: result.uri });
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  firedbsetting() {
    var path = this.state.uid;
    const dbh = firebase.firestore();
    dbh
      .collection("users")
      .doc("7JSR5mh50XQ83mgt4FhKeBeWxRl1")
      .collection("rid")
      .doc("91dbc50e37edac95729d7bca31bd07")
      .set({
        name: "abc",
        status: "ongoing",
      })
      .then(() => {
        console.log("success!");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getd() {
    const dbh = firebase.firestore();
    var arr = [];
    dbh
      .collection("users")
      .doc("7JSR5mh50XQ83mgt4FhKeBeWxRl1")
      .collection("rid")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          arr.push(doc.data());
        });
        console.log(arr);
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }

  conNsub() {
    /*
    axios({
      method: "get",
      url: "http://31dbfda3f3bf.ngrok.io/media/",
      params: {
        uid: "Seunghyuk",
        rid: "452637",
        request: "result",
        filename: "output.mp4",
      },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      */
    //this.uploadPhotoAsync(this.state.ImageSource);
    //this.uploadVideoAsync(this.state.videoSource);
    //this.props.navigation.navigate("Main");
    //this.firedbsetting();
    //this.getd();
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backbutton}
          onPress={() => {
            this.props.navigation.navigate("Main");
          }}
        >
          <View style={styles.titleBar}>
            <AntDesign name="back" size={28} color="#52575D" />
          </View>
        </TouchableOpacity>
        <View
          style={[
            styles.section,
            styles.select,
            { borderBottomColor: this.state.color },
          ]}
        >
          <Image
            source={{ uri: this.state.ImageSource }}
            style={{
              width: "70%",
              height: 150,
              marginLeft: 50,
            }}
          />
          <TouchableOpacity
            style={[styles.selectbutton, { backgroundColor: this.state.color }]}
            onPress={this._pickImage}
          >
            <Entypo name="image" size={24} color={colors.blue} />
            <Text style={{ color: colors.blue, marginHorizontal: 10 }}>
              Select Image
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.section,
            styles.select,
            { borderBottomColor: this.state.color },
          ]}
        >
          <Video
            source={{ uri: this.state.videoSource }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay
            isLooping
            style={{ width: "70%", height: 150, marginLeft: 50 }}
          />
          <TouchableOpacity
            style={[styles.selectbutton, { backgroundColor: this.state.color }]}
            onPress={this._pickVideo}
          >
            <Entypo name="video" size={24} color={colors.blue} />
            <Text style={{ color: colors.blue, marginHorizontal: 10 }}>
              Select Video
            </Text>
          </TouchableOpacity>
        </View>
        <KeyboardAvoidingView style={[styles.section, styles.footer]}>
          <TextInput
            style={[styles.input, { borderColor: this.state.color }]}
            onChangeText={this.handleoutputname}
            placeholder="Output file name"
          />
          <TouchableOpacity
            style={[styles.button, { backgroundColor: this.state.color }]}
            onPress={() => {
              this.conNsub();
            }}
          >
            <Text style={{ color: colors.blue }}>Convert</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16,
  },
  text: {
    color: "#161924",
    fontSize: 20,
    fontWeight: "500",
  },
  backbutton: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
  },
  select: {
    justifyContent: "flex-end",
    marginHorizontal: 20,
  },
  section: {
    flex: 1,
    alignSelf: "stretch",
  },
  input: {
    flex: 1,
    height: 48,
    width: "70%",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
    marginRight: 8,
    paddingHorizontal: 8,
    fontSize: 18,
  },
  footer: {
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  selectbutton: {
    flexDirection: "row",
    alignItems: "center",
    height: 30,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderWidth: 1,
    height: 48,
    borderColor: colors.blue,
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
