import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import firebase from "firebase";
import { Avatar } from "react-native-paper";
import * as Animatable from "react-native-animatable";

export default function ChatList({ item }) {
  const uid = firebase.auth().currentUser.uid;
  const db = firebase.firestore().collection("messages");

  const handleDeleteMsg = () => {
    var timestamp = "1634581800";
    var myDate = new Date(timestamp * 1000);
    var formatedTime = myDate.toJSON();

    db.doc(item.id).delete();
    console.log(myDate);
  };
  return (
    <Animatable.View
      animation="zoomInUp"
      duration={2000}
      style={uid === item.uid ? styles.listViewOwner : styles.listViewOther}
    >
      {uid !== item.uid && (
        <Avatar.Image
          size={40}
          style={{ marginRight: 10 }}
          source={{ uri: item.photoURL }}
        />
      )}
      <View
        style={uid == item.uid ? styles.chatViewOwner : styles.chatViewOther}
      >
        <Text
          onLongPress={() => {
            uid == item.uid &&
              Alert.alert(
                "Delete",
                "Are you sure you want to delete this message",
                [
                  {
                    text: "No",
                  },
                  {
                    text: "Yes",
                    onPress: (item) => handleDeleteMsg(item),
                  },
                ]
              );
          }}
          style={styles.titleChat}
        >
          {item.text}
        </Text>
      </View>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  listViewOwner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginVertical: 8,
    right: 20,
  },
  listViewOther: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginVertical: 8,
    left: 20,
  },

  titleChat: {
    fontWeight: "bold",
    fontSize: 18,
    color: "black",
    top: 0,
    color: "white",
  },
  chatViewOwner: {
    backgroundColor: "dodgerblue",
    padding: 10,
    borderRadius: 25,
    paddingHorizontal: 20,
    elevation: 6,
  },
  chatViewOther: {
    backgroundColor: "tomato",
    padding: 10,
    borderRadius: 25,
    paddingHorizontal: 20,
    elevation: 6,
    shadowColor: "black",
  },
});
