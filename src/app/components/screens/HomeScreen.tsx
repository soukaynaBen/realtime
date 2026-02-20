import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { db } from "../../../../utils";
import ChannelsList from "../ui/ChannelsList";

export default function HomeScreen() {
  const { user } = db.useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello!</Text>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "semibold",
        }}
      >
        {user?.isGuest ? "Guest" : user?.email}
      </Text>
      <Button title="sign out" onPress={() => db.auth.signOut()} />
      <ChannelsList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
});
