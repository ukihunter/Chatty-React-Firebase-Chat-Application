import { useEffect } from "react";
import Chat from "./components/chat/Chat";
import Detil from "./components/detail/Detil";
import List from "./components/list/List";
import Login from "./components/login/Login";
import Notification from "./components/notification/notification"; // Ensure this path is correct
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useUserStore } from "./lib/userStore"; // Adjust the path as needed
import { useChatStore } from "./lib/chatStore"; // Adjust the path as needed

const App = () => {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });
    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  if (isLoading)
    return (
      <div className="loading">
        <img src="./load.gif" alt="" />
      </div>
    );

  return (
    <div className="container">
      {currentUser ? (
        <>
          <List />
          {chatId && <Chat />}
          {chatId && <Detil />}
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
};

export default App;
