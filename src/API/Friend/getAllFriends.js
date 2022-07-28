import { grapevineBackend } from "../ci.axios";

export const getAllFriends = async ({ pageParam = 1 }, search) => {
  const data = await grapevineBackend(
    `/friendship/getAllFriends?page=${pageParam}&limit=20&search=${search}`,
    {},
    "POST"
  ).then(async ({ data }) => {
    if (data.status) {
      return data.data;
    } else {
      throw Error("Something Went Wrong");
    }
  });
  // const data = await grapevineBackend(
  //   `/friendship/getAllFriends`,
  //   { user_uuid: uuid },
  //   "POST"
  // )
  //   .then(async ({ data }) => {
  //     if (data.status) {
  //       return data.data;
  //     } else {
  //       throw new Error("Something went wrong");
  //     }
  //   })

  return data;
};
