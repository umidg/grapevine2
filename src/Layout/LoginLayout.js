import React from "react";
import { Box, Text, Flex } from "native-base";
import { TouchableOpacity } from "react-native";
const LoginLayout = (props) => {
  const { navigate = "Login", navigation, children } = props;
  const onPress = () => {
    switch (navigate) {
      case "pop": {
        navigation.pop();
        break;
      }
      default: {
        navigation.navigate(navigate);
      }
    }
  };

  return (
    // <>
    //   <Box position="absolute" bottom="7%" zIndex={1000}>
    //     <TouchableOpacity onPress={onPress}>
    //       <Text
    //         fontSize={13}
    //         fontWeight="800"
    //         color="#fff"
    //         textAlign={"center"}
    //         mb={2}
    //         fontStyle="italic"
    //       >
    //         Already have an account? <Text color="buttonDark">Login</Text>
    //       </Text>
    //     </TouchableOpacity>
    //   </Box>
    //   {children}
    // </>
    <Flex
      h="100%"
      w="100%"
      direction="column"
      justifyContent={"space-around"}
      alignItems="center"
      zIndex={1000}
    >
      <Box w="100%">{children}</Box>
      <TouchableOpacity onPress={onPress}>
        <Text
          fontSize={13}
          fontWeight="800"
          color="#fff"
          textAlign={"center"}
          mb={2}
          fontStyle="italic"
        >
          Already have an account? <Text color="dark">Login</Text>
        </Text>
      </TouchableOpacity>
    </Flex>
  );
};

export default LoginLayout;
