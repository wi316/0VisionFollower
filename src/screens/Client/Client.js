import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import Button from "../../Components/Button/Button";

import { FIREBASE_AUTH, FIREBASE_FIRESTORE } from "../../Config/FireBaseConfig";
import usegetLocation from "../../Hooks/usegetLocation";
import * as Location from "expo-location";

import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";

import { doc, updateDoc } from "firebase/firestore";
import LocalStorage from "../../utils/LocalStorage";

const LOCATION_TASK_NAME = "background-location-task"; // Nom de la tâche de localisation en arrière-plan

const requestPermissions = async () => {
  // Fonction asynchrone pour demander les autorisations de localisation
  const { status: foregroundStatus } =
    await Location.requestForegroundPermissionsAsync(); // Demande d'autorisations de localisation en premier plan
  if (foregroundStatus === "granted") {
    // Vérification si les autorisations en premier plan ont été accordées
    const { status: backgroundStatus } =
      await Location.requestBackgroundPermissionsAsync(); // Demande d'autorisations de localisation en arrière-plan
    if (backgroundStatus === "granted") {
      // Vérification si les autorisations en arrière-plan ont été accordées
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        // Démarrage des mises à jour de localisation en arrière-plan
        accuracy: Location.Accuracy.Balanced, // Précision de la localisation
      });
    }
  }
};

TaskManager.defineTask(LOCATION_TASK_NAME, async () => {
  // Définition de la tâche de localisation en arrière-plan
  const now = Date.now(); // Obtention de l'heure actuelle

  console.log(
    `Got background fetch call at date: ${new Date(now).toISOString()}`
  ); // Journalisation de l'appel de récupération en arrière-plan

  const UserId = await LocalStorage.getUserID(); // Obtention de l'identifiant de l'utilisateur depuis le stockage local
  console.log("UserId => ", UserId); // Journalisation de l'identifiant de l'utilisateur

  let location = await Location.getCurrentPositionAsync({}); // Obtention de la localisation actuelle

  if (UserId) {
    // Vérification de la présence de l'identifiant de l'utilisateur
    const UserRef = doc(FIREBASE_FIRESTORE, "users", UserId); // Référence à l'utilisateur dans la base de données Firestore
    await updateDoc(UserRef, {
      // Mise à jour des données de localisation de l'utilisateur
      Location: {
        altitude: location.coords.altitude,
        longitude: location.coords.longitude,
      },
    });
  }

  return BackgroundFetch.BackgroundFetchResult.NewData; // Retour de l'état de la récupération en arrière-plan
});

BackgroundFetch.registerTaskAsync(LOCATION_TASK_NAME, {
  // Enregistrement de la tâche de localisation en arrière-plan
  minimumInterval: 60 * 1, // Interval minimum entre chaque exécution de la tâche (1 minute)
  stopOnTerminate: false, // Ne pas arrêter la tâche lorsque l'application est arrêtée (Android uniquement)
  startOnBoot: true, // Démarrer la tâche lorsque l'appareil est démarré (Android uniquement)
});

const Client = (props) => {
  const { User } = props; // Extraction de la propriété "User" passée en tant que prop
  const { coords, errorMsg } = usegetLocation(); // Obtention des coordonnées de localisation et des messages d'erreur à l'aide du hook usegetLocation

  useEffect(() => {
    // Utilisation du hook useEffect pour exécuter une action au montage du composant
    const sendLocation = async () => {
      // Définition de la fonction asynchrone pour envoyer la localisation à la base de données
      await requestPermissions(); // Demande d'autorisations de localisation

      const UserRef = doc(FIREBASE_FIRESTORE, "users", User.id); // Référence à l'utilisateur dans la base de données Firestore

      let location = await Location.getCurrentPositionAsync({}); // Obtention de la localisation actuelle

      await updateDoc(UserRef, {
        // Mise à jour des données de localisation de l'utilisateur dans la base de données Firestore
        Location: {
          altitude: location.coords.altitude,
          longitude: location.coords.longitude,
        },
      });
    };

    sendLocation(); // Appel de la fonction pour envoyer la localisation au montage du composant
  }, []);

  return (
    <View style={Style.container}>
      <Text style={Style.AppBarText}>Hello, {`${User.Name}`} 👋</Text>
      <Text style={Style.Text}>
        Your location has been securely sent to our server for assistance
        purposes. Thank you for trusting us.
      </Text>
      <Button
        title="Logout"
        onPress={() => {
          LocalStorage.ClearLocalStorage();
          FIREBASE_AUTH.signOut();
        }}
      />

      <Text>altitude : {coords ? coords.altitude : ""}</Text>
      <Text>longitude : {coords ? coords.longitude : ""}</Text>

      <Text>{errorMsg ? errorMsg : ""}</Text>
    </View>
  );
};

const Style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  AppBarText: {
    fontSize: 20,
  },
  Text: {
    textAlign: "center",
  },
});

export default Client;
