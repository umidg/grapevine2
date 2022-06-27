import { useMutation, useQueryClient } from "react-query";
import { uploadPost } from "../../API/Posts/uploadPost";
import { useNavigation } from "@react-navigation/native";

const UploadPost = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  return useMutation(uploadPost, {
    onSuccess: async (response) => {
      queryClient.setQueryData("fetchForYouPost", (data) => {
        let pages = data.pages;
        pages[0].result.unshift({ ...response, likes: [], comments: [] });
        return {
          pages: pages,
        };
      });
      queryClient.invalidateQueries("fetchForYouPost");
      navigation.navigate("Home");
    },
  });
};
export default UploadPost;
