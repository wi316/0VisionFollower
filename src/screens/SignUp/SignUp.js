import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";

import { Style } from "./SignUp.Style";
import Button from "../../Components/Button/Button";

import { FIREBASE_FIRESTORE, FIREBASE_AUTH } from "../../Config/FireBaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";

// import useSignUp from "../../Hooks/useSignUp";

const SignUp = ({ navigation }) => {
  const [FullName, setFullName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPass, setConfirmPass] = useState(null);

  const [error, setError] = useState("");

  const CreatUser = async () => {
    setError("");
    if (Password !== ConfirmPass) {
      setError("Password not correct");
    } else {
      await createUserWithEmailAndPassword(FIREBASE_AUTH, Email, Password)
        .then(async (userCredential) => {
          // Signed up
          const user = userCredential.user;
          // add the data to firestore 
          await setDoc(doc(FIREBASE_FIRESTORE, "users", user.uid), {
            Name: FullName,
            Type: 'Patient',
            Location: {
              altitude: 0,
              longitude: 0
            }
          })
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setEmail(errorMessage);
        });
    }
  };

  return (
    <View style={Style.container}>
      <Text style={Style.Title}>Sign Up</Text>
      <TextInput
        style={Style.TextInput}
        placeholder="Full Name"
        onChangeText={(Text) => setFullName(Text)}
      />
      <TextInput
        style={Style.TextInput}
        placeholder="Email"
        onChangeText={(Text) => setEmail(Text)}
      />
      <TextInput
        style={Style.TextInput}
        placeholder="Password"
        onChangeText={(Text) => setPassword(Text)}
        secureTextEntry={ true }
      />
      <TextInput
        style={Style.TextInput}
        placeholder="Confirm Password"
        onChangeText={(Text) => setConfirmPass(Text)}
        secureTextEntry={ true }
      />

      {error ? <Text style={Style.Error}>{`${error}`}</Text> : ""}

      <Button title="Sign Up" onPress={CreatUser} />
      <Text>Already have a account ?</Text>
      <Text style={Style.SignIn} onPress={() => navigation.navigate("SignIn")}>
        Sign In
      </Text>
    </View>
  );
};

export default SignUp;
