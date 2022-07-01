import { getuserInfo } from "../../API/User/getUserInfo";
import { useQuery } from "react-query";
import { useContext } from "react";
import { UserValue } from "../../Context/UserContext";
const GetLoginUser = () => {
  const [user, setUser] = useContext(UserValue);
  return useQuery("LoginUserInfo", () => getuserInfo(user.uuid), {
    notifyOnNetworkStatusChange: true,
  });
};
export default GetLoginUser;
