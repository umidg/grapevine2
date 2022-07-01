import {
  Box,
  Text,
  Avatar,
  Divider,
  Button,
  Flex,
  Pressable,
} from "native-base";
import { Feather, AntDesign, FontAwesome } from "@expo/vector-icons";
import { DropDownMenu } from "../../MoleculeComponents";
import { Ionicons } from "@expo/vector-icons";

const HeaderContainer = (props) => {
  const {
    user: {
      username,
      image,

      engagement_type,
      fname,
      lname,
      id,
      uuid,
      description,
      about,
      _count,
    },
    navigation,
    logout,
  } = props;
  return (
    <Box w="full" p="5" pb="0">
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection="row"
        flex="1"
      >
        <Box>
          <Box
            borderWidth="3"
            borderColor="primary"
            rounded="full"
            display="flex"
            flex="0.3"
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
              m="0.5"
            />
          </Box>
          <Box
            textAlign="center"
            bg="primary"
            borderRadius="md"
            mt="2"
            display="flex"
            justifyContent="center"
            flexDirection="row"
          >
            <Text color="white" fontWeight="extrabold" fontSize="14">
              {engagement_type}{" "}
              <FontAwesome name="check" size={12} color="white" />
            </Text>
          </Box>
          <Text
            fontWeight="bold"
            fontSize="14"
            mt="2"
            textAlign="center"
          >{`${fname.charAt(0).toUpperCase()}${fname.slice(1)} ${lname
            .charAt(0)
            .toUpperCase()}${lname.slice(1)}`}</Text>
        </Box>
        <Box flex="1" ml="10">
          <Text fontWeight="bold" mb="2">
            @{username}
          </Text>
          <Box flex="1" flexDir="row" mb="0">
            <Box flexDir="column" alignItems="center">
              <Text fontSize="xl" fontWeight="bold">
                {_count.posts ?? "2K"}
              </Text>
              <Text fontSize="10">Posts</Text>
            </Box>
            <Divider h="8" bg="gray.200" orientation="vertical" m="auto" />
            <Box flexDir="column" alignItems="center">
              <Text fontSize="xl" fontWeight="bold">
                {_count.followers ?? "4M"}
              </Text>
              <Text fontSize="10">Followers</Text>
            </Box>
            <Divider h="8" bg="gray.200" orientation="vertical" m="auto" />
            <Box flexDir="column" alignItems="center">
              <Text fontSize="xl" fontWeight="bold">
                {_count.connections ?? "100+"}
              </Text>
              <Text fontSize="10">Connections</Text>
            </Box>
          </Box>
          <Box flex="1">
            <Text fontSize="10" fontWeight="bold" mb="1">
              Top 5.8% of all creators
            </Text>

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
                _text={{
                  fontWeight: "700",
                }}
              >
                Edit Profile
              </Button>

              <DropDownMenu
                icon={<Feather name="more-vertical" size={24} color="black" />}
                options={[
                  {
                    text: "Logout",
                    onPress: logout,
                    icon: (
                      <Ionicons
                        name="information-circle-outline"
                        size={16}
                        color="gray"
                      />
                    ),
                  },
                ]}
              />
            </Flex>
          </Box>
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
