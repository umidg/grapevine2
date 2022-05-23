import React, { useState, useEffect } from "react";
export const UserValue = React.createContext(null);
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = (props) => {
  const [user, setUser] = useState({ data: false });
  useEffect(async () => {
    var temp = { data: true };
    try {
      let loggedUser = JSON.parse(await AsyncStorage.getItem("user"));
      if (loggedUser) {
        temp = { ...temp, ...loggedUser };
      }
    } catch (err) {}
    setUser({ ...temp });
  }, []);

  return (
    <UserValue.Provider value={[user, setUser]}>
      {props.children}
    </UserValue.Provider>
  );
};

export default UserContext;
