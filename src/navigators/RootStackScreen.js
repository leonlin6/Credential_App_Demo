import React, {useEffect, useState} from 'react';

import LoginScreen from "../screens/Login/LoginScreen";
import LogoutScreen from '../screens/Login/LogoutScreen';
import SplashScreen from '../screens/Login/SplashScreen';

import { createStackNavigator } from "@react-navigation/stack";


const RootStack = createStackNavigator();


const RootStackScreen = () => {
    const [showSplash, setShowSplash] = useState(true);

    useEffect(()=>{
        setTimeout(() => {
            setShowSplash(false);
        },500)
    },[])

    return(
        <RootStack.Navigator headerShown={false}>
            {
                showSplash === true ? (
                    <RootStack.Screen name="Splash" options={{headerShown: false}} component={SplashScreen}></RootStack.Screen>
                ):
                (
                    <RootStack.Screen name="Login" options={{headerShown: false}} component={LoginScreen}></RootStack.Screen>
                )
            }
        </RootStack.Navigator>
    );
}

export default RootStackScreen;