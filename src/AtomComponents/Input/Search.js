import React, { useState } from "react";
import { StyleSheet, TextInput, Image } from "react-native";
import { View, Text, Input } from "native-base";

const Search = ({ onSearch }) => {
  const [text, setText] = useState("");
  const [borderWidth, setBorderWidth] = useState(0);
  const searchFocused = () => {
    setBorderWidth(2);
  };
  const onSubmit = () => {
    if (onSearch) {
      onSearch(text);
    }
  };
  return (
    <View>
      <View style={[styles.inputContainer, { borderWidth: borderWidth }]}>
        <Image
          style={styles.icon}
          source={require("../../../assets/Icons/Search.png")}
        />
        <TextInput
          style={styles.input}
          placeholder="Search"
          onFocus={searchFocused}
          onSubmitEditing={onSubmit}
          onChangeText={(text) => setText(text)}
          value={text}
        />
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {},
  inputContainer: {
    height: 39,
    backgroundColor: "rgba(216,216,216,0.0392156862745098)",
    borderRadius: 10,
    borderColor:
      "linear-gradient(90deg, rgba(81,98,241,1) 0%, rgba(121,73,231,1) 100%)",
    flexDirection: "row",
    alignItems: "center",
    padding: 3,
    paddingLeft: 5,
    width: "100%",
  },
  icon: {
    height: 20,
    width: 20,
    marginRight: 5,
  },
  input: {
    fontSize: 12,
    color: "#a0a0a0",
    fontWeight: "300",

    width: "100%",
    height: "100%",
  },
});
