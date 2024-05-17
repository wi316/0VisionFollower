import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Loading = () => {
  return (
    <View style={Style.container}>
      <Text style={{ fontSize: 20 }}>Loading</Text>
    </View>
  );
};

const Style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
});

export default Loading;
