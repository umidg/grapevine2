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
      w={w ? w : "100%"}
      h={h ? h : 25}
      color="#fff"
      borderWidth={0}
      borderBottomColor={status == "normal" ? "rgba(61,54,130,0.7)" : "#ff0000"}
      borderBottomWidth={2}
      fontSize={12}
      mb={5}
      type={show ? "text" : "password"}
      pb={0.5}
      pl={0.5}
      InputRightElement={
        <Icon
          as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />}
          size={5}
          mr="2"
          color="muted.400"
          onPress={() => setShow(!show)}
        />
      }
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      editable={editable}
    />
  );
};

export default InputPassword;
