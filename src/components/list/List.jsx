import ChatList from "./chatlist/Chatlist";
import "./list.css";
import Userinfo from "./userinfo/Userinfo";
const List = () => {
  return (
    <div className="list">
      <Userinfo />
      <ChatList />
    </div>
  );
};
export default List;
