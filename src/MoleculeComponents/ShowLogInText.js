import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Text } from "native-base";
const ShowLogInText = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.logninText}>
        Already have an account? <Text color="buttonDark">Login</Text>
      </Text>
    </TouchableOpacity>
  );
};

export default ShowLogInText;

const styles = StyleSheet.create({
  logninText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
    fontStyle: "italic",
  },
});
