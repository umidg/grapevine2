import React, { useContext } from "react";
import { LayoutFrame, BackLayout, LoginLayout } from "../../Layout/index";
import { Box, Text, View } from "native-base";
import { RegisterData } from "../../Context/RegisterContext";

import { ButtonDark, Logo } from "../../AtomComponents/index";
const BrandCreator = ({ navigation }) => {
  const [data, setData] = useContext(RegisterData);

  const validate = (collaborate) => {
    setData({ ...data, collaborate: collaborate });
    if (data.account_type == "User") {
      navigation.navigate("InterestsCreator");
    } else if (data.account_type == "Brand") {
      navigation.navigate("InterestsBrand");
    }
  };
  return (
    <LayoutFrame>
      <BackLayout navigation={navigation}>
        <LoginLayout navigation={navigation}>
          <Box pt="15%" px={5}>
            <View>
              <View w="100%" alignItems={"center"}>
                <Logo />
                <Text
                  fontSize="17"
                  color="#fff"
                  fontWeight="800"
                  textAlign="center"
                  mt="2"
                  italic
                >
                  Would you like to collaborate with brands?
                </Text>
                <Text
                  fontSize="13"
                  color="#fff"
                  fontWeight="300"
                  textAlign="center"
                  mt="5"
                >
                  This includes gifting!
                </Text>
              </View>
              <View alignItems={"center"} mt="19">
                <ButtonDark w="70%" h={10} onPress={() => validate(true)}>
                  <Text fontSize="17" color="#fff" fontWeight="800">
                    Yes
                  </Text>
                </ButtonDark>
                <ButtonDark w="70%" h={10} onPress={() => validate(false)}>
                  <Text fontSize="17" color="#fff" fontWeight="800">
                    No
                  </Text>
                </ButtonDark>
              </View>
            </View>
          </Box>
        </LoginLayout>
      </BackLayout>
    </LayoutFrame>
  );
};

export default BrandCreator;
