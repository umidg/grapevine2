import { grapevineBackend } from "../ci.axios";
export const connectAccount = async ({ token, refresh_token, videos }) => {
  return await grapevineBackend(
    "/tiktok/connect",
    {
      tiktokToken: token,
      tiktokPost: videos,
      tiktok_refresh: refresh_token,
    },
    "POST"
  )
    .then(({ data }) => {
      if (data.status) {
        return data;
      }
      throw Error("Something Went Wrong");
    })
    .catch((err) => {
      throw Error(err.message);
    });
};
