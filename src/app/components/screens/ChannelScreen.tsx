import { listMessagesQuery } from "@/instant.queries";
import { AppSchema } from "@/instant.schema";
import { id, InstaQLEntity } from "@instantdb/react-native";
import { SymbolView } from "expo-symbols";
import React, { useState } from "react";
import {
  FlatList,
  Keyboard,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { KeyboardStickyView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { db, useProfile } from "../../../../utils";

interface ChannelScreenProps {
  channel: string;
}
type Message = InstaQLEntity<AppSchema, "messages">;
type Author = InstaQLEntity<AppSchema, "$users">;

export default function ChannelScreen({ channel }: ChannelScreenProps) {
  const { bottom } = useSafeAreaInsets();
  const [message, setMessage] = useState("");
  const { id: userId } = db.useUser();
  const { profile } = useProfile();

  const { data, error, isLoading } = db.useQuery(listMessagesQuery(channel));

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error...</Text>;
  }

  function handleSendMessage() {
    setMessage("");
    Keyboard.dismiss();
    const messageId = id();
    const messageTx = db.tx.messages[messageId]
      .create({
        content: message,
        timestamp: Date.now(),
      })
      .link({ author: profile?.id })
      .link({ channel: channel });

    db.transact(messageTx);
  }

  return (
    <>
      <KeyboardStickyView
        offset={{ closed: -bottom, opened: -3 }}
        style={{ flex: 1 }}
      >
        <FlatList
          data={data.messages}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => <MessageContainer {...item} />}
          contentContainerStyle={{ padding: 16, gap: 16 }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
            gap: 16,
          }}
        >
          <TextInput
            multiline
            placeholder="Enter your email!!!"
            autoFocus
            onChangeText={setMessage}
            value={message}
            onSubmitEditing={handleSendMessage}
            style={{
              flexGrow: 1,
              flexShrink: 1,
              fontSize: 20,
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 50,
              paddingHorizontal: 16,
              paddingVertical: 12,
              backgroundColor: "white",
            }}
          />
          <Pressable
            onPress={handleSendMessage}
            style={{
              backgroundColor: "black",
              padding: 16,
              borderRadius: 50,
            }}
          >
            <SymbolView
              name={{
                ios: "arrow.up",
                android: "arrow_upward",
              }}
              size={30}
              tintColor={"white"}
            />
          </Pressable>
        </View>
      </KeyboardStickyView>
    </>
  );
}

interface MessageContainerProps {
  id: Message["id"];
  timestamp: Message["timestamp"];
  content: Message["content"];
  author?: {
    id: string;
    displayName: string;
    user?: Author;
  };
}

function MessageContainer({
  content,
  id,
  timestamp,
  author,
}: MessageContainerProps) {
  const { id: userId } = db.useUser();
  const isMyMessage = author?.user?.id === userId;

  return (
    <View
      style={{
        padding: 16,
        backgroundColor: isMyMessage ? "orange" : "lightblue",
        borderRadius: 16,
      }}
    >
      <Text>{content}</Text>
      <Text>{author?.user?.email ?? "Guest"}</Text>
    </View>
  );
}
