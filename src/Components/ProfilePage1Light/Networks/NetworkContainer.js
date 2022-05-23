import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Box } from "native-base";
import { ThemeValue } from "../../../Context/ThemeContext";
import RegularImage from "../../../AtomComponents/Image/RegularImage";
import ColorWrapper from "../../../AtomComponents/ColorWrapper/ColorWrapper";
const NetworkContainer = () => {
  const [theme, setTheme] = useContext(ThemeValue);

  return (
    <Box>
      <Text textAlign="center" fontWeight="bold" italic>
        Molly's Networks
      </Text>
      <Box flex="1" flexDir="row" justifyContent="center">
        <RegularImage
          h={20}
          w={20}
          image={require("../../../../assets/Icons/Instagram.png")}
        />

        <RegularImage
          h={20}
          w={20}
          image={require("../../../../assets/Icons/Youtube.png")}
        />

        <RegularImage
          h={20}
          w={20}
          image={require("../../../../assets/Icons/TikTok.png")}
        />
      </Box>

      <Box>
        <Box></Box>
      </Box>
    </Box>
  );
};

export default NetworkContainer;

// const styles = StyleSheet.create({
//   container: {
//     width: "100%",
//     height: 100,
//     marginTop: 15,
//     alignItems: "center",
//   },
//   text: {
//     fontSize: 12,
//     textAlign: "center",
//     fontWeight: "300",
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginTop: 10,
//     width: "50%",
//   },

//   line: {
//     width: 60,
//     borderWidth: 2,
//     borderColor:
//       "linear-gradient(90deg, rgba(81,98,241,0.5) 0%, rgba(121,73,231,0.5) 100%)",
//     borderStyle: "solid",
//   },
// });
