import React, { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import Loading from "../Components/Loading/Loading";

import AuthStack from "./AuthStack";
import UserStack from "./UserStack";

import { FIREBASE_AUTH } from "../Config/FireBaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const RootNavigation = () => {
  const [initializing, setInitializing] = useState(true);

  const { userID } = useAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setInitializing(false);
    });

    return unsubscribe;
  }, []);

  if (initializing) {
    return <Loading />;
  }

  if (!userID) {
    return <AuthStack />;
  }

  return <UserStack />;
};

export default RootNavigation;
