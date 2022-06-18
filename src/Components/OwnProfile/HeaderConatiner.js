import {
  Box,
  Text,
  Avatar,
  Divider,
  Button,
  Flex,
  Pressable,
} from "native-base";
import { Feather, AntDesign } from "@expo/vector-icons";
import { DropDownMenu } from "../../MoleculeComponents";
const HeaderContainer = (props) => {
  const {
    user: {
      username,
      image,
      posts,
      follwers,
      connections,
      engagement_type,
      fname,
      lname,
      id,
      uuid,
      description,
      about,
    },
    navigation,
    logout,
  } = props;
  return (
    <Box w="full" p="5">
      <Box flex="1" flexDir="row">
        <Box
          alignSelf="center"
          justifyContent="center"
          mr="5"
          alignContent="center"
        >
          <Avatar
            alignSelf="center"
            justifyContent="center"
            source={{
              uri: image
                ? image
                : "https://wallpaperaccess.com/full/317501.jpg",
            }}
            size="20"
          />
          <Text
            textAlign="center"
            bg="primary"
            color="#fff"
            borderRadius={"md"}
            mt="2"
          >
            {/* TODO bipul  colors*/}

            {engagement_type}
            <AntDesign name="check" size={12} color="white" />
          </Text>
          <Text
            fontWeight="bold"
            fontSize="12"
            mt="2"
            textAlign="center"
          >{`${fname} ${lname}`}</Text>
        </Box>
        <Box flex="1">
          <Text fontWeight="bold" mb="2">
            @{username}
          </Text>
          <Box flex="1" flexDir="row">
            <Box flexDir="column" alignItems="center">
              <Text fontSize="xl" fontWeight="bold">
                {posts?.length > 0 ? `${posts.length}` : "2K"}
              </Text>
              <Text fontSize="10">Posts</Text>
            </Box>
            <Divider h="8" bg="gray.200" orientation="vertical" m="auto" />
            <Box flexDir="column" alignItems="center">
              <Text fontSize="xl" fontWeight="bold">
                {follwers ?? "4M"}
              </Text>
              <Text fontSize="10">Followers</Text>
            </Box>
            <Divider h="8" bg="gray.200" orientation="vertical" m="auto" />
            <Box flexDir="column" alignItems="center">
              <Text fontSize="xl" fontWeight="bold">
                {connections ?? "100+"}
              </Text>
              <Text fontSize="10">Connections</Text>
            </Box>
          </Box>
          <Box mt="2">
            <Text fontSize="10" fontWeight="bold" mb="1">
              Top 5.8% of all creators
            </Text>
          </Box>
          <Flex direction="row" alignItems={"center"} justifyContent="center">
            <Button
              h="7"
              pt="0"
              pb="0"
              bg="primary"
              flex={1}
              onPress={() =>
                navigation.navigate("Edit_Profile", {
                  description: description,
                  about: about,
                })
              }
            >
              Edit Profile
            </Button>

            <DropDownMenu
              icon={<Feather name="more-vertical" size={24} color="black" />}
              options={[{ text: "Logout", onPress: logout }]}
            />
          </Flex>
        </Box>
      </Box>
      <Box>
        <Text fontSize="12" color="gray.500" pt="2">
          {description
            ? description
            : " is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrycenturies, but also the leap into electronic typesetting, has been the industrycenturies, but als has been the industrycenrem …more"}
        </Text>
      </Box>
    </Box>
  );
};

export default HeaderContainer;
