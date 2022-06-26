import {
  View,
  Text,
  Box,
  Flex,
  Center,
  Image,
  Spinner,
  Button,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { grapevineBackend } from '../../API';
import { AntDesign } from '@expo/vector-icons';
import {
  MolecularComponents,
  Layout,
  AtomComponents,
} from '../../Exports/index';
import { Pressable } from 'react-native';
export default function AllCreatorPage({ navigation }) {
  const [creators, setCreators] = useState(null);
  const [filter, setShowFilter] = useState(false);
  const { SignInLayout, BackLayout } = Layout;
  const { RoundImage } = AtomComponents;
  const { DropDownMenu } = MolecularComponents;
  useEffect(() => {
    grapevineBackend('/user/getCreators?limit=20', {}, 'POST')
      .then(({ data }) => {
        if (data.status) {
          setCreators([...data.data.result]);
        }
      })
      .catch((err) => {
        setCreators([]);
        console.log(error);
      });
  }, []);
  return (
    <BackLayout navigation={navigation} color='#000' safeArea>
      <Box w='100%' h='100%' alignItems={'center'} bg='#fff'>
        <Text fontWeight='800' fontSize={16} textAlign='center' mb='5'>
          All Creators
        </Text>
        {filter && (
          <View w='100%' h='100%' bg='white' px={5}>
            <Flex
              direction='column'
              alignItems={'center'}
              justifyContent='space-between'
              height={'100%'}
            >
              <Box w='100%'>
                <Flex
                  direction='row'
                  alignItems={'center'}
                  justifyContent='flex-start'
                >
                  <Pressable onPress={() => setShowFilter(false)} p={2}>
                    <AntDesign name='close' size={18} color='black' />
                  </Pressable>
                </Flex>
                <Flex
                  direction='row'
                  alignItems={'center'}
                  justifyContent='space-between'
                  px={2}
                  py={5}
                  mt={2}
                  borderBottomColor='#d3d3d3'
                  borderBottomWidth={1}
                >
                  <Text fontSize={16} fontWeight='800'>
                    Gender
                  </Text>
                  <Text fontSize={14} fontWeight='600' color='#a6a6a6'>
                    All
                  </Text>
                </Flex>
                <Flex
                  direction='row'
                  alignItems={'center'}
                  justifyContent='space-between'
                  px={2}
                  py={5}
                  mt={2}
                  borderBottomColor='#d3d3d3'
                  borderBottomWidth={1}
                >
                  <Text fontSize={16} fontWeight='800'>
                    Content Type
                  </Text>
                  <Text fontSize={14} fontWeight='600' color='#a6a6a6'>
                    Skincare, Health & We ...
                  </Text>
                </Flex>
                <Flex
                  direction='row'
                  alignItems={'center'}
                  justifyContent='space-between'
                  px={2}
                  py={5}
                  mt={2}
                  borderBottomColor='#d3d3d3'
                  borderBottomWidth={1}
                >
                  <Text fontSize={16} fontWeight='800'>
                    Audience Size
                  </Text>
                  <Text fontSize={14} fontWeight='600' color='#a6a6a6'>
                    25k-50k
                  </Text>
                </Flex>
                <Flex
                  direction='row'
                  alignItems={'center'}
                  justifyContent='space-between'
                  px={2}
                  py={5}
                  mt={2}
                  borderBottomColor='#d3d3d3'
                  borderBottomWidth={1}
                >
                  <Text fontSize={16} fontWeight='800'>
                    City
                  </Text>
                  <Text fontSize={14} fontWeight='600' color='#a6a6a6'>
                    London
                  </Text>
                </Flex>
              </Box>
              <Box width={'100%'}>
                <Button
                  bg='primary'
                  width='100%'
                  height={10}
                  _text={{
                    fontWeight: '800',
                  }}
                >
                  {'See ' + creators.length + ' Creators'}
                </Button>
              </Box>
            </Flex>
          </View>
        )}
        <Flex
          direction='row'
          alignItems={'center'}
          justifyContent='center'
          p={3}
          borderWidth={1}
          borderColor='#d3d3d3'
        >
          <Box flex={1} borderRightWidth={1} borderRightColor='#d3d3d3'>
            <DropDownMenu
              icon={
                <Text fontWeight={'800'} fontSize={16} textAlign='center'>
                  SORT
                </Text>
              }
              options={[
                {
                  text: 'Recommended',
                  icon: (
                    <Box h={2} w={2} bg='primary' borderRadius={'full'}></Box>
                  ),
                },
                { text: 'Audience: Low to High' },
                { text: 'Audience: High to Low' },
                { text: 'Most Popular' },
              ]}
              textStyle={{
                textAlign: 'left',

                width: '80%',
                padding: '2',
                borderBottomWidth: '1',
                borderBottomColor: '#d3d3d3',
              }}
            />
          </Box>
          <Box flex={1}>
            <Pressable onPress={() => setShowFilter(true)}>
              <Text fontWeight={'800'} fontSize={16} textAlign='center'>
                FILTER
              </Text>
            </Pressable>
          </Box>
        </Flex>

        {creators ? (
          <>
            {creators.length > 0 ? (
              <Box width={'100%'}>
                <Text my={3} fontWeight='800' textAlign={'center'}>
                  {creators.length} creator found
                </Text>
                {creators.map((creator) => {
                  return (
                    <Flex
                      direction='row'
                      // alignItems={"center"}
                      justifyContent='space-between'
                      key={creator.uuid}
                      m={2}
                    >
                      <Flex
                        direction='row'
                        alignItems={'center'}
                        justifyContent='space-between'
                      >
                        <RoundImage
                          image={require('../../../assets/Images/3.png')}
                          size={10}
                        />
                        <Box px={2}>
                          <Text fontWeight={'800'}>{creator.username}</Text>
                          <Text>{creator.fname + ' ' + creator.lname}</Text>
                        </Box>
                      </Flex>
                      <Flex
                        direction='row'
                        alignItems={'center'}
                        justifyContent='space-between'
                      >
                        <Button h='60%' pt='0' pb='0' bg='primary' mx={2}>
                          Collaborate
                        </Button>
                        <AntDesign name='plussquareo' size={28} color='black' />
                      </Flex>
                    </Flex>
                  );
                })}
              </Box>
            ) : (
              <Center h='100%' w='100%'>
                <Image
                  source={require('../../../assets/Logo/Logo.png')}
                  size={100}
                  resizeMode='contain'
                  p='5'
                  alt='Image'
                />
                <Text fontSize='16' fontWidth='800' color='primary' mt='10'>
                  Sorry, Creator Found.
                </Text>
              </Center>
            )}
          </>
        ) : (
          <Center h='100%' w='100%'>
            <Spinner accessibilityLabel='Loading' />
          </Center>
        )}
        <Text></Text>
      </Box>
    </BackLayout>
  );
}
