import React, { useContext } from "react";
import { Text, Box } from "native-base";
import { RegularImage } from "../../AtomComponents/index";
const NetworkContainer = () => {
  return (
    <Box>
      <Text textAlign="center" fontWeight="bold" italic>
        Molly's Networks
      </Text>
      <Box flex="1" flexDir="row" justifyContent="center">
        <RegularImage
          h={20}
          w={20}
          image={require("../../../assets/Icons/Instagram.png")}
        />

        <RegularImage
          h={20}
          w={20}
          image={require("../../../assets/Icons/Youtube.png")}
        />

        <RegularImage
          h={20}
          w={20}
          image={require("../../../assets/Icons/TikTok.png")}
        />
      </Box>

      <Box>
        <Box></Box>
      </Box>
    </Box>
  );
};

export default NetworkContainer;
