import { Text, Input, Icon } from "native-base";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
const InputPassword = ({
  value,
  onChangeText,
  placeholder,
  w,
  h,
  editable = true,
  status = "normal",
}) => {
  const [show, setShow] = React.useState(false);

  return (
    <Input
      w={w ? w : "full"}
      h={h ? h : "8"}
      color="#fff"
      borderWidth={0}
      borderBottomColor={status == "normal" ? "light" : "red.500"}
      borderBottomWidth={2}
      // fontSize={12}
      type={show ? "text" : "password"}
      mb="5"
      p="0"
      InputRightElement={
        <Icon
          as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />}
          size={5}
          color="white"
          onPress={() => setShow(!show)}
        />
      }
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      editable={editable}
      _focus={{ bg: "none" }}
    />
  );
};

export default InputPassword;
