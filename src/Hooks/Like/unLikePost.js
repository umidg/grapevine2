import { useMutation, useQueryClient } from "react-query";
import { unLikePost } from "../../API/Like/unlikePost";

const UnLikePost = (onSuccessFunction, onErrorFunction) => {
  const queryClient = useQueryClient();
  return useMutation(unLikePost, {
    onSuccess: async (response) => {
      queryClient.invalidateQueries(["fetchPost", response.post_uuid]);
      onSuccessFunction();
    },
    onError: async (response) => {
      onErrorFunction();
    },
  });
};
export default UnLikePost;
