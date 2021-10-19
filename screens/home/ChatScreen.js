import React, { useState, useEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
} from "react-native";
import firebase from "firebase";
import { ActivityIndicator, Avatar, List, TextInput } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

export const ChatScreen = ({ navigation }) => {
  const [chats, setchats] = useState([]);
  const [message, setmessage] = useState("");
  const [sendpending, sendsetpending] = useState(false);
  const [Error, setError] = useState(false);

  const db = firebase.firestore();

  useEffect(() => {
    getData();
  }, []);

  const sendMessage = () => {
    if (message.length == 0) {
      setError(true);
    } else {
      sendsetpending(true);
      db.collection("messages")
        .add({
          text: message,
          uid: firebase.auth().currentUser.uid,
          photoURL: firebase.auth().currentUser.photoURL,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          setmessage("");
          sendsetpending(false);
        })
        .catch((err) => Alert.alert(err.code, err.message));
    }
  };

  const getData = () => {
    db.collection("messages")
      .orderBy("createdAt")
      .onSnapshot(function (querySnapshot) {
        setchats(
          querySnapshot.docs.map((doc) => ({
            text: doc.data().text,
            uid: doc.data().uid,
            photoURL: doc.data().photoURL,
            createdAt: doc.data().createdAt,
          }))
        );
        console.log(chats);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.appbar}>
        <Text style={styles.titleChat}>Chats</Text>
      </View>
      <FlatList
        data={chats}
        renderItem={({ item }) => (
          <>
            <List.Item
              style={styles.listchat}
              titleStyle={
                item.uid !== firebase.auth().currentUser.uid
                  ? styles.ChatdisplayName
                  : styles.ChatdisplayNameOthers
              }
              title={item.text}
              left={() =>
                item.uid !== firebase.auth().currentUser.uid && (
                  <Avatar.Image size={44} source={{ uri: item.photoURL }} />
                )
              }
              right={() =>
                item.uid === firebase.auth().currentUser.uid && (
                  <Avatar.Image size={44} source={{ uri: item.photoURL }} />
                )
              }
            />
            <View style={{ marginTop: 10 }} />
          </>
        )}
        keyExtractor={(item) => item.uid}
      />
      <View style={styles.sendTextArea}>
        <Text>{message}</Text>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={{ width: "80%" }}
            mode="outlined"
            label="Enter Message"
            placeholder="Type something"
            onSubmitEditing={() => sendMessage()}
            onChangeText={(val) => setmessage(val)}
            onTextInput={() => setError(false)}
            error={Error}
          />
          {sendpending ? (
            <ActivityIndicator
              style={{
                alignSelf: "flex-end",
                margin: 20,
              }}
              size={40}
              color="tomato"
            />
          ) : (
            <AntDesign
              style={{
                alignSelf: "flex-end",
                margin: 20,
              }}
              name="wechat"
              size={44}
              color="tomato"
              onPress={sendMessage}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  titleChat: {
    fontWeight: "bold",
    fontSize: 25,
    color: "black",
    top: 0,
    textAlign: "left",
    marginLeft: 20,
  },
  appbar: {
    elevation: 4,
    width: "102%",
    height: 50,
    justifyContent: "center",
  },
  listchat: {
    width: 300,
    elevation: 4,
  },
  ChatdisplayName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  ChatdisplayNameOthers: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "right",
    marginRight: 20,
  },
  sendTextArea: {
    height: 100,
    justifyContent: "center",
    width: "90%",
  },
});
