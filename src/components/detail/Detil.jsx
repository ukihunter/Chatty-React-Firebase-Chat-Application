import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useChatStore } from "../../lib/chatStore";
import { auth, db } from "../../lib/firebase";
import "./detil.css";
import { toast } from "react-toastify";
const Detil = () => {
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } =
    useChatStore();

  const handleBlock = async () => {
    if (!user) return;

    const userDocRef = doc(db, "users", auth.currentUser.uid);

    try {
      // Add the user ID to the blocked list
      await updateDoc(userDocRef, {
        blocked: arrayUnion(user.id),
      });

      changeBlock(); // Update the block state in the store
      toast.success("User Blocked"); // Notify the user
    } catch (error) {
      console.error("Error blocking user:", error);
    }
  };

  const handleUnblock = async () => {
    if (!user) {
      console.error("No user found to unblock.");
      return;
    }

    const userDocRef = doc(db, "users", auth.currentUser.uid);

    try {
      console.log("Unblocking user with ID:", user.id); // Debugging: Log user ID

      // Remove the user ID from the blocked list
      await updateDoc(userDocRef, {
        blocked: arrayRemove(user.id),
      });

      console.log("User successfully removed from blocked list."); // Debugging: Log success

      changeBlock(); // Update the block state in the store
      toast.success("User Unblocked"); // Notify the user
    } catch (error) {
      console.error("Error unblocking user:", error); // Debugging: Log error
    }
  };
  return (
    <div className="detil">
      <div className="user">
        <img
          src={
            user?.avatar ||
            `https://avatar.iran.liara.run/username?username=${user?.username}&bold=false&length=1`
          }
          alt={`${user?.username}'s avatar`}
        />
        <h2>{user?.username}</h2>
        <p>New User</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat settings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Photos</span>
            <img src="./arrowDown.png" alt="" />
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDeta">
                <img src="11.png" alt="" />
                <span>photo_20025.png</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <button onClick={isReceiverBlocked ? handleUnblock : handleBlock}>
          {isReceiverBlocked ? "Unblock User" : "Block User"}
        </button>
        <button className="logout" onClick={() => auth.signOut()}>
          Logout
        </button>
      </div>
    </div>
  );
};
export default Detil;
