import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text } from "react-native";
import ChannelScreen from "./components/screens/ChannelScreen";

export default function Channel() {
  const { channel } = useLocalSearchParams();
  if (!channel) {
    return <Text style={{ color: "red" }}>Channel not found</Text>;
  }
  return <ChannelScreen channel={channel as string} />;
}
