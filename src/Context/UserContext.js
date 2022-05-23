import React, { useState, useEffect } from "react";
export const UserValue = React.createContext(null);
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = (props) => {
  const [user, setUser] = useState({ data: false });
  useEffect(() => {
    async function loggedUser() {
      var temp = {};
      try {
        let loggedUser = JSON.parse(await AsyncStorage.getItem("user"));
        if (loggedUser) {
          temp = { data: true, ...loggedUser };
        }
      } catch (err) {}
      return temp;
    }
    setUser(loggedUser());
  }, []);

  return (
    <UserValue.Provider value={[user, setUser]}>
      {props.children}
    </UserValue.Provider>
  );
};

export default UserContext;
