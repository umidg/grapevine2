import { useMutation, useQueryClient } from "react-query";
import { useNavigation } from "@react-navigation/native";
import { createChatroom } from "../../API/Friend/createChatroom";

const CreateChatroom = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  return useMutation(createChatroom, {
    onSuccess: async (response) => {
      console.log(response, "response");
      //   queryClient.invalidateQueries(["User", response.user_request]);
      //   queryClient.invalidateQueries(["Partial_User", response.user_request]);
    },
  });
};
export default CreateChatroom;
