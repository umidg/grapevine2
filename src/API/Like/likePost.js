import { grapevineBackend } from "../ci.axios";

export const likePost = async (data) => {
  const data = await grapevineBackend("/likes/create", data, "POST")
    .then(async ({ data }) => {
      if (data.status) {
        return data.data;
      } else {
        throw new Error("Something went wrong");
      }
    })
    .catch((err) => {
      throw new Error(err.message);
    });
  return data;
};
