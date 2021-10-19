import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import firebase from "firebase";

export default function Profile() {
  const user = firebase.auth().currentUser;
  console.log(user);

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.photoURL }} style={styles.avatar} />
      <Text style={styles.displayName}>{user.displayName}</Text>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => firebase.auth().signOut()}
      >
        <Text style={styles.loginText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  displayName: {
    fontWeight: "bold",
    fontSize: 25,
    color: "black",
    marginBottom: 40,
    top: 0,
    textAlign: "center",
  },
  loginBtn: {
    backgroundColor: "tomato",
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 50,
    flexDirection: "row",
  },
  loginText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 14,
    textTransform: "uppercase",
  },
});
