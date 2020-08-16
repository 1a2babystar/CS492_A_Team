import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
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
import { getFreeDiskStorageAsync } from "expo-file-system";

export default class SelectScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      output: null,
      uid: null,
      rrid: null,
      srcVidsource: null,
      dstVidsource: null,
      selectscreen: true,
      srcVidcheck: null,
      dstVidcheck: null,
      srcok: false,
      dstok: false,
      sendok: false,
      srccanselect: true,
      dstcanselect: true,
      srcbuttontext: "Select Source Video",
      dstbuttontext: "Select Destination Video",
    };

    this.handleoutputname = this.handleoutputname.bind(this);
  }

  handleoutputname(newText) {
    this.setState({
      output: newText,
    });
  }

  async componentDidMount() {
    this.getPermissionAsync();
    this.focusListener = this.props.navigation.addListener(
      "focus",
      async () => {
        var user = firebase.auth().currentUser;
        if (user != null) {
          await this.setState({
            uid: user.uid,
          });
        }
        await this.getrid();
        console.log(this.state.uid);
        console.log(this.state.rrid);
      }
    );
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  uploadsrcVidAsync = async (uri) => {
    const path =
      "users/" + this.state.uid + "/" + this.state.rrid + "/src/src.mp4";
    const response = await fetch(uri);
    const blobb = await response.blob();

    await firebase.storage().ref(path).put(blobb);
    return;
  };

  uploaddstVidAsync = async (uri) => {
    const path =
      "users/" + this.state.uid + "/" + this.state.rrid + "/dst/dst.mp4";
    const response = await fetch(uri);
    const blobb = await response.blob();

    await firebase.storage().ref(path).put(blobb);
    return;
  };

  _picksrcVid = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({
          srcVidsource: result.uri,
          dstcanselect: false,
          dstbuttontext: "waiting for source Video to upload",
        });
        await this.uploadsrcVidAsync(this.state.srcVidsource);
        axios({
          method: "post",
          url: "http://5aa8bdd6cbb1.ngrok.io/upload/",
          data: {
            uid: this.state.uid,
            rid: this.state.rrid,
            type: "src",
            filename: "src.mp4",
          },
        })
          .then((response) => {
            this.setState({
              srcVidcheck: response.data,
              srcbuttontext: "waiting for Destination Video to upload",
              dstbuttontext: "Select Destination Video",
              srccanselect: false,
              dstcanselect: true,
            });
            if (response.data.status === "Safe") {
              this.setState({
                srcok: true,
              });
            } else {
              this.setState({
                srcok: false,
              });
            }
            if (this.state.srcok && this.state.dstok) {
              this.setState({
                sendok: true,
              });
            }
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  _pickdstVid = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({
          dstVidsource: result.uri,
          srccanselect: false,
          srcbuttontext: "waiting for source Video to upload",
        });
        await this.uploaddstVidAsync(this.state.dstVidsource);
        axios({
          method: "post",
          url: "http://5aa8bdd6cbb1.ngrok.io/upload/",
          data: {
            uid: this.state.uid,
            rid: this.state.rrid,
            type: "dst",
            filename: "dst.mp4",
          },
        })
          .then((response) => {
            this.setState({
              dstVidcheck: response.data,
              srcbuttontext: "Select Source Video",
              dstbuttontext: "waiting for source Video to upload",
              srccanselect: true,
              dstcanselect: false,
            });
            if (response.data.status === "Safe") {
              this.setState({
                dstok: true,
              });
            } else {
              this.setState({
                dstok: false,
              });
            }
            if (this.state.srcok && this.state.dstok) {
              this.setState({
                sendok: true,
              });
            }
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  async firedbsetting() {
    var path = this.state.uid;
    const dbh = firebase.firestore();
    dbh
      .collection("users")
      .doc(this.state.uid)
      .collection("rid")
      .doc(this.state.rrid)
      .set({
        name: this.state.output,
      })
      .then(() => {
        console.log("success!");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async getrid() {
    axios({
      method: "post",
      url: "http://5aa8bdd6cbb1.ngrok.io/users/",
      data: {
        uid: this.state.uid,
      },
    })
      .then((response) => {
        this.setState({
          rrid: response.data.rid,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async conNsub() {
    await axios({
      method: "post",
      url: "http://5aa8bdd6cbb1.ngrok.io/media/",
      data: {
        uid: this.state.uid,
        rid: this.state.rrid,
        name: this.state.output,
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    this.props.navigation.navigate("Main");
    //this.getd();
  }

  async CheckPorn() {
    if (this.state.srcVidcheck != null && this.state.dstVidcheck != null) {
      if (
        this.state.srcVidcheck.status == "Safe" &&
        this.state.srcVidcheck.status == "Safe"
      ) {
        alert("contents safe ready to convert");
      } else {
        this.setState({
          selectscreen: false,
        });
      }
    } else {
      alert("Please Select the source and destination video");
    }
  }

  render() {
    if (this.state.selectscreen) {
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
          <View style={[styles.section, styles.select]}>
            <Video
              source={{ uri: this.state.srcVidsource }}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="cover"
              shouldPlay
              isLooping
              style={{ width: "70%", height: 150, marginLeft: 50 }}
            />
            <Button
              title={this.state.srcbuttontext}
              disabled={!this.state.srccanselect}
              onPress={() => {
                this._picksrcVid();
              }}
            ></Button>
          </View>
          <View style={[styles.section, styles.select]}>
            <Video
              source={{ uri: this.state.dstVidsource }}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="cover"
              shouldPlay
              isLooping
              style={{ width: "70%", height: 150, marginLeft: 50 }}
            />
            <Button
              title={this.state.dstbuttontext}
              disabled={!this.state.dstcanselect}
              onPress={() => {
                this._pickdstVid();
              }}
            ></Button>
          </View>
          <View
            style={[
              styles.section,
              {
                flex: 1,
                justifyContent: "center",
                marginHorizontal: 20,
                alignSelf: "center",
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => {
                this.CheckPorn();
              }}
            >
              <Text>Check Input Intergretiy</Text>
            </TouchableOpacity>
          </View>
          <KeyboardAvoidingView style={[styles.section, styles.footer]}>
            <TextInput
              style={[styles.input, { borderColor: this.state.color }]}
              onChangeText={this.handleoutputname}
              placeholder="Output file name"
            />
            <Button
              title="Convert"
              disabled={!this.state.sendok}
              onPress={() => {
                this.conNsub();
              }}
            ></Button>
          </KeyboardAvoidingView>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View
            style={{
              flex: 1,
              alignContent: "center",
              alignSelf: "center",
              marginTop: 15,
            }}
          >
            <Text>Input Intergretiy</Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignContent: "center",
              justifyContent: "center",
              alignSelf: "stretch",
            }}
          >
            <View
              style={{
                marginHorizontal: 10,
                borderWidth: 1,
              }}
            >
              <Text>{this.state.srcVidcheck.status}</Text>
            </View>
            <View
              style={{
                marginHorizontal: 10,
                borderWidth: 1,
              }}
            >
              <Text>{this.state.dstVidcheck.status}</Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              alignContent: "center",
              alignSelf: "center",
              justifyContent: "center",
            }}
          >
            <Button
              title="ok"
              onPress={() => {
                this.setState({
                  selectscreen: true,
                });
              }}
            ></Button>
          </View>
        </View>
      );
    }
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
    flex: 3,
    justifyContent: "flex-end",
    marginHorizontal: 20,
  },
  section: {
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
    flex: 1,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
    justifyContent: "center",
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
