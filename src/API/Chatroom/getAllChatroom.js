import { grapevineBackend } from "../ci.axios";

export const getAllChatroom = async ({ pageParam = 1 }) => {
  const data = await grapevineBackend(
    `/user/getAllChatRoom?page=${pageParam}&limit=20`,
    {},
    "POST"
  ).then(async ({ data }) => {
    if (data.status) {
      return data.data;
    } else {
      throw Error("Something Went Wrong");
    }
  });

  return data;
};
