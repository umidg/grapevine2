import React from 'react';
import { StyleSheet } from 'react-native';
import { Box, ScrollView } from 'native-base';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    height: '100%',
    width: '100%',
  },
});

const LayoutFrame = ({ children }) => (
  <ScrollView
    contentContainerStyle={{
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}
    style={styles.scrollView}
  >
    <Box
      style={{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      bg={{
        linearGradient: {
          colors: ['rgba(81, 98, 241, 1)', 'rgba(121, 73, 231, 1)'],
          start: [0, 1],
          end: [0, 0.2],
        },
      }}
    >
      {children}
    </Box>
  </ScrollView>
);

export default LayoutFrame;
