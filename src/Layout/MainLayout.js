import React from "react";
import { ScrollView, Box, Center } from "native-base";

const LayoutFrame = ({ children }) => (
  <Box flex={1} bg="primary" w="100%">
    <Center flex={1}> {children}</Center>
  </Box>
);

export default LayoutFrame;
