import React from "react";
import { View } from "react-native";
import { db } from "../../utils";
import AuthScreen from "./components/screens/AuthScreen";
import HomeScreen from "./components/screens/HomeScreen";

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <db.SignedIn>
        <HomeScreen />
      </db.SignedIn>
      <db.SignedOut>
        <AuthScreen />
      </db.SignedOut>
    </View>
  );
}
