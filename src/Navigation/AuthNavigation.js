import React, { useContext } from "react";
import SignedInStack from "./SignedInStack";
import SignedOutStack from "./SignedOutStack";
import { UserValue } from "../Context/UserContext";
import { Text, View } from "react-native";
import Splash from "../Pages/Splash";
const AuthNavigation = () => {
  const [user, setUser] = useContext(UserValue);
  return <SignedInStack />;

  return (
    <>
      {user.data ? (
        <>{!user.id ? <SignedInStack /> : <SignedOutStack />}</>
      ) : (
        <>
          <Splash />
        </>
      )}
    </>
  );
};

export default AuthNavigation;
