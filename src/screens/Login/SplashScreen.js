import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useMemo } from 'react'
import { Image, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createStackNavigator } from "@react-navigation/stack";




const SplashScreen = () => {
    return(
        <SafeAreaView style={styles.container}>
          <Image style={styles.logo} source={require('../../assets/images/logo.png')}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },
  logo:{
    width:150,
    height:100
  }

});
export default SplashScreen;