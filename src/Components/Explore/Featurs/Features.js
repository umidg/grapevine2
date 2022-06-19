import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Spinner, Box } from 'native-base';
import { grapevineBackend } from '../../../API';
import { FeatureBoxSecondary } from '../../../MoleculeComponents/index';
const Features = () => {
  const [features, setFeatures] = useState(null);
  useEffect(() => {
    grapevineBackend(
      '/user/getFeatured?page=1&limit=5',
      {
        type: 'Brand',
      },
      'POST'
    )
      .then(({ data }) => {
        if (data.status) {
          setFeatures(data.data.result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(features, 'fe');
  return (
    <Box style={styles.container}>
      <Text style={styles.headerText}>Featured</Text>
      <Text style={styles.secondaryText}>Creators</Text>
      {features ? (
        <View style={{ marginTop: 10 }}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          >
            {features.map((user) => (
              <FeatureBoxSecondary key={user.uuid} user={user} />
            ))}
          </ScrollView>
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
