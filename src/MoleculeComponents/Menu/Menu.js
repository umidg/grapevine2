import { Text, Box, Pressable, Menu } from 'native-base';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
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
              <Box
                flex='1'
                flexDir='row'
                justifyContent='flex-start'
                mx='5'
                alignItems='center'
              >
                <Ionicons
                  name='information-circle-outline'
                  size={16}
                  color='gray'
                />
                <Text
                  fontWeight={'500'}
                  fontSize={12}
                  textAlign='center'
                  color='gray.500'
                  my={0}
                  {...textStyle}
                >
                  {text}
                </Text>
              </Box>
            </Menu.Item>
          );
        })}
    </Menu>
  );
};

export default DropDownMenu;
