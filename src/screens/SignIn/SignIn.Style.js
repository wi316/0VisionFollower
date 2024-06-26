import { StyleSheet } from "react-native";

export const Style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  TextInput: {
    marginTop: 10,
    height: 40,
    width: 200,
    
    borderWidth: 1,
    padding: 10,
  },
  Title: {
    fontSize: 30,
    fontWeight: "600",
  },
  SignUp: {
    textDecorationLine: "underline",
  },
  Error: {
    color: "red",
  },
});
