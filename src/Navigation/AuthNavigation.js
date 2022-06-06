import React, { useContext } from 'react';
import { SignedInStack } from './SignedInStack';
import SignedOutStack from './SignedOutStack';
import { UserValue } from '../Context/UserContext';
import Splash from '../Pages/Splash';

const AuthNavigation = () => {
  const [user] = useContext(UserValue);

  if (user.data) {
    return user.id ? <SignedInStack /> : <SignedOutStack />;
  }
  return <Splash />;
};

export default AuthNavigation;
