import React from "react";
import { Box } from "native-base";
import CommunityPosts from "../../MoleculeComponents/CommunityPost/CommunityPosts";
import LayoutFrame from "../../Layout/LayoutFrame";

const Community = () => {
  const data = [1, 2, 3, 4, 5];
  return (
    <LayoutFrame>
      <Box h="100%" w="100%" alignItems={"center"}>
        {data.map((d) => {
          return <CommunityPosts key={d} />;
        })}
      </Box>
    </LayoutFrame>
  );
};

export default Community;
