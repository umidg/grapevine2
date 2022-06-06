/* eslint-disable jsx-quotes */
import React, { useContext } from 'react';
import { NativeBaseProvider, extendTheme, Box } from 'native-base';
import AuthNavigation from '../Navigation/AuthNavigation';
import { ThemeValue } from '../Context/ThemeContext';

const { LinearGradient } = require('expo-linear-gradient');

const Theme = () => {
  const theme = useContext(ThemeValue);

  const customTheme = extendTheme({
    colors: {
      theme: {
        bg: theme === 'dark' ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)',
        txt: theme === 'dark' ? 'rgba(255,255,255,1)' : 'rgba(0,0,0,1)',
      },
      buttonPrimaryColor:
        'linear-gradient(90deg, rgba(81,98,241,1) 0%, rgba(121,73,231,1) 100%)',
      buttonSecondaryColor:
        theme === 'dark' ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)',
      buttonDark: 'rgba(61,54,130,255)',
      buttonDarkClick: '#5251C2',

      buttonLight: '#5251c2',
      // loginPageBg: 'rgba(121,73,231,1)',
    },
    config: {
      useSystemColorMode: false,
      initialColorMode: 'light',
    },
  });

  const config = {
    dependencies: {
      'linear-gradient': LinearGradient,
    },
  };

  return (
    <NativeBaseProvider theme={customTheme} config={config}>
      <Box
        bg={{
          linearGradient: {
            colors: ['rgba(81, 98, 241, 1)', 'rgba(121, 73, 231, 1)'],
            start: [0, 1],
            end: [0, 0.2],
          },
        }}
        flex={1}
      >
        <AuthNavigation />
      </Box>
    </NativeBaseProvider>
  );
};

export default Theme;
