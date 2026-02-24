// import { id } from "@instantdb/react-native";
// import { adminDb } from "../utils";

// /*
//  * Seed script to populate DB with some mock data
//  * coppy and pase it on the home screen
//  */
// interface User {
//   id: string;
//   displayName: string;
// }

// interface Channel {
//   id: string;
//   name: string;
// }

// interface Message {
//   content: string;
//   timestamp: number;
//   author: string;
//   channel: string;
// }

// interface Post {
//   id: number;
//   author: string;
//   handle: string;
//   color: string;
//   content: string;
//   timestamp: string;
//   likes: number;
//   liked: boolean;
// }
// const users: Record<string, User> = {
//   Alex: { id: id(), displayName: "Alex" },
//   Jordan: { id: id(), displayName: "Jordan" },
// };

// const channels: Record<string, Channel> = {
//   general: { id: id(), name: "general" },
//   instantdb: { id: id(), name: "instantdb" },
//   "crazy-ideas": { id: id(), name: "crazy-ideas" },
// };

// function generateTimestamps(messageCount: number): number[] {
//   const now = new Date();
//   const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);

//   const timestamps: number[] = [];
//   let currentTime = new Date(twoHoursAgo);

//   for (let i = 0; i < messageCount; i++) {
//     // Add random delay between 1-3 minutes between messages
//     const minJitterMs = 1 * 60 * 1000;
//     const maxJitterMs = 3 * 60 * 1000;
//     const jitterMs = Math.random() * (maxJitterMs - minJitterMs) + minJitterMs;
//     currentTime = new Date(currentTime.getTime() + jitterMs);

//     timestamps.push(currentTime.getTime());
//   }

//   return timestamps;
// }

// const mockPosts: Post[] = [
//   {
//     id: 1,
//     author: "Sarah Chen",
//     handle: "sarahchen",
//     color: "bg-blue-100",
//     content:
//       "Just launched my new project! Really excited to share it with everyone.",
//     timestamp: "2h ago",
//     likes: 12,
//     liked: false,
//   },
//   {
//     id: 2,
//     author: "Alex Rivera",
//     handle: "alexrivera",
//     color: "bg-purple-100",
//     content: "Beautiful sunset today. Nature never stops amazing me.",
//     timestamp: "4h ago",
//     likes: 19,
//     liked: true,
//   },
//   {
//     id: 3,
//     author: "Jordan Lee",
//     handle: "jordanlee",
//     color: "bg-pink-100",
//     content:
//       "Working on something cool with Next.js and TypeScript. Updates coming soon!",
//     timestamp: "6h ago",
//     likes: 7,
//     liked: false,
//   },
// ];

// function friendlyTimeToTimestamp(friendlyTime: string) {
//   const hours = parseInt(friendlyTime);
//   const now = Date.now();
//   return now - hours * 60 * 60 * 1000;
// }

// const ts = generateTimestamps(20);

// const mockMessages: Message[] = [
//   {
//     content: "Hey, how's it going?",
//     timestamp: ts[0],
//     author: "Alex",
//     channel: "general",
//   },
//   {
//     content: "Pretty good! Just finished the project",
//     timestamp: ts[1],
//     author: "Jordan",
//     channel: "general",
//   },
//   {
//     content: "Nice! Send me the link?",
//     timestamp: ts[2],
//     author: "Alex",
//     channel: "general",
//   },
//   {
//     content: "Sure, here it is: example.com/project",
//     timestamp: ts[3],
//     author: "Jordan",
//     channel: "general",
//   },
//   {
//     content: "Let me know what you think",
//     timestamp: ts[4],
//     author: "Jordan",
//     channel: "general",
//   },
//   {
//     content: "Looks amazing 🎉",
//     timestamp: ts[5],
//     author: "Alex",
//     channel: "general",
//   },
//   {
//     content: "Have you tried InstantDB yet?",
//     timestamp: ts[6],
//     author: "Alex",
//     channel: "instantdb",
//   },
//   {
//     content: "Yea it's dope!",
//     timestamp: ts[7],
//     author: "Jordan",
//     channel: "instantdb",
//   },
//   {
//     content: "Heck yeah! It's so fun to use!",
//     timestamp: ts[8],
//     author: "Alex",
//     channel: "instantdb",
//   },
//   {
//     content: "I have a crazy theory...",
//     timestamp: ts[9],
//     author: "Jordan",
//     channel: "crazy-ideas",
//   },
//   {
//     content: "Ooo tell me more!",
//     timestamp: ts[10],
//     author: "Alex",
//     channel: "crazy-ideas",
//   },
//   {
//     content: "If aliens learned to code, they'd probably use Lisp!",
//     timestamp: ts[11],
//     author: "Jordan",
//     channel: "crazy-ideas",
//   },
// ];

// // function seed() {
// //   console.log("Seeding db...");
// //   const userTxs = Object.values(users).map((u) =>
// //     adminDb.tx.$users[u.id].create({}),
// //   );
// //   const profileTxs = Object.values(users).map((u) =>
// //     adminDb.tx.profiles[u.id]
// //       .create({ displayName: u.displayName })
// //       .link({ user: u.id }),
// //   );
// //   const channelTxs = Object.values(channels).map((c) =>
// //     adminDb.tx.channels[c.id].create({ name: c.name }),
// //   );
// //   const messageTxs = mockMessages.map((m) => {
// //     const messageId = id();
// //     return adminDb.tx.messages[messageId]
// //       .create({
// //         content: m.content,
// //         timestamp: m.timestamp,
// //       })
// //       .link({ author: users[m.author].id })
// //       .link({ channel: channels[m.channel].id });
// //   });

// //   adminDb.transact([...userTxs, ...profileTxs, ...channelTxs, ...messageTxs]);
// // }

// // seed();

// function seed() {
//   console.log("Seeding db...");
//   mockPosts.forEach((post) => {
//     const userId = id();
//     const postId = id();
//     const user = adminDb.tx.$users[userId].create({});
//     const profile = adminDb.tx.profiles[userId]
//       .create({
//         displayName: post.author,
//         handle: post.handle,
//       })
//       .link({ user: userId });
//     const postEntity = adminDb.tx.posts[postId]
//       .create({
//         color: post.color,
//         content: post.content,
//         timestamp: friendlyTimeToTimestamp(post.timestamp),
//       })
//       .link({ author: userId });
//     const likes = Array.from({ length: post.likes }, () =>
//       adminDb.tx.likes[id()]
//         .create({ postId, userId })
//         .link({ post: postId, user: userId }),
//     );
//     adminDb.transact([user, profile, postEntity, ...likes]);
//   });
// }

// seed();
