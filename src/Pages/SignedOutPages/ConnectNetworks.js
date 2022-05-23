import React, { useState, useContext } from "react";
import LayoutFrame from "../../Layout/LayoutFrame";
import { Box, View, Flex, Center, Text, Pressable } from "native-base";
import Logo from "../../AtomComponents/Logo/Logo";
import ButtonLight from "../../AtomComponents/Buttons/ButtonLight";
import ShowLogInText from "../../MoleculeComponents/ShowLogInText";
import ColorWrapper from "../../AtomComponents/ColorWrapper/ColorWrapper";
import RegularImage from "../../AtomComponents/Image/RegularImage";
import ButtonDark from "../../AtomComponents/Buttons/ButtonDark";
import BackIcon from "../../AtomComponents/BackIcon/BackIcon";
import InstagramLoginModel from "../../Modal/InstagramLoginModel";
import TiktokLoginModel from "../../Modal/TiktokLoginModel";
import { Alert } from "react-native";
import { RegisterData } from "../../Context/RegisterContext";

const ConnectNetworks = ({ navigation }) => {
  const [showInstaModal, setShowInstaModal] = useState(false);
  const [showTiktokModal, setShowTiktokModal] = useState(false);
  const [data, setData] = useContext(RegisterData);

  const instagramLoginSuccess = (token) => {
    setData({ ...data, instagramToken: token });
  };
  const tiktokLoginSuccess = ({ token, posts, refresh_token }) => {
    setData({
      ...data,
      tiktokToken: token,
      tiktokPost: posts,
      tiktok_refresh_token: refresh_token,
    });
  };
  return (
    <LayoutFrame>
      <Box
        h="100%"
        w="100%"
        bg="loginPageBg"
        pt="15%"
        px={5}
        pb="30"
        justifyContent={"space-between"}
      >
        <BackIcon onPress={() => navigation.pop()} />

        <Box>
          <InstagramLoginModel
            show={showInstaModal}
            close={() => setShowInstaModal(false)}
            loginSuccess={(d) => instagramLoginSuccess(d)}
          />
          <TiktokLoginModel
            show={showTiktokModal}
            close={() => setShowTiktokModal(false)}
            loginSuccess={(d) => tiktokLoginSuccess(d)}
          />
          <View>
            <View w="100%" alignItems="center">
              <Logo />
              <Text
                fontSize="17"
                color="#fff"
                fontWeight="800"
                textAlign="center"
                mt="2"
              >
                Connect your network
              </Text>
            </View>
            <Center>
              <Center mt={19} w="80%">
                <Flex
                  flexDirection="row"
                  justifyContent="space-around"
                  w="70%"
                  mb="10"
                >
                  <Pressable onPress={() => setShowInstaModal(true)}>
                    <ColorWrapper>
                      <RegularImage
                        h={30}
                        w={30}
                        image={require("../../../assets/Icons/Instagram_light.png")}
                      />
                    </ColorWrapper>
                    {data.instagramToken && (
                      <Center>
                        <RegularImage
                          h={10}
                          w={10}
                          image={require("../../../assets/Icons/Tick_green.png")}
                        />
                      </Center>
                    )}
                  </Pressable>
                  <Pressable
                    onPress={() =>
                      Alert.alert("Error", "This feature is comming soon")
                    }
                  >
                    <ColorWrapper>
                      <RegularImage
                        h={30}
                        w={30}
                        image={require("../../../assets/Icons/Youtube_light.png")}
                      />
                    </ColorWrapper>
                    {data.googleToken && (
                      <Center>
                        <RegularImage
                          h={10}
                          w={10}
                          image={require("../../../assets/Icons/Tick_green.png")}
                        />
                      </Center>
                    )}
                  </Pressable>
                  <Pressable onPress={() => setShowTiktokModal(true)}>
                    <ColorWrapper>
                      <RegularImage
                        h={30}
                        w={30}
                        image={require("../../../assets/Icons/TikTok_light.png")}
                      />
                    </ColorWrapper>
                    {data.tiktokToken && (
                      <Center>
                        <RegularImage
                          h={10}
                          w={10}
                          image={require("../../../assets/Icons/Tick_green.png")}
                        />
                      </Center>
                    )}
                  </Pressable>
                </Flex>
                <ButtonDark
                  onPress={() => navigation.navigate("EnterUsername")}
                >
                  <Text fontSize={14} color="#fff" fontWeight={"800"}>
                    Next
                  </Text>
                </ButtonDark>
                <Box onPress={() => navigation.navigate("EnterUsername")}>
                  <Text fontSize="14" color="#fff" fontWeight="300" mt="5">
                    Skip
                  </Text>
                </Box>
              </Center>
            </Center>
          </View>
        </Box>
        <ShowLogInText onPress={() => navigation.navigate("Login")} />
      </Box>
    </LayoutFrame>
  );
};

export default ConnectNetworks;
