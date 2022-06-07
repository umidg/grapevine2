import React, { useState, useContext } from "react";
import { Box, View, Flex, Center, Text, Pressable } from "native-base";
import { Alert } from "react-native";
import { RegisterData } from "../../Context/RegisterContext";
import { AntDesign } from "@expo/vector-icons";

import { AtomComponents, Modal, Layout } from "../../Exports/index";

const ConnectNetworks = ({ navigation }) => {
  const { ButtonDark, ColorWrapper, RegularImage, Logo } = AtomComponents;
  const { LayoutFrame, BackLayout, LoginLayout } = Layout;
  const { TiktokLoginModel, InstagramLoginModel } = Modal;

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
      <BackLayout navigation={navigation}>
        <LoginLayout navigation={navigation}>
          <Box pt="15%" px={5} pb="30">
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
                            <AntDesign
                              name="check"
                              size={18}
                              color="#00ff00"
                              p="2"
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
                            <AntDesign
                              name="check"
                              size={18}
                              color="#00ff00"
                              p="2"
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
                            <AntDesign
                              name="check"
                              size={18}
                              color="#00ff00"
                              p="2"
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
          </Box>
        </LoginLayout>
      </BackLayout>
    </LayoutFrame>
  );
};

export default ConnectNetworks;
