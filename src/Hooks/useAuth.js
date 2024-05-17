import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../Config/FireBaseConfig";

export default function useAuth() {
  const [userID, setUser] = useState();

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (User) => {
      if (User) {
        setUser(User.uid);
      } else {
        setUser(undefined);
      }
    });
  }, []);

  return { userID };
}
