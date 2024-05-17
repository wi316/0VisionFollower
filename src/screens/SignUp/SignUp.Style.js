import { StyleSheet } from "react-native";

export const Style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'white'
  },
  Title: {
    fontSize: 30,
    fontWeight: "600",
  },
  TextInput: {
    marginTop: 10,
    height: 40,
    width: 200,
    // margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  Error: {
    color: "red"
  },
  SignIn: {
    textDecorationLine: "underline",
  },
});
