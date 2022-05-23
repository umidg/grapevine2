import React, { useContext } from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { Text } from "native-base";
import { Box, Button } from "native-base";
import { ThemeValue } from "../../../Context/ThemeContext";
const Buttons = () => {
  const [theme, setTheme] = useContext(ThemeValue);

  return (
    <View style={styles.container}>
      <Button bg="buttonPrimaryColor" style={styles.connectButton}>
        <Text style={styles.text} color="theme.txt">
          Connect
        </Text>
      </Button>

      <Button
        bg="buttonSecondaryColor"
        borderColor="buttonPrimaryColor"
        style={styles.messageButton}
      >
        <Text style={styles.text} color="theme.txt">
          Message
        </Text>
      </Button>

      {theme == "light" ? (
        <Image
          style={styles.optionsIcon}
          source={require("../../../../assets/Icons/Options.png")}
        />
      ) : (
        <Image
          style={styles.optionsIcon}
          source={require("../../../../assets/Icons/Options_light.png")}
        />
      )}
    </View>
  );
};

export default Buttons;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingLeft: 10,
    paddingTop: 10,
    width: "100%",
    justifyContent: "center",
  },
  connectButton: {
    paddingTop: 0,
    paddingBottom: 0,
    width: 90,
    height: 26,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  messageButton: {
    width: 90,
    height: 26,
    paddingTop: 0,
    paddingBottom: 0,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 1,
    borderStyle: "solid",
  },
  text: {
    fontSize: 10,
    fontWeight: "800",
    // fontFamily: "Gilroy",
    textAlign: "center",
  },
  optionsIcon: {
    height: "60%",
    width: 10,
    alignSelf: "center",
  },
});
