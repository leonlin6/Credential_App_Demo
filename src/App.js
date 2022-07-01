
import React,{useState, useEffect} from 'react';
import { LogBox, StyleSheet } from "react-native"

// import { AuthContext } from './components/context';
import {connect} from 'react-redux';

import { NavigationContainer, TabActions, useFocusEffect } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';


// Login Page
import RootStackScreen from './navigators/RootStackScreen';

// navigators
import Wallet from './screens/Wallet/Wallet';
import History from './screens/CredentialHistory/History';
import Certificate from './screens/Certificate/Certificate';
import Setting from './screens/Setting/Setting';
import LogoutScreen from './screens/Login/LogoutScreen';

// Wallet
import Form from './screens/Wallet/Form';
import CredentialListScreen from './screens/Wallet/CredentialListScreen';
import CredentialDetailScreen from './screens/Wallet/CredentialDetailScreen';

//-----暫時:記得改掉----
import CredentialDetailCheck from './screens/Wallet/CredentialDetailCheck';


// Certificate
import CreateQRScreen from './screens/Certificate/CreateQRScreen';
import QRCodeScreen from './screens/Certificate/QRCodeScreen';
import SelectCredential from './screens/Certificate/SelectCredential';
import MyRule from './screens/Certificate/MyRule';
import RuleDetail from './screens/Certificate/RuleDetail';

// History
import CertificateHistoryScreen from './screens/Certificate/CertificateHistoryScreen';
import CertificateHistoryDetailScreen from './screens/Certificate/CertificateHistoryDetailScreen';

// common
import ScanScreen from './screens/Certificate/ScanScreen';
import Loading from './screens/Loading';
import {Colors} from './components/common/Colors'



import SuccessScreen from './components/common/SuccessScreen';
import IndyTest from './screens/IndyTest';


import { 
  TouchableOpacity,
} from 'react-native';

const App = (props) => {

  const ignoreWarns = [
    "ViewPropTypes will be removed",
  ];

  const warn = console.warn;
  console.warn = (...arg) => {
      for (let i = 0; i < ignoreWarns.length; i++) {
          if (arg[0].startsWith(ignoreWarns[i])) return;
      }
      warn(...arg);
  };

  LogBox.ignoreLogs(ignoreWarns);


  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();
  // const AuthContext = createContext();

  const [showAuthDraw, setShowAuthDraw] = useState(false);
  const [showDrawerMenu, setShowDrawerMenu] = useState(false);


  const onPersonalSetting = () => {
    console.log('teststes');
  }

  const onMenuPress = () => {
    if(showDrawerMenu === true)
      navigation.closeDrawer();
    else
      navigation.openDrawer();
  }

  // const TabContainer = () => {
  //   return(
  //     <Tab.Navigator initialRouteName="Certificate"
  //       screenOptions={({ route }) => ({
  //         tabBarIcon: ({ focused, color, size }) => {
  //           let iconName;
            
  //           if (route.name === 'Certificate') {
  //             iconName = focused ? 'journal-sharp' : 'journal-sharp';
  //           } else if (route.name === 'Wallet') {
  //             iconName = focused ? 'ios-wallet' : 'ios-wallet-outline';
  //           } 

  //           // You can return any component that you like here!
  //           return <Ionicons name={iconName} size={size} color={color} />;
  //         },

  //       })}>
  //       <Tab.Screen name='Certificate' component={CertificateScreen}   
  //         options={{
  //           headerLeft: (props) => (
  //             <TouchableOpacity style={{marginLeft:10}} onPress={onPersonalSetting}>
  //               <Ionicons name='md-person-circle' size={45} color={Colors.puzzleBlue}></Ionicons>
  //             </TouchableOpacity>
  //           ),
  //           headerTitle:'查驗',
  //           headerTitleAlign:'center',
  //           headerStyle:{backgroundColor:'#F2F2F2',height:70},
  //           headerTitleStyle:{fontSize:25, fontWeight:'bold'}
  //         }}></Tab.Screen>
  //       <Tab.Screen name='Wallet' component={WalletScreen}   
  //         options={{
  //           headerLeft: (props) => (
  //             <TouchableOpacity style={{marginLeft:10}} onPress={onPersonalSetting}>
  //               <Ionicons name='md-person-circle' size={45} color={Colors.puzzleBlue} ></Ionicons>
  //             </TouchableOpacity>
  //           ),
  //         }}></Tab.Screen>

  //     </Tab.Navigator>
  //   );
  // }


  const DrawerContainer = () => {
    return(
      <Drawer.Navigator initialRouteName="Wallet"
        screenOptions={({ route }) => ({
          headerShown:false,
          defaultStatus:"open",
          gestureEnabled:false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },

        })}>
        <Drawer.Screen name='Wallet' component={Wallet}   
          options={{
            headerLeft: (props) => (
              <TouchableOpacity style={{marginLeft:10}} onPress={onPersonalSetting}>
                <Ionicons name='md-person-circle' size={45} color={Colors.puzzleBlue}></Ionicons>
              </TouchableOpacity>
            ),
            headerTitle:'設定',
            headerTitleAlign:'center',
            headerStyle:{backgroundColor:'#F2F2F2',height:70},
            headerTitleStyle:{fontSize:25, fontWeight:'bold'}
          }}></Drawer.Screen>
        <Drawer.Screen name='Setting' component={Setting}   
          options={{
            headerLeft: (props) => (
              <TouchableOpacity style={{marginLeft:10}} onPress={onPersonalSetting}>
                <Ionicons name='md-person-circle' size={45} color={Colors.puzzleBlue}></Ionicons>
              </TouchableOpacity>
            ),
            headerTitle:'設定',
            headerTitleAlign:'center',
            headerStyle:{backgroundColor:'#F2F2F2',height:70},
            headerTitleStyle:{fontSize:25, fontWeight:'bold'}
          }}></Drawer.Screen>
        <Drawer.Screen name='History' component={History}   
          options={{
            headerLeft: (props) => (
              <TouchableOpacity style={{marginLeft:10}} onPress={onPersonalSetting}>
                <Ionicons name='md-person-circle' size={45} color={Colors.puzzleBlue} ></Ionicons>
              </TouchableOpacity>
            ),
          }}></Drawer.Screen>
        <Drawer.Screen name='Certificate' component={Certificate}   
          options={{
            headerLeft: (props) => (
              <TouchableOpacity style={{marginLeft:10}} onPress={onPersonalSetting}>
                <Ionicons name='md-person-circle' size={45} color={Colors.puzzleBlue} ></Ionicons>
              </TouchableOpacity>
            ),
          }}></Drawer.Screen>
          <Drawer.Screen name='Logout' component={LogoutScreen}   
            options={{
              headerLeft: (props) => (
                <TouchableOpacity style={{marginLeft:10}} onPress={onPersonalSetting}>
                  <Ionicons name='md-person-circle' size={45} color={Colors.puzzleBlue} ></Ionicons>
                </TouchableOpacity>
              ),
            }}></Drawer.Screen>
      </Drawer.Navigator>
    );
  }



  return (
    // <AuthContext.Provider value={loginState}>        
      <NavigationContainer>  
        <Stack.Navigator>
          {props.loginToken !== null ? 
            (<Stack.Screen name='DrawerContainer' component={DrawerContainer} options={{headerShown: false}}></Stack.Screen>)
            : 
            (<Stack.Screen name='RootStackScreen' component={RootStackScreen} options={{headerShown: false}}></Stack.Screen>)
          } 
          {/* Wallet */}
          <Stack.Screen name='CredentialList' component={CredentialListScreen} ></Stack.Screen>
          <Stack.Screen name='CredentialDetail' component={CredentialDetailScreen} ></Stack.Screen>
          <Stack.Screen name='Form' component={Form} ></Stack.Screen>
          <Stack.Screen name='CredentialDetailCheck' component={CredentialDetailCheck} ></Stack.Screen>

          
          {/* Certificate */}
          <Stack.Screen name='SelectCredential' component={SelectCredential} ></Stack.Screen>
          <Stack.Screen name='QRCode' component={QRCodeScreen} ></Stack.Screen>
          <Stack.Screen name='MyRule' component={MyRule} ></Stack.Screen>
          <Stack.Screen name='RuleDetail' component={RuleDetail} ></Stack.Screen>
          

          {/* Common */}
          <Stack.Screen name='Loading' component={Loading} ></Stack.Screen>
          <Stack.Screen name='Scan' component={ScanScreen} options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen name='Success' component={SuccessScreen} ></Stack.Screen>




          
          
          {/* <Stack.Screen name='SelectDefinition' component={SelectDefinitionScreen} ></Stack.Screen> */}

          {/* Certificate */}
          {/* <Stack.Screen name='CreateQR' component={CreateQRScreen} ></Stack.Screen>
          <Stack.Screen name='QRCode' component={QRCodeScreen} ></Stack.Screen>
          <Stack.Screen name='GetCredential' component={GetCredentialScreen} ></Stack.Screen>
          <Stack.Screen name='CertificateHistory' component={CertificateHistoryScreen} ></Stack.Screen>
          <Stack.Screen name='CertificateHistoryDetail' component={CertificateHistoryDetailScreen} ></Stack.Screen> */}
          
          {/* utils */}
          </Stack.Navigator>                
      </NavigationContainer>
    // </AuthContext.Provider>
  );
};

const mapStateToProps = (state) => {  
  return {
      loginToken: state.loginToken
  };
}  

 
const styles = StyleSheet.create({
  headerTitle:{
    ontSize:25, 
    fontWeight:'bold'
  }
});

export default connect(mapStateToProps)(App);

