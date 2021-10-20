import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import firebase from "firebase";
import { ActivityIndicator, Button, TextInput } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import ChatList from "../components/chatList";
import { AutoScrollFlatList } from "react-native-autoscroll-flatlist";

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
            id: doc.id,
            time: doc.data().createdAt,
          }))
        );
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.appbar}>
        <Text style={styles.titleChat}>Chats</Text>
      </View>

      <AutoScrollFlatList
        data={chats}
        renderItem={({ item }) => <ChatList item={item} />}
        keyExtractor={(item) => item.id}
        threshold={20}
        showScrollToEndIndicator={true}
      />
      <View style={styles.sendTextArea}>
        <TextInput
          style={{ width: "80%", marginLeft: 20 }}
          blurOnSubmit={true}
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
              bottom: 10,
            }}
            size={40}
            color="tomato"
          />
        ) : (
          <AntDesign
            style={{
              alignSelf: "flex-end",
              margin: 20,
              bottom: 10,
            }}
            name="wechat"
            size={44}
            color="tomato"
            onPress={sendMessage}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    flexDirection: "row",
    marginLeft: 20,
    top: 20,
  },
});
