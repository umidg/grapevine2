import { useMutation, useQueryClient } from "react-query";
import { sharePost } from "../../API/Posts/sharePost";
import Toast from "react-native-root-toast";

const SharePost = (closeModel) => {
  const queryClient = useQueryClient();
  return useMutation(sharePost, {
    onSuccess: async (response) => {
      console.log(response, "shared post");
      Toast.show("Post Shared", {
        duration: Toast.durations.LONG,
      });
      queryClient.invalidateQueries("fetchForYouPost");
      closeModel();
    },
  });
};
export default SharePost;
