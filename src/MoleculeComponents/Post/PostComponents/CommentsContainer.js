import React from "react";
import { Box, Flex, Text } from "native-base";

const CommentsContainer = ({ comments }) => {
  const data = [1, 2];
  return (
    <Box w="100%">
      {data.map((d) => {
        return (
          <Flex direction="row" key={d} m="2px">
            <Text fontSize="9px" fontWeight="800">
              @jidemikey:{" "}
            </Text>
            <Text fontSize="9px" fontWeight="300">
              {" "}
              Hey check your inb…
            </Text>
          </Flex>
        );
      })}
    </Box>
  );
};

export default CommentsContainer;
