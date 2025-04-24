import { use, useEffect, useRef } from "react";
import { useChatStore } from "../../lib/chatStore"; // Adjust the path to your chat store
import { db } from "../../lib/firebase"; // Adjust the path to your Firebase configuration file
import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import {
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { useUserStore } from "../../lib/userStore";

const Chat = () => {
  const [chat, setChat] = useState();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } =
    useChatStore();
  const { currentUser } = useUserStore();

  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });
    return () => {
      unSub();
    };
  }, [chatId]);

  console.log(chat);

  const handelEmoji = (e) => {
    setText((prv) => prv + e.emoji);
    setOpen(false);
  };

  const handelSendImage = async (file) => {
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", "chatty");
    uploadData.append("cloud_name", "dxsxtmlqd");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dxsxtmlqd/image/upload`,
        {
          method: "POST",
          body: uploadData,
        }
      );

      const data = await response.json();
      const imageUrl = data.secure_url;

      // Send the image URL to Firebase
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          img: imageUrl,
          senderId: currentUser.id,
          createAt: new Date(),
        }),
      });

      const userIDs = [currentUser.id, user.id];
      userIDs.forEach(async (id) => {
        const userChatRef = doc(db, "userchats", id);
        const userChatsSnapshot = await getDoc(userChatRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();

          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          userChatsData.chats[chatIndex].lastMessage = "Image shared";
          userChatsData.chats[chatIndex].isSeen =
            id == currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();
          await updateDoc(userChatRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handelSend = async () => {
    if (text == "") return;

    try {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          text: text,
          senderId: currentUser.id,
          createAt: new Date(),
        }),
      });

      const userIDs = [currentUser.id, user.id];
      userIDs.forEach(async (id) => {
        const userChatRef = doc(db, "userchats", id);
        const userChatsSnapshot = await getDoc(userChatRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();

          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen =
            id == currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();
          await updateDoc(userChatRef, {
            chats: userChatsData.chats,
          });
          setText("");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img
            src={
              user?.avatar ||
              `https://avatar.iran.liara.run/username?username=${user?.username}&bold=false&length=1`
            }
            alt={`${user?.username}'s avatar`}
          />
          <div className="texts">
            <span>{user?.username}</span>
            <p>New User</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>
      <div className="center">
        {chat?.messages?.map((message) => (
          <div
            className={
              message.senderId == currentUser?.id ? "message own" : "message"
            }
            key={message?.createAt}
          >
            <div className="texts">
              {message.img && <img src={message.img} alt="" />}
              {message.text && <p>{message.text}</p>} <span>1 min ago</span>
            </div>
            <div ref={endRef}></div>
          </div>
        ))}

        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <label htmlFor="imageUpload">
            <img src="./img.png" alt="Upload" />
          </label>
          <input
            id="imageUpload"
            type="file"
            style={{ display: "none" }}
            accept="image/*"
            onChange={(e) => handelSendImage(e.target.files[0])}
          />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        />

        <div className="emoji">
          <img
            src="./emoji.png"
            alt=""
            onClick={() => setOpen((prv) => !prv)}
          />
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handelEmoji} />
          </div>
        </div>
        <button
          className="sendButton"
          onClick={handelSend}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
          ref={endRef}
        >
          Send
        </button>
      </div>
    </div>
  );
};
export default Chat;
