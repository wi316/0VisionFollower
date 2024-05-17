import { useState, useEffect } from "react";
import * as Location from "expo-location"

export default function usegetLocation() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [coords, setCoords] = useState({
    longitude: null,
    altitude: null,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCoords({
        longitude: location.coords.longitude,
        altitude: location.coords.altitude,
      });
    })();
  }, []);

  return { errorMsg, coords };
}
