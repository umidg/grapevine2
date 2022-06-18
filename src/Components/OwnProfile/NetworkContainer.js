import React from 'react';
import { Text, Box } from 'native-base';
import { Entypo } from '@expo/vector-icons';
import { RegularImage } from '../../AtomComponents/index';
const NetworkContainer = () => {
  return (
    <Box>
      <Text textAlign='center' fontWeight='bold' italic>
        Molly's Networks
      </Text>
      <Box flex='1' flexDir='row' justifyContent='center'>
        <RegularImage
          h={20}
          w={20}
          image={require('../../../assets/Logo/logo(1).png')}
        />
        <RegularImage
          h={20}
          w={20}
          image={require('../../../assets/Icons/instagram_color.png')}
        />
        <RegularImage
          h={20}
          w={20}
          image={require('../../../assets/Icons/TikTok.png')}
        />
        <RegularImage
          h={20}
          w={20}
          image={require('../../../assets/Icons/youtube_color.png')}
        />
      </Box>

      <Box>
        <Box></Box>
      </Box>
    </Box>
  );
};

export default NetworkContainer;
