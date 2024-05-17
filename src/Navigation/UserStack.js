import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home/Home";
import ClientDetails from "../screens/ClientDetails/ClientDetails";

const Stack = createNativeStackNavigator();

export default function UserStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ClientDetails" component={ClientDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
