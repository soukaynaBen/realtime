// Docs: https://www.instantdb.com/docs/modeling-data

import { i } from "@instantdb/react-native";

const _schema = i.schema({
  entities: {
    $files: i.entity({
      path: i.string().unique().indexed(),
      url: i.string(),
    }),
    $streams: i.entity({
      abortReason: i.string().optional(),
      clientId: i.string().unique().indexed(),
      done: i.boolean().optional(),
      size: i.number().optional(),
    }),
    $users: i.entity({
      email: i.string().unique().indexed().optional(),
      imageURL: i.string().optional(),
      type: i.string().optional(),
    }),
    channels: i.entity({
      name: i.string().indexed(),
    }),
    messages: i.entity({
      content: i.string(),
      timestamp: i.date().indexed(),
    }),
    profiles: i.entity({
      displayName: i.string(),
      handle: i.string().unique().indexed(),
    }),
    posts: i.entity({
      color: i.string(),
      content: i.string(),
      timestamp: i.number(),
    }),
    likes: i.entity({
      userId: i.string().indexed(),
      postId: i.string().indexed(),
    }),
  },
  links: {
    $streams$files: {
      forward: {
        on: "$streams",
        has: "many",
        label: "$files",
      },
      reverse: {
        on: "$files",
        has: "one",
        label: "$stream",
        onDelete: "cascade",
      },
    },
    $usersLinkedPrimaryUser: {
      forward: {
        on: "$users",
        has: "one",
        label: "linkedPrimaryUser",
        onDelete: "cascade",
      },
      reverse: {
        on: "$users",
        has: "many",
        label: "linkedGuestUsers",
      },
    },
    userProfile: {
      forward: {
        on: "profiles",
        has: "one",
        label: "user",
        onDelete: "cascade",
      },
      reverse: {
        on: "$users",
        has: "one",
        label: "profile",
      },
    },
    authorMessages: {
      forward: {
        on: "messages",
        has: "one",
        label: "author",
        onDelete: "cascade",
      },
      reverse: {
        on: "profiles",
        has: "many",
        label: "messages",
      },
    },
    channelMessages: {
      forward: {
        on: "messages",
        has: "one",
        label: "channel",
        onDelete: "cascade",
      },
      reverse: {
        on: "channels",
        has: "many",
        label: "messages",
      },
    },
    userLikes: {
      forward: {
        on: "likes",
        has: "one",
        label: "user",
        onDelete: "cascade",
      },
      reverse: {
        on: "profiles",
        has: "many",
        label: "likes",
      },
    },
    postAuthors: {
      forward: {
        on: "posts",
        has: "one",
        label: "author",
        onDelete: "cascade",
      },
      reverse: {
        on: "profiles",
        has: "many",
        label: "posts",
      },
    },
    postLikes: {
      forward: {
        on: "likes",
        has: "one",
        label: "post",
        onDelete: "cascade",
      },
      reverse: {
        on: "posts",
        has: "many",
        label: "likes",
      },
    },
  },
  rooms: {
    chat: {
      presence: i.entity({
        profileId: i.string(),
        displayName: i.string(),
      }),
    },
  },
});

// This helps TypeScript display nicer intellisense
type _AppSchema = typeof _schema;
interface AppSchema extends _AppSchema {}
const schema: AppSchema = _schema;

export type { AppSchema };
export default schema;
