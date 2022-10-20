

import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Button } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
// import indy from 'rn-indy-sdk';
// import indy from 'indy-sdk-react-native';

import React,{useState, useEffect} from 'react';

// import { AuthContext } from './components/context';
import {connect} from 'react-redux';
import indy from 'indy-sdk-react-native';
import anoncreds from 'indy-sdk-react-native';
import RNFS from 'react-native-fs';
import { NavigationContainer, TabActions, useFocusEffect } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
// Login Page
import RootStackScreen from './src/navigators/RootStackScreen';

// import {indy, pool, ledger, wallet, did, anoncreds} from 'indy-sdk-react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

// API
import axios from 'axios';
// import { ENDPOINT_BASE_URL } from '../../APIs/APIs';
import ATest from './ATest';

  
  const ButtonArea = (props) => {
    let intervalId;

    //先setInterval做確認status，但會有非同步的問題，之後再看怎麼改
    useEffect(() => {
      // intervalId = setInterval(test123, 5000);
  
  
      return() => {
        console.log('---checkStatusIntervalID effect return---',intervalId);
  
        // clearInterval(intervalId);
      }
    },[])
  
  
  
  
  const test123 = () => {
    console.log('---checkStatusIntervalID before---',intervalId);
    clearInterval(intervalId);

    intervalId = setInterval(test123, 5000);
    console.log('---checkStatusIntervalID afeter---',intervalId);
  }
  


    const nextPage = () => {
      props.navigation.navigate({
        name:'ATest',
    
      });

      // props.navigation.reset({
      //   index:0,
      //   routes: [
      //     {
      //       name:'ATest',
      //     }
      //   ]
      // });
    }



    return(
      <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
        <View style={styles.body}>
          <Text style={styles.sectionDescription}>Check console.log for test results</Text>
          <View style={styles.sectionContainer}>
            <Button title="NEXT PAGE" onPress={nextPage} />
          </View>
          <View style={styles.sectionContainer}>
            <Button title="ASSIGN DATA" onPress={test123} />
          </View>
          {/* <View style={styles.sectionContainer}>
            <Button title="Get Wallet Handle from AsyncStorage" onPress={getWH} />
          </View>
          <View style={styles.sectionContainer}>
            <Button title="Create wallet" onPress={createWallet} />
          </View>
          <View style={styles.sectionContainer}>
            <Button title="getCredentialInfo" onPress={getCredentialInfo} />
          </View>  
          <View style={styles.sectionContainer}>
            <Button title="Open wallet" onPress={openWallet} />
          </View>
          <View style={styles.sectionContainer}>
            <Button title="Close wallet" onPress={closeWallet} />
          </View>
          <View style={styles.sectionContainer}>
            <Button title="Delete wallet" onPress={deleteWallet} />
          </View>
          <View style={styles.sectionContainer}>
            <Button title="Save Credential" onPress={saveCredentian} />
          </View>
          <View style={styles.sectionContainer}>
            <Button title="Get Credential" onPress={getCredentian} />
          </View>
          <View style={styles.sectionContainer}>
            <Button title="createPool" onPress={createPool} />
          </View>
          <View style={styles.sectionContainer}>
            <Button title="openPool" onPress={openPool} />
          </View>
          <View style={styles.sectionContainer}>
            <Button title="closePool" onPress={closePool} />
          </View>
          <View style={styles.sectionContainer}>
            <Button title="createDid" onPress={createDID} />
          </View>
          <View style={styles.sectionContainer}>
            <Button title="createMasterSecret" onPress={createMasterSecret} />
          </View>
          <View style={styles.sectionContainer}>
            <Button title="getDefinition" onPress={getDefinition} />
          </View>
          <View style={styles.sectionContainer}>
            <Button title="CreateCredentialReq" onPress={CreateCredentialReq} />
          </View>  

          <View style={styles.sectionContainer}>
            <Button title="submit" onPress={submit} />
          </View>  
          <View style={styles.sectionContainer}>
            <Button title="saveCredential" onPress={saveCredential} />
          </View>  
          <View style={styles.sectionContainer}>
            <Button title="getCredFromWallet" onPress={getCredFromWallet} />
          </View>  
          <View style={styles.sectionContainer}>
            <Button title="Open wallet" onPress={openWallet} />
          </View>
          <View style={styles.sectionContainer}>
            <Button title="initial" onPress={initial} />
          </View>  
          <View style={styles.sectionContainer}>
            <Button title="handleRequest" onPress={handleRequest} />
          </View>  
          <View style={styles.sectionContainer}>
            <Button title="getWalletCredentials" onPress={getWalletCredentials} />
          </View>  

          <View style={styles.sectionContainer}>
            <Button title="Create wallet" onPress={createWallet} />
          </View>

          <View style={styles.sectionContainer}>
            <Button title="createPool" onPress={createPool} />
          </View>
          <View style={styles.sectionContainer}>
            <Button title="createMasterSecret" onPress={createMasterSecret} />
          </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
    )
  }



  const styles = StyleSheet.create({
    scrollView: {
      backgroundColor: Colors.lighter,
    },
    body: {
      backgroundColor: Colors.white,
    },
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
      color: Colors.dark,
    },
  })

export default ButtonArea;