import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import Loading from "../../Components/Loading/Loading";

import { FIREBASE_FIRESTORE } from "../../Config/FireBaseConfig";
import { doc, getDoc } from "firebase/firestore";

import Client from "../Client/Client";
import Admin from "../Admin/Admin";

import LocalStorage from "../../utils/LocalStorage";

export default function Home() {
  const { userID } = useAuth();
  const [User, setUser] = useState(null);

  useEffect(() => {
    const getData = async () => {
      if (userID) {
        const DocRef = doc(FIREBASE_FIRESTORE, "users", userID);
        const docSnap = await getDoc(DocRef);
        setUser({ id: userID, ...docSnap.data() });
        // console.log({ id: userID, ...docSnap.data() });

        LocalStorage.storeData("UserID", userID)
      }
    };
    getData();

  }, [userID]);

  if (!User) return <Loading />;

  if (User.Type === "Admin") return <Admin User={User} />;

  return <Client User={User} />;
}
