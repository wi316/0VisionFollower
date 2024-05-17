import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";

const Cards = (props) => {
  const { User, onPress } = props;
  // console.log("Cards => ", User);
  return (
    <Pressable
      style={Style.container}
      onPress={onPress}
    >
      <Text>{User.Name}</Text>
      {/* <Text>dfgkjshdlg</Text> */}
    </Pressable>
  );
};

const Style = StyleSheet.create({
  container: {
    backgroundColor: "#E3E1D9",
    padding: 10,
    borderRadius: 4,
    marginVertical: 5,
  },
});

export default Cards;
