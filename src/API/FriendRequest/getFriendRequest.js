import { grapevineBackend } from "../ci.axios";

export const getFriendRequest = async (uuid) => {
  const data = await grapevineBackend(
    "/friendship/getfriendrequest",
    { user_accept: uuid },
    "POST"
  ).then(async ({ data }) => {
    if (data.code == 200) {
      return data.data;
    } else {
      throw Error("Something Went Wrong");
    }
  });

  return data;
};
