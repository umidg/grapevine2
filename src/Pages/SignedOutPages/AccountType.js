import React, { useState, useContext } from "react";
import LayoutFrame from "../../Layout/LayoutFrame";
import { Box, Text, Center, View, Select, CheckIcon } from "native-base";
import Logo from "../../AtomComponents/Logo/Logo";
import ShowLogInText from "../../MoleculeComponents/ShowLogInText";
import BackIcon from "../../AtomComponents/BackIcon/BackIcon";
import ButtonDark from "../../AtomComponents/Buttons/ButtonDark";
import { RegisterData } from "../../Context/RegisterContext";

const AccountType = ({ navigation }) => {
  const [data, setData] = useContext(RegisterData);
  const [showDropDown, setShowDropDown] = useState(false);
  const type = ["Brand", "Agency"];
  const SetAccountType = (type) => {
    if (type == data.account_type) {
      setData({ ...data, account_type: null });
    } else {
      setData({ ...data, account_type: type });
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
              fontSize={17}
              color="#fff"
              fontWeight={"800"}
              textAlign="center"
              mt="2"
              italic
            >
              Account Type
            </Text>
          </View>
          <Center mt="15">
            <ButtonDark
              w="70%"
              h={10}
              onPress={() => SetAccountType("User")}
              bg={
                data.account_type == "User" ? "buttonDarkClick" : "buttonDark"
              }
            >
              <Text fontSize={14} color="#fff" fontWeight={"800"}>
                User Account
              </Text>
            </ButtonDark>
            <ButtonDark
              w="70%"
              h={10}
              onPress={() => setShowDropDown(!showDropDown)}
            >
              <Text fontSize={14} color="#fff" fontWeight={"800"}>
                Business Account
              </Text>
            </ButtonDark>
            {showDropDown && (
              <Center>
                <Select
                  bg="rgba(61,54,130,0.6705882352941176)"
                  borderRadius={"md"}
                  height="10"
                  width="70%"
                  selectedValue={data.account_type ? data.account_type : " "}
                  minWidth="200"
                  color={"#fff"}
                  fontWeight="800"
                  accessibilityLabel="Choose "
                  placeholder="Choose "
                  _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5" />,
                  }}
                  borderWidth="0"
                  mt={1}
                  onValueChange={(itemValue) => SetAccountType(itemValue)}
                >
                  {type.map((t) => (
                    <Select.Item label={t} value={t} key={t} />
                  ))}
                </Select>
              </Center>
            )}
          </Center>
        </View>
        <Center>
          {data.account_type ? (
            <ButtonDark
              w="80%"
              bg="buttonDark"
              onPress={() => {
                if (data.account_type == "User")
                  navigation.navigate("Register");
                else if (data.account_type == "Brand") {
                  navigation.navigate("Register_Brand");
                } else navigation.navigate("Register_Agency");
              }}
            >
              <Text fontSize={14} color="#fff" fontWeight={"800"}>
                Next
              </Text>
            </ButtonDark>
          ) : (
            <ButtonDark w="80%" bg="buttonDarkClick">
              <Text fontSize={14} color="#fff" fontWeight={"800"}>
                Next
              </Text>
            </ButtonDark>
          )}
          <View style={[{ marginTop: 20 }]}>
            <ShowLogInText onPress={() => navigation.navigate("Login")} />
          </View>
        </Center>
      </Box>
    </LayoutFrame>
  );
};

export default AccountType;
