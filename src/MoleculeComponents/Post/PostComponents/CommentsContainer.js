import React from 'react';
import { Box, Flex, Text, Input } from 'native-base';
import RoundImage from '../../../AtomComponents/Image/RoundImage';
const CommentsContainer = ({ comments }) => {
  const data = [1, 2];

  const totalComments = comments?.length;

  return (
    <Box w='100%'>
      {[...comments].splice(0, 3).map((d) => {
        return (
          <Flex direction='row' key={d.uuid}>
            <Text fontSize='12' fontWeight='700' fontFamily='bold'>
              {d.user.username}{' '}
            </Text>
            <Text fontSize='12' fontWeight='400' fontFamily='light'>
              {d.comment_text}
            </Text>
          </Flex>
        );
      })}
      <Box>
        {totalComments > 3 ? (
          <Text fontSize='12' color='gray.500' fontFamily='light'>
            View all {comments.length} comments
          </Text>
        ) : (
          <Text fontSize='12' color='gray.500' fontFamily='light'>
            Add a comment
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default CommentsContainer;
