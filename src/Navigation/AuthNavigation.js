import React, { useContext, useState } from 'react';
import SignedInStack from './SignedInStack';
import SignedOutStack from './SignedOutStack';
import { UserValue } from '../Context/UserContext';
import Splash from '../Pages/Splash';
import { Box } from 'native-base';
const AuthNavigation = () => {
  const [user, setUser] = useContext(UserValue);

  return (
    <>
      {user.data ? (
        <>
          {user.id ? (
            <Box flex={1} safeAreaTop>
              <SignedInStack />
            </Box>
          ) : (
            <SignedOutStack />
          )}
        </>
      ) : (
        <>
          <Splash />
        </>
      )}
    </>
  );
};

export default AuthNavigation;
