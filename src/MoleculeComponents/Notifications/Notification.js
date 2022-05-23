import React from "react";
import { Box, Center, Flex, Text, Image, Button, Pressable } from "native-base";
import RoundImage from "../../AtomComponents/Image/RoundImage";
const Notification = ({
  profileImage,
  username,
  message,
  component,
  time,
  onPress,
}) => {
  return (
    <Pressable onPress={onPress && onPress}>
      <Flex direction="row" alignItems="center" p="2px" mb="10px">
        <Box>
          <RoundImage size={40} image={profileImage} />
        </Box>
        <Flex direction="row" alignItems="center" pl="10px" pr="10px">
          <Box flex={5}>
            {username && (
              <Text fontSize="14px" fontWeight="800" mt="0px">
                {username}
              </Text>
            )}
            <Text fontSize="13px" fontWeight="300" ml="5px">
              {message}{" "}
              <Text fontSize="12px" color="gray.500">
                {time}
              </Text>
            </Text>
          </Box>
          {component ? (
            <Box flex={2} pl="20px" pr="20px">
              {component}
            </Box>
          ) : (
            <Box></Box>
          )}
        </Flex>
      </Flex>
    </Pressable>
  );
};

export default Notification;
