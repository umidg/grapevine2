import { StyleSheet } from 'react-native';
import React from 'react';
import { View, Text, Pressable } from 'native-base';
import RoundImage from '../../AtomComponents/Image/RoundImage';
import { Button, Box } from 'native-base';
import { useNavigation } from '@react-navigation/native';

const FeatureBoxSecondary = (props) => {
  const {
    item: { item },
  } = props;
  const interest = item?.intrests[0];
  const navigation = useNavigation();

  return (
    <Pressable
      w='200'
      m='2'
      p='5'
      alignItems='center'
      bg='#fff'
      shadow='3'
      borderRadius='xl'
      key={item.uuid}
      onPress={() =>
        navigation.navigate('FriendProfile', {
          user_uuid: item.uuid,
        })
      }
    >
      <RoundImage size='16' image={require('../../../assets/Images/1.png')} />
      <Text fontSize='md' fontWeight='bold'>
        {item.brand_name || item.agency_name || `${item.fname} ${item.lname}`}
      </Text>
      <Box
        display='flex'
        flexDir='row'
        justifyContent='space-evenly'
        width='full'
        mt='5'
      >
        <Box>
          <Text textAlign='center' fontWeight='900' fontSize='md'>
            {item._count.posts || '0'}
          </Text>
          <Text textAlign='center' fontSize='10'>
            Posts
          </Text>
        </Box>
        <Box>
          <Text textAlign='center' fontWeight='900' fontSize='md'>
            {item._count.connections || '0'}
          </Text>
          <Text textAlign='center' fontSize='10'>
            Connections
          </Text>
        </Box>
        <Box>
          <Text textAlign='center' fontWeight='900' fontSize='md'>
            {item._count.followers || '0'}
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
    </Pressable>
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
