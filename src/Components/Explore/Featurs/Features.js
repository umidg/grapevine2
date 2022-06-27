import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Spinner, Box, Pressable } from 'native-base';
import { grapevineBackend } from '../../../API';
import { Text } from 'native-base';
import { FeatureBoxSecondary } from '../../../MoleculeComponents/index';
import Carousel, { Pagination } from 'react-native-snap-carousel';
const Features = (props) => {
  const { type, navigation } = props;
  const [features, setFeatures] = useState({
    user: [],
    activeIndex: 0,
  });

  useEffect(() => {
    grapevineBackend(
      '/user/getFeatured?page=1&limit=5',
      {
        type: type,
      },
      'POST'
    )
      .then(({ data }) => {
        if (data.status) {
          setFeatures({
            user: [
              ...data.data.result,
              ...data.data.result,
              ...data.data.result,
            ],
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Box style={styles.container} mb='5'>
      <Text style={styles.headerText}>Featured</Text>
      {/* <Text style={styles.secondaryText}>Creators</Text> */}
      {features ? (
        <View style={{ marginTop: 10 }}>
          <Carousel
            data={features.user}
            sliderWidth={400}
            itemWidth={220}
            renderItem={(data) => (
              <FeatureBoxSecondary item={data} navigation={navigation} />
            )}
            onSnapToItem={(index) => {
              setFeatures({ ...features, activeIndex: index });
            }}
          />
          <Pagination
            dotsLength={features.user.length}
            activeDotIndex={features.activeIndex || 0}
            containerStyle={{
              paddingTop: 15,
            }}
            dotStyle={{
              width: 8,
              height: 8,
              borderRadius: 5,
              backgroundColor: '#7949E7',
            }}
            inactiveDotStyle={{}}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
          <Pressable onPress={() => navigation.navigate('AllFeaturesUserPage')}>
            <Text textAlign='center' underline fontSize='12' color='primary'>
              See all
            </Text>
          </Pressable>
        </View>
      ) : (
        <Spinner accessibilityLabel='Loading' color='primary' />
      )}
    </Box>
  );
};

export default Features;

const styles = StyleSheet.create({
  container: {},
  headerText: {
    fontSize: 21,
    color: '#000',
    // fontFamily: "Gilroy",
    fontWeight: '800',
    marginLeft: 10,
  },
  secondaryText: {
    fontSize: 16,
    fontWeight: '300',
    marginLeft: 20,
  },
});
