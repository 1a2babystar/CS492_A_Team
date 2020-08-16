import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import colors from "../app/config/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import AntDesign from "react-native-vector-icons/AntDesign";
import firebase from "firebase";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

async function Down(uid, rid) {
  const path = "/users/" + uid + "/" + rid + "/result/test.mp4";
  const url = await firebase.storage().ref(path).getDownloadURL();
  console.log(url);
  FileSystem.downloadAsync(url, FileSystem.documentDirectory + "sample.mp4")
    .then(({ uri }) => {
      MediaLibrary.saveToLibraryAsync(uri);
      alert("Download Finished, Check the gallery");
    })
    .catch((error) => {
      console.error(error);
    });
}

export default OngoingList = ({ list }) => {
  if (list.status === "done") {
    return (
      <View style={[styles.listContainer, { backgroundColor: list.color }]}>
        <Text style={styles.listTitle} numberOfLines={1}>
          {list.name}
        </Text>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.count}>{list.status}</Text>
          <Text style={styles.subtitle}>Status</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={styles.downloadbutton}
            onPress={() => {
              Down(list.uid, list.rid);
            }}
          >
            <AntDesign name="clouddownloado" size={28} color={colors.white} />
            <Text style={styles.downloadtext}>Download</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return (
      <View style={[styles.listContainer, { backgroundColor: list.color }]}>
        <Text style={styles.listTitle} numberOfLines={1}>
          {list.name}
        </Text>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.count}>{list.status}</Text>
          <Text style={styles.subtitle}>Status</Text>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginHorizontal: 12,
    alignItems: "center",
    justifyContent: "space-evenly",
    width: 200,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.white,
    marginBottom: 10,
  },
  count: {
    fontSize: 45,
    fontWeight: "200",
    marginBottom: 20,
    color: colors.white,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.white,
  },
  downloadbutton: {
    marginVertical: 5,
    borderWidth: 1,
    padding: 5,
    borderColor: colors.white,
    borderRadius: 4,
    flexDirection: "row",
  },
  downloadtext: {
    margin: 5,
    color: colors.white,
  },
});
