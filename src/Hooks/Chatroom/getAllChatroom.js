import { useInfiniteQuery } from "react-query";
import { getAllChatroom } from "../../API/Chatroom/getAllChatroom";
const GetAllChatroom = () => {
  const notification = useInfiniteQuery("getAllChatroom", getAllChatroom, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.next) {
        return lastPage.next.page;
      }
    },
  });
  return notification;
};

export default GetAllChatroom;
