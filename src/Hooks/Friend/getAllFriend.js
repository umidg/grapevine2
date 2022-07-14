import { getAllFriends } from "../../API/Friend/getAllFriends";
import { useQuery } from "react-query";
const GetAllFriends = (uuid) => {
  return useQuery(["getFriends"], () => getAllFriends(uuid));
};
export default GetAllFriends;
