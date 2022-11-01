import React, {useEffect, useState} from 'react';
import LoginScreen from "./LoginUI";
import SplashScreen from './SplashUI';
import { createStackNavigator } from "@react-navigation/stack";

const RootStack = createStackNavigator();

const RootStackUI= () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(()=>{
    setTimeout(() => {
      setShowSplash(false);
    },2500)
  },[])

  return(
    <RootStack.Navigator headerShown={false}>
    {
      showSplash === true ? (<RootStack.Screen name="Splash" options={{headerShown: false}} component={SplashScreen}></RootStack.Screen>)
      :
      (<RootStack.Screen name="Login" options={{headerShown: false}} component={LoginScreen}></RootStack.Screen>)
    }
    </RootStack.Navigator>
  );
}

export default RootStackUI;