import { grapevineBackend } from "../ci.axios";

export const createChatroom = async (value) => {
  const data = await grapevineBackend(`/chatroom/create`, value, "POST")
    .then(async ({ data }) => {
      if (data.status) {
        return data.data;
      } else {
        throw new Error("Something went wrong");
      }
    })
    .catch((err) => {
      return new Error(err.message);
    });
  return data;
};
