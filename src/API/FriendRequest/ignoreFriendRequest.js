import { grapevineBackend } from "../ci.axios";

export const ignoreFriendRequest = async ({ friendship_uuid, user_accept }) => {
  const data = grapevineBackend(
    "/friendship/ignorefriendrequest",
    { friendship_uuid: friendship_uuid, user_accept: user_accept },
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
