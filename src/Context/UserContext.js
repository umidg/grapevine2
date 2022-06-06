import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserValue = React.createContext(null);

const UserContext = ({ children }) => {
  const [user, setUser] = useState({
    data: false,
  });
  useEffect(() => {
    const getLoggedUser = async () => {
      let temp = { data: true };
      try {
        const loggedUser = JSON.parse(await AsyncStorage.getItem('user'));
        if (loggedUser) {
          temp = { loggedUser, ...temp };
        }
        setUser({ ...temp });
      } catch (err) {
        console.log(err, 'asyncstorage error');
      }
    };
    getLoggedUser();
  }, []);

  const userMemo = React.useMemo(() => [user, setUser], [user]);

  return <UserValue.Provider value={userMemo}>{children}</UserValue.Provider>;
};

export default UserContext;
