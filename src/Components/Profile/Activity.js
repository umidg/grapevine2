import { View, Text, Flex, Image, Box, Center } from 'native-base';
import React from 'react';

const Activity = () => {
  return (
    <View p={5}>
      <Box borderBottomWidth={0.5} pb='10%' borderBottomColor={'#a7a7a7'}>
        <Text fontSize={14} fontWeight='800' color='#000'>
          Activity
        </Text>
        <Text fontSize={12} fontWeight='300' color='#000' mt={1} mb={1}>
          Molly liked 4 posts
        </Text>
        <Flex
          direction='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <Flex direction='row' alignItems='center'>
            {[1, 2, 3, 4].map((d) => (
              <Image
                alt='image'
                key={d}
                source={require('../../../assets/Images/1.png')}
                alt='image'
                h={50}
                w={50}
              />
            ))}
          </Flex>
          <Text fontSize={13} fontWeight='800' color='#7949e7'>
            See all Activity
          </Text>
        </Flex>
      </Box>
      <Box
        borderBottomWidth={0.5}
        pt='5%'
        pb='5%'
        borderBottomColor={'#a7a7a7'}
      >
        <Text fontSize={14} fontWeight='800' color='#000'>
          About
        </Text>
        <Text fontSize={11} fontWeight='300' color='#8f8f8f' mt={1} mb={1}>
          is simply dummy text of the printing and typesetting industry. Lorem
          Ipsum has been the industrycenturies, but also the leap into
          electronic typesetting, has been the i centuries, but also the leap
          into electronic typesetting, has been the
        </Text>
      </Box>
      <Box
        borderBottomWidth={0.5}
        pt='5%'
        pb='5%'
        borderBottomColor={'#a7a7a7'}
      >
        <Text fontSize={14} fontWeight='800' color='#000'>
          Collaborations
        </Text>
        <Center>
          <Image
            alt='image'
            source={require('../../../assets/Images/1.png')}
            alt='image'
            h={50}
            w={50}
          />
        </Center>
      </Box>
      <Box
        borderBottomWidth={0.5}
        pt='5%'
        pb='5%'
        borderBottomColor={'#a7a7a7'}
      >
        <Text fontSize={14} fontWeight='800' color='#000'>
          Intrests
        </Text>
      </Box>
    </View>
  );
};

export default Activity;
