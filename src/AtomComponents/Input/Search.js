import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput, Image } from "react-native";
import { View, Text, Input } from "native-base";
import { EvilIcons } from "@expo/vector-icons";

const Search = ({ onSearch, onFocus, createHistory, clearText, ...rest }) => {
  const [text, setText] = useState("");
  const [borderWidth, setBorderWidth] = useState(0);
  const searchFocused = () => {
    setBorderWidth(2);
    if (onSearch) {
      onSearch(text ? text : "");
    }
  };
  const onSubmit = () => {
    if (createHistory) {
      createHistory(text);
    }
  };
  useEffect(() => {
    if (onSearch) onSearch(text);
  }, [text]);

  return (
    <Input
      placeholder="Search"
      onFocus={searchFocused}
      onSubmitEditing={onSubmit}
      onChangeText={(text) => setText(text)}
      value={clearText ? text : ""}
      type="text"
      InputLeftElement={<EvilIcons name="search" size={24} color="black" />}
      _focus={{ bg: "white", borderWidth: 1, borderColor: "primary" }}
      onPressIn={onFocus}
      {...rest}
    />
  );
};

export default Search;
