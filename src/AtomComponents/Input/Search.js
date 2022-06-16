import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput, Image } from "react-native";
import { View, Text, Input } from "native-base";
import { EvilIcons } from "@expo/vector-icons";

const Search = ({ onSearch, onFocus }) => {
  const [text, setText] = useState("");
  const [borderWidth, setBorderWidth] = useState(0);
  const searchFocused = () => {
    setBorderWidth(2);
    if (onSearch) {
      onSearch(text ? text : "*");
    }
  };
  const onSubmit = () => {
    if (onSearch) {
      onSearch(text);
    }
  };
  useEffect(() => {
    if (text == "") {
      onSearch("*");
    } else {
      onSearch(text);
    }
  }, [text]);

  return (
    <View>
      <View style={[styles.inputContainer, { borderWidth: borderWidth }]}>
        {/* <Image
          alt='image'
          style={styles.icon}
          source={require('../../../assets/Icons/Search.png')}
        /> */}
        {/* <EvilIcons name='search' size={24} color='black' /> */}
        <Input
          style={styles.input}
          placeholder="Search"
          onFocus={searchFocused}
          onSubmitEditing={onSubmit}
          onChangeText={(text) => setText(text)}
          value={text}
          type="text"
          InputLeftElement={<EvilIcons name="search" size={24} color="black" />}
          _focus={{ bg: "white", borderWidth: 2, borderColor: "primary" }}
          onPressIn={onFocus}
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
    color: "black",
    fontWeight: "300",

    width: "100%",
    height: "100%",
  },
});
