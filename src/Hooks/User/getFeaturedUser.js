import { getFeaturedUser } from "../../API/User/getFeaturedUser";
import { useQuery } from "react-query";
const GetFeaturedUser = ({ page, limit, filter }) => {
  return useQuery(
    "fetchFeaturedUsers",
    () => getFeaturedUser(page, limit, filter),
    {
      notifyOnNetworkStatusChange: true,
    }
  );
};
export default GetFeaturedUser;
