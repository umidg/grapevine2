import { grapevineBackend } from "../ci.axios";

export const getuserInfo = async (uuid) => {
  const data = await grapevineBackend(`/auth/getuserInfo/${uuid}`, {}, "POST")
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