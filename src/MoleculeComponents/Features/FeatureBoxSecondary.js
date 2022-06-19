import { StyleSheet } from 'react-native';
import React from 'react';
import { View, Text } from 'native-base';
import RoundImage from '../../AtomComponents/Image/RoundImage';
import { Button, Box } from 'native-base';
const FeatureBoxSecondary = (props) => {
  console.log(props);
  const { user } = props;
  const interest = user?.intrests[0];
  return (
    <View
      w='180'
      m='5'
      p='3'
      alignItems='center'
      bg='#fff'
      shadow='3'
      borderRadius='xl'
    >
      <RoundImage size='20' image={require('../../../assets/Images/1.png')} />
      <Text fontSize='md' fontWeight='bold'>
        {user.brand_name || user.agency_name || `${user.fname} ${user.lanme}`}
      </Text>
      <Box
        display='flex'
        flexDir='row'
        justifyContent='space-evenly'
        width='full'
      >
        <Box>
          <Text textAlign='center' fontWeight='900' fontSize='md'>
            {user.posts.length || '0'}
          </Text>
          <Text textAlign='center' fontSize='10'>
            Posts
          </Text>
        </Box>
        <Box>
          <Text textAlign='center' fontWeight='900' fontSize='md'>
            {user.posts.length || '0'}
          </Text>
          <Text textAlign='center' fontSize='10'>
            Connections
          </Text>
        </Box>
        <Box>
          <Text textAlign='center' fontWeight='900' fontSize='md'>
            {user.posts.length || '0'}
          </Text>
          <Text textAlign='center' fontSize='10'>
            Vouches
          </Text>
        </Box>
      </Box>
      <Text fontSize='10' my='5'>
        #1 Featured in {`${interest} & others`}
      </Text>
      <Button
        textAlign='center'
        bg='primary'
        w='3/4'
        height='8'
        p='0'
        rounded='xl'
        _text={{
          color: 'white',
          fontWeight: 'bold',
        }}
      >
        Connect
      </Button>
    </View>
  );
};

export default FeatureBoxSecondary;

const styles = StyleSheet.create({
  name: {
    fontSize: 11,
    color: '#000',
    fontWeight: '800',
  },
  number: {
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 2,
  },
  collab: {
    fontSize: 9,
    fontWeight: '300',
    textAlign: 'center',
    lineHeight: 9,
  },
});
