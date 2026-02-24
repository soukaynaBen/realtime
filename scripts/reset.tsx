// import { adminDb } from "../utils";

// async function reset() {
//   console.log("Resetting database...");
//   // Deleting all users will cascade delete all related data (posts, likes,
//   // etc.)
//   const { $users } = await adminDb.query({ $users: {} });
//   adminDb.transact($users.map((user) => adminDb.tx.$users[user.id].delete()));
// }

// reset();

// ("use client");

// import { type AppSchema } from "@/instant.schema";
// import { db } from "@/lib/db";
// import { id, InstaQLEntity } from "@instantdb/react";
// import { Heart, Trash2 } from "lucide-react";
// import React, { useState } from "react";

// // InstantDB Utility Types
// // -----------------------------
// type Post = InstaQLEntity<AppSchema, "posts", { author: {}; likes: {} }>;

// // InstantDB Query hooks
// // --------------------------------
// function useProfile(userId: string | undefined) {
//   const { data, isLoading, error } = db.useQuery(
//     userId
//       ? {
//           profiles: {
//             $: { where: { "user.id": userId } },
//           },
//         }
//       : null,
//   );
//   const profile = data?.profiles?.[0];

//   return { profile, isLoading, error };
// }

// // InstantDB Transactions
// // --------------------------------
// async function createProfile(
//   userId: string,
//   displayName: string,
//   handle: string,
// ) {
//   await db.transact(
//     db.tx.profiles[userId]
//       .create({
//         displayName: displayName.trim(),
//         handle: handle.trim().toLowerCase(),
//       })
//       .link({ user: userId }),
//   );
// }

// function createPost(content: string, color: string, authorProfileId: string) {
//   db.transact(
//     db.tx.posts[id()]
//       .create({
//         content: content.trim(),
//         timestamp: Date.now(),
//         color,
//       })
//       .link({ author: authorProfileId }),
//   );
// }

// function deletePost(postId: string) {
//   db.transact(db.tx.posts[postId].delete());
// }

// function createLike(userId: string, postId: string) {
//   db.transact(
//     db.tx.likes[id()]
//       .create({ userId, postId })
//       .link({ post: postId, user: userId }),
//   );
// }

// function deleteLike(likeId: string) {
//   db.transact(db.tx.likes[likeId].delete());
// }

// // Utilities
// // --------------------------------
// const colors = [
//   "bg-blue-100",
//   "bg-purple-100",
//   "bg-pink-100",
//   "bg-green-100",
//   "bg-yellow-100",
// ];

// function isLiked(post: Post, userId?: string) {
//   if (!userId) return false;
//   return post.likes.some((like) => like.userId === userId);
// }

// function timestampToFriendlyTime(timestamp: number) {
//   const now = Date.now();
//   const diff = now - timestamp;
//   const hours = Math.floor(diff / (60 * 60 * 1000));
//   const days = Math.floor(hours / 24);

//   if (hours < 1) {
//     return "recently";
//   }

//   if (days < 1) {
//     return `${hours}h ago`;
//   }

//   return `${days}d ago`;
// }

// // Instant Auth Components
// // --------------------------------
// function Login() {
//   const [sentEmail, setSentEmail] = useState("");
//   return (
//     <div className="flex items-center justify-center">
//       <div className="max-w-sm">
//         {!sentEmail ? (
//           <EmailStep onSendEmail={setSentEmail} />
//         ) : (
//           <CodeStep sentEmail={sentEmail} />
//         )}
//       </div>
//     </div>
//   );
// }

// function EmailStep({ onSendEmail }: { onSendEmail: (email: string) => void }) {
//   const inputRef = React.useRef<HTMLInputElement>(null);
//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const inputEl = inputRef.current!;
//     const email = inputEl.value;
//     onSendEmail(email);
//     db.auth.sendMagicCode({ email }).catch((err) => {
//       alert("Uh oh :" + err.body?.message);
//       onSendEmail("");
//     });
//   };
//   return (
//     <form
//       key="email"
//       onSubmit={handleSubmit}
//       className="flex flex-col space-y-4"
//     >
//       <h2 className="text-xl font-bold">
//         Log in to create and interact with posts!
//       </h2>
//       <p className="text-gray-700">
//         Enter your email, and we'll send you a verification code. We'll create
//         an account for you too if you don't already have one.
//       </p>
//       <input
//         ref={inputRef}
//         type="email"
//         className="w-full border border-gray-300 px-3 py-1"
//         placeholder="Enter your email"
//         required
//         autoFocus
//       />
//       <button
//         type="submit"
//         className="w-full bg-blue-600 px-3 py-1 font-bold text-white hover:bg-blue-700"
//       >
//         Send Code
//       </button>
//     </form>
//   );
// }

// function CodeStep({ sentEmail }: { sentEmail: string }) {
//   const inputRef = React.useRef<HTMLInputElement>(null);
//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const inputEl = inputRef.current!;
//     const code = inputEl.value;
//     db.auth.signInWithMagicCode({ email: sentEmail, code }).catch((err) => {
//       inputEl.value = "";
//       alert("Uh oh :" + err.body?.message);
//     });
//   };

//   return (
//     <form
//       key="code"
//       onSubmit={handleSubmit}
//       className="flex flex-col space-y-4"
//     >
//       <h2 className="text-xl font-bold">Enter your code</h2>
//       <p className="text-gray-700">
//         We sent an email to <strong>{sentEmail}</strong>. Check your email, and
//         paste the code you see.
//       </p>
//       <input
//         ref={inputRef}
//         type="text"
//         className="w-full border border-gray-300 px-3 py-1"
//         placeholder="123456..."
//         required
//         autoFocus
//       />
//       <button
//         type="submit"
//         className="w-full bg-blue-600 px-3 py-1 font-bold text-white hover:bg-blue-700"
//       >
//         Verify Code
//       </button>
//     </form>
//   );
// }

// // Components
// // -----------------------------
// function Header({ currentUserId }: { currentUserId?: string }) {
//   const { profile } = useProfile(currentUserId);
//   return (
//     <div className="mb-8 pt-4 flex items-center justify-between">
//       <div>
//         <h1 className="text-3xl font-black tracking-tight">Notes</h1>
//         <p className="text-gray-600 text-sm mt-2">Micro thoughts, big impact</p>
//       </div>
//       {profile && (
//         <div className="text-right">
//           <p className="font-bold text-gray-900">{profile?.displayName}</p>
//           <p className="text-sm text-gray-600">@{profile?.handle}</p>
//           <button
//             className="text-sm text-gray-600 underline"
//             onClick={() => db.auth.signOut()}
//           >
//             Log out
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// function Compose({ currentUserId }: { currentUserId: string }) {
//   const { profile } = useProfile(currentUserId);
//   const [newPost, setNewPost] = useState("");

//   const handleCreatePost = () => {
//     if (!currentUserId) {
//       alert("Log in to create a post!");
//       return;
//     }
//     if (!profile) {
//       alert("Set up your profile to create a post!");
//       return;
//     }
//     if (newPost.trim()) {
//       const color = colors[Math.floor(Math.random() * colors.length)];
//       createPost(newPost, color, profile.id);
//       setNewPost("");
//     }
//   };

//   return (
//     <>
//       <textarea
//         value={newPost}
//         onChange={(e) => setNewPost(e.target.value)}
//         placeholder="Write a note..."
//         className="w-full outline-none resize-none bg-transparent font-serif text-lg"
//         rows={3}
//       />
//       <div className="flex justify-end mt-4">
//         <button
//           onClick={handleCreatePost}
//           disabled={!newPost.trim()}
//           className="bg-black text-white px-6 py-2 rounded-full font-bold hover:bg-gray-800 disabled:opacity-50 transition text-sm"
//         >
//           Post
//         </button>
//       </div>
//     </>
//   );
// }

// function SetupProfile({ currentUserId }: { currentUserId: string }) {
//   const [displayName, setDisplayName] = useState("");
//   const [handle, setHandle] = useState("");

//   const handleCreateProfile = async (displayName: string, handle: string) => {
//     try {
//       await createProfile(currentUserId, displayName, handle);
//     } catch (error: any) {
//       // Handle unique constraint violation for handle
//       if (error?.body?.type === "record-not-unique") {
//         alert("Handle already taken, please choose another one.");
//         return;
//       }
//       alert("Error creating profile: " + error.message);
//     }
//   };

//   return (
//     <>
//       <div className="space-y-4">
//         <div>
//           <label className="block text-sm font-semibold text-gray-900 mb-2">
//             Display Name
//           </label>
//           <input
//             type="text"
//             value={displayName}
//             onChange={(e) => setDisplayName(e.target.value)}
//             className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg outline-none focus:border-black transition"
//             placeholder="Your display name"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-semibold text-gray-900 mb-2">
//             Handle
//           </label>
//           <div className="flex items-center">
//             <span className="text-gray-600 px-3 py-2">@</span>
//             <input
//               type="text"
//               value={handle}
//               onChange={(e) => setHandle(e.target.value)}
//               className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg outline-none focus:border-black transition"
//               placeholder="handle"
//             />
//           </div>
//         </div>

//         <div className="flex gap-3 mt-8">
//           <button
//             onClick={() => handleCreateProfile(displayName, handle)}
//             className="flex-1 px-4 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition"
//           >
//             Save
//           </button>
//           <button
//             onClick={() => db.auth.signOut()}
//             className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-100 transition"
//           >
//             Sign Out
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

// function App() {
//   // Query for current user and their associated profile
//   const { user, isLoading: userLoading, error: userError } = db.useAuth();
//   const currentUserId = user?.id;
//   const { profile, isLoading: profileLoading } = useProfile(currentUserId);

//   // Query posts with author and likes
//   const { isLoading, error, data } = db.useQuery({
//     posts: {
//       $: { order: { serverCreatedAt: "desc" } },
//       author: {},
//       likes: {},
//     },
//   });

//   // Show empty screen while loading auth or post data
//   if (userLoading || isLoading) {
//     return;
//   }

//   // These shouldn't happen, but if they do let's show the error
//   if (userError) {
//     return <div>Auth Error: {userError.message}</div>;
//   }
//   if (error) {
//     return <div>Data Error: {error.message}</div>;
//   }

//   const { posts } = data;

//   const handleDeletePost = (post: Post) => {
//     if (!currentUserId) {
//       alert("Log in to delete a post!");
//       return;
//     }
//     if (post.author?.id !== currentUserId) {
//       alert("You can only delete your own posts!");
//       return;
//     }
//     deletePost(post.id);
//   };

//   const handleLike = (post: Post) => {
//     if (!currentUserId) {
//       alert("Log in to like a post!");
//       return;
//     }
//     const existingLike = post.likes.find(
//       (like) => like.userId === currentUserId,
//     );
//     if (!existingLike) {
//       createLike(currentUserId, post.id);
//     } else {
//       deleteLike(existingLike.id);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       <div className="max-w-2xl mx-auto p-6">
//         <Header currentUserId={currentUserId!} />

//         {/* Compose when logged in, otherwise login / profile setup */}
//         <div className="mb-8">
//           <div className="bg-yellow-50 rounded-2xl p-6 border-2 border-yellow-200">
//             {currentUserId ? (
//               profileLoading ? (
//                 <div className="flex justify-center items-center">
//                   Beam me up scotty...
//                 </div>
//               ) : profile ? (
//                 <Compose currentUserId={currentUserId} />
//               ) : (
//                 <SetupProfile currentUserId={currentUserId} />
//               )
//             ) : (
//               <Login />
//             )}
//           </div>
//         </div>

//         {/* Feed */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-max">
//           {!posts.length && (
//             <div className="text-lg">No posts yet. Be the first to post!</div>
//           )}
//           {!posts.length
//             ? null
//             : posts.map((post) => (
//                 <div
//                   key={post.id}
//                   className={`${post.color} rounded-2xl p-6 border-2 border-gray-200 hover:shadow-lg transition transform hover:-rotate-1`}
//                 >
//                   <div className="flex justify-between items-start mb-4">
//                     <div>
//                       <div className="font-bold text-gray-900">
//                         {post.author?.displayName}
//                       </div>
//                       <div className="text-sm text-gray-600">
//                         @{post.author?.handle}
//                       </div>
//                     </div>
//                     <button
//                       onClick={() => handleDeletePost(post)}
//                       className="text-gray-400 hover:text-red-600"
//                     >
//                       <Trash2 size={18} />
//                     </button>
//                   </div>
//                   <p className="text-gray-800 leading-relaxed font-serif mb-4">
//                     {post.content}
//                   </p>
//                   <div className="flex justify-between items-center pt-4 border-t-2 border-gray-300">
//                     <span className="text-xs text-gray-600">
//                       {timestampToFriendlyTime(post.timestamp)}
//                     </span>
//                     <button
//                       onClick={() => handleLike(post)}
//                       className={`flex items-center gap-1 transition ${
//                         isLiked(post, currentUserId)
//                           ? "text-red-600"
//                           : "text-gray-600 hover:text-red-600"
//                       }`}
//                     >
//                       <Heart size={16} fill={"currentColor"} />{" "}
//                       {post.likes.length}
//                     </button>
//                   </div>
//                 </div>
//               ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
