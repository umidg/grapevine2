import React, { useContext } from "react";
import { NativeBaseProvider, extendTheme, Box } from "native-base";
import AuthNavigation from "../Navigation/AuthNavigation";
import { ThemeValue } from "../Context/ThemeContext";
const LinearGradient = require("expo-linear-gradient").LinearGradient;
const Theme = () => {
  const theme = useContext(ThemeValue);

  const customTheme = extendTheme({
    colors: {
      tertiary: "#5162F1",
      secondary: "#714EE9",
      primary: "#7949E7",
      dark: "#3e3682",
      light: "#5251c2",
      linearGradient: {
        colors: ["rgba(81, 98, 241, 1)", "rgba(121, 73, 231, 1)"],
        start: [0, 1],
        end: [0, 0.2],
      },
    },
  });

  const config = {
    dependencies: {
      "linear-gradient": LinearGradient,
    },
  };
  return (
    <NativeBaseProvider theme={customTheme} config={config}>
      <Box bg="theme.bg" flex={1}>
        <AuthNavigation />
      </Box>
    </NativeBaseProvider>
  );
};

export default Theme;
