import React from "react";
import { Box, Flex, Text, Input } from "native-base";
import RoundImage from "../../../AtomComponents/Image/RoundImage";
const CommentsContainer = ({ comments }) => {
  const data = [1, 2];
  return (
    <Box w="100%">
      {[...comments].splice(0, 4).map((d) => {
        return (
          <Flex direction="row" key={d.uuid} m="2px">
            <Text fontSize="9px" fontWeight="800">
              {d.username}
            </Text>
            <Text fontSize="9px" fontWeight="300">
              {d.comment_text}
            </Text>
          </Flex>
        );
      })}

      <Box
        height={10}
        width={"80%"}
        borderRadius="md"
        borderWidth={2}
        alignItems="flex-start"
        justifyContent={"center"}
        _text={{
          fontWeight: "300",
          fontSize: "9px",
          ml: "2px",
        }}
      >
        Comment here...
      </Box>
    </Box>
  );
};

export default CommentsContainer;
