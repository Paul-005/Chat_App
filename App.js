import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import LoginScreen from "./screens/auth/LoginScreen";
import firebase from "firebase";
import Profile from "./screens/home/ProfileScreen";
import { ChatScreen } from "./screens/home/ChatScreen";
import { AntDesign } from "@expo/vector-icons";

const Tab = createMaterialTopTabNavigator();

export default function App() {
  const [UserState, setUserState] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserState(true);
      } else {
        setUserState(false);
      }
    });
  }, []);

  function TopTabNav() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Chats"
          component={ChatScreen}
          options={{
            tabBarIcon: () => (
              <AntDesign name="wechat" size={24} color="tomato" />
            ),
            tabBarShowIcon: true,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: () => (
              <AntDesign name="user" size={24} color="tomato" />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      {UserState ? <TopTabNav /> : <LoginScreen />}
    </NavigationContainer>
  );
}
