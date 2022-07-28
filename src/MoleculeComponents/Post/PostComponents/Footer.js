import React from "react";
import CommentsContainer from "./CommentsContainer";
import { Box, Center, Text, Image, Flex, Pressable } from "native-base";

const Footer = ({ post, footer, user }) => {
  switch (footer) {
    case "interraction":
      return <CommentsContainer comments={post.comments} user={user} />;

    case "product":
      return (
        <Box width={"100%"}>
          {post.products.map((_product) => {
            return (
              <Flex
                direction="row"
                justifyContent={"flex-start"}
                alignItems="center"
                p={1}
                key={_product.uuid}
                borderBottomColor={"#d3d3d3"}
                borderBottomWidth={1}
                borderTopColor="#d3d3d3"
                borderTopWidth={1}
              >
                <Image
                  source={require("../../../../assets/Images/2.png")}
                  alt="img"
                  h={"20"}
                  w={"20"}
                  flex={1}
                />
                <Box flex={4} px={2}>
                  <Text fontWeight={"400"}>{_product.name}</Text>
                  <Text fontWeight={"800"}>$25</Text>
                </Box>
              </Flex>
            );
          })}
        </Box>
      );
    default:
      return <CommentsContainer comments={post.comments} user={user} />;
  }
};

export default Footer;
