import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Google from "expo-google-app-auth";
import firebase from "firebase";
import "firebase/auth";
import { AntDesign } from "@expo/vector-icons";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDI2Z_jsnX8XurTrTnL_CONCP5CH-aX72g",
  authDomain: "paul-s-chatapp.firebaseapp.com",
  databaseURL: "https://paul-s-chatapp-default-rtdb.firebaseio.com",
  projectId: "paul-s-chatapp",
  storageBucket: "paul-s-chatapp.appspot.com",
  messagingSenderId: "91537495329",
  appId: "1:91537495329:web:2e101410a844957aa5da60",
  measurementId: "G-LRJL739MQB",
};

// Initialize Firebase
try {
  if (firebaseConfig.apiKey) {
    firebase.initializeApp(firebaseConfig);
  }
} catch (err) {
  console.log(err);
}

export default function LoginScreen() {
  const signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "91537495329-amev85l9c1p0t364t8u78mqtc2av2uuh.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        console.log(result);
        onSignIn(result);
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onSignIn = (googleUser) => {
    console.log("Google Auth Response", googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );

        // Sign in with credential from the Google user.
        firebase
          .auth()
          .signInWithCredential(credential)
          .then((result) => {
            console.log("User Logged in", result);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert("YOU ARE ALREADY LOGGED IN.");
      }
    });
  };

  function isUserEqual(googleUser, firebaseUser) {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          alert("YOU ARE ALREADY LOGGED IN");
          return true;
        }
      }
    }
    return false;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <TouchableOpacity style={styles.loginBtn} onPress={signInWithGoogleAsync}>
        <AntDesign name="google" size={24} color="white" />
        <Text style={styles.loginText}>Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "gold",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 35,
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
