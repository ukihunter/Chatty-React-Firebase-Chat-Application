//import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
//import { db } from "./firebase";
import { useUserStore } from "./userStore"; // Adjust the path as needed

export const useChatStore = create((set) => ({
  chatId: null,
  user: null,
  isCurrentUserBlocked: false,
  isReceiverBlocked: false,

  changeChat: (chatId, user) => {
    const currentUser = useUserStore.getState().currentUser;

    //Cheack IF User Bloacked

    if (user.blocked.includes(currentUser.id)) {
      return set({
        chatId,
        user: null,
        isCurrentUserBlocked: true,
        isReceiverBlocked: false,
      });
    } else if (currentUser.blocked.includes(user.id)) {
      return set({
        chatId,
        user: user,
        isCurrentUserBlocked: false,
        isReceiverBlocked: true,
      });
    } else {
      return set({
        chatId,
        user,
        isCurrentUserBloacked: false,
        isReceiverBloacked: false,
      });
    }
  },
  chagneBlock: () => {
    set((state) => ({
      ...state,
      isReceiverBloacked: !state.isReceiverBloacked,
    }));
  },
}));
