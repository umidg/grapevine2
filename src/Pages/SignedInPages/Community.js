import React from "react";
import { Box } from "native-base";
import { SignInLayout } from "../../Layout/index";
import { CommunityPosts } from "../../MoleculeComponents/index";

const Community = () => {
  const data = [1, 2, 3, 4, 5];
  return (
    <SignInLayout>
      <Box h="100%" w="100%" alignItems={"center"}>
        {data.map((d) => {
          return <CommunityPosts key={d} />;
        })}
      </Box>
    </SignInLayout>
  );
};

export default Community;
