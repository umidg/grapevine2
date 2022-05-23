import React, { useContext } from "react";
import LayoutFrame from "../../Layout/LayoutFrame";
import { Box, Text, View } from "native-base";
import Logo from "../../AtomComponents/Logo/Logo";
import ButtonLight from "../../AtomComponents/Buttons/ButtonLight";
import ShowLogInText from "../../MoleculeComponents/ShowLogInText";
import InputUsername from "../../AtomComponents/Input/InputUsername";
import ButtonDark from "../../AtomComponents/Buttons/ButtonDark";
import BackIcon from "../../AtomComponents/BackIcon/BackIcon";
import { RegisterData } from "../../Context/RegisterContext";

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
      <Box
        h="100%"
        w="100%"
        bg="loginPageBg"
        pt="15%"
        px={5}
        justifyContent={"space-between"}
      >
        <BackIcon onPress={() => navigation.pop()} />
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
        <ShowLogInText onPress={() => navigation.navigate("Login")} />
      </Box>
    </LayoutFrame>
  );
};

export default BrandCreator;
