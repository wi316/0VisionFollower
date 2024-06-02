import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Button from "../../Components/Button/Button";
import { useNavigation } from "@react-navigation/native";
import { Linking } from "react-native";


const ClientDetails = ({ route }) => {
  const { User } = route.params;
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, paddingTop: 30, backgroundColor: "white" }}>
      <Text style={{ paddingVertical: 10 }}>ClientDetails</Text>
      <Text style={{ paddingVertical: 10 }}>Name: {User.Name}</Text>
      <Button
        title="see location"
        onPress={() => {
          Linking.openURL(
            `https://www.google.com/maps/search/?api=1&query=${User.Location.latitude},${User.Location.longitude}`
          );
        }}
      />
      <Button
        title="Back"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
};

export default ClientDetails;
