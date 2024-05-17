import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import SignUp from "../screens/SignUp/SignUp";
import SignIn from "../screens/SignIn/SignIn"


const Stack = createNativeStackNavigator();

export default function AuthStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="SignIn" component={ SignIn } />
                <Stack.Screen name="SignUp" component={ SignUp } />
            </Stack.Navigator>
        </NavigationContainer>
    )
}