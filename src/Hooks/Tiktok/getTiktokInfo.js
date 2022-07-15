import { useMutation, useQueryClient } from "react-query";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";
import { getToken } from "../../API/Tiktok/getToken";
import { getVideos } from "../../API/Tiktok/getVideos";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { connectAccount } from "../../API/Tiktok/connectAccount";
const GetTiktokInfo = () => {
  const queryClient = useQueryClient();

  const getTiktokInfo = async (code) => {
    const token = await getToken(code);
    // const videos = await getVideos(token);
    return {
      token: token.access_token,
      refresh_token: token.refresh_token,
      tiktok_open_id: token.open_id,
    };
  };

  const tiktokLogin = async (onSuccess) => {
    try {
      const result = await WebBrowser.openAuthSessionAsync(
        `https://admin.grapevine-app.co/tiktok/login?redirect=${Linking.createURL(
          ""
        )}`,
        Linking.createURL("")
      );
      if (result.url) {
        const data = Linking.parse(result.url);
        const tiktok_data = await getTiktokInfo(data.queryParams.code);
        const response = await onSuccess(tiktok_data);
        queryClient.invalidateQueries("LoginUserInfo");
      }
    } catch (err) {
      Toast.show("Something Went Wrong", {
        duration: Toast.durations.SHORT,
      });
      console.log(err, "netwotk container");
    }
  };

  return { tiktokLogin };
};
export default GetTiktokInfo;
