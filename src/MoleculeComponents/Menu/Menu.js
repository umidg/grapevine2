import { Text, Box, Pressable, Menu } from "native-base";
import React, { useState, memo } from "react";
const DropDownMenu = ({ icon, options, textStyle }) => {
  const [shouldOverlapWithTrigger] = useState(false);
  return (
    <Menu
      shouldOverlapWithTrigger={shouldOverlapWithTrigger}
      trigger={(triggerProps) => {
        return (
          <Pressable {...triggerProps}>
            <Box>{icon}</Box>
          </Pressable>
        );
      }}
    >
      {options &&
        options.map(({ text, onPress }) => {
          return (
            <Menu.Item onPress={onPress} key={text} p={0}>
              <Text
                fontWeight={"800"}
                fontSize={16}
                textAlign="center"
                color="primary"
                mx={5}
                my={0}
                {...textStyle}
              >
                {text}
              </Text>
            </Menu.Item>
          );
        })}
    </Menu>
  );
};

export default DropDownMenu;
