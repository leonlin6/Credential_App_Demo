
import React,{useState, useEffect} from 'react';
import { LogBox, StyleSheet } from "react-native"

// import { AuthContext } from './components/context';
import {connect} from 'react-redux';

import { NavigationContainer, TabActions, useFocusEffect } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator,  DrawerContentScrollView,  DrawerItemList, DrawerItem } from '@react-navigation/drawer';
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
import CredentialList from './screens/Wallet/CredentialList';
import CredentialDetail from './screens/Wallet/CredentialDetail';

//-----暫時:記得改掉----
import GetCredentialCheck from './screens/Wallet/GetCredentialCheck';
import SelectedCredDetail from './screens/Certificate/SelectedCredDetail';



// Certificate
import CertificateQR from './screens/Certificate/CertificateQR';
import SelectCredential from './screens/Certificate/SelectCredential';
import MyRule from './screens/Certificate/MyRule';
import RuleDetail from './screens/Certificate/RuleDetail';

// History
import CertificateHistoryScreen from './screens/Certificate/CertificateHistoryScreen';
import CertificateHistoryDetailScreen from './screens/Certificate/CertificateHistoryDetailScreen';

// common
import Scan from './screens/Wallet/Scan';
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


  // const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();
  // const AuthContext = createContext();

  const [showAuthDraw, setShowAuthDraw] = useState(false);
  const [showDrawerMenu, setShowDrawerMenu] = useState(false);
  const [showHeader, setShowHeader] = useState(false);

  const onPersonalSetting = () => {
    console.log('teststes');
  }

  const onPressHistory = () => {
    console.log('onPressHistory');

    setShowHeader(true);
  }

  const onMenuPress = () => {
    if(showDrawerMenu === true)
      navigation.closeDrawer();
    else
      navigation.openDrawer();
  }


  const DrawerContainer = () => {
    return(
      <Drawer.Navigator 
        initialRouteName="Wallet"
        screenOptions={({ route }) => ({
          headerShown:showHeader,
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
              <TouchableOpacity style={{marginLeft:10}} onPress={onPressHistory}>
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
          <Stack.Screen name='CredentialList' component={CredentialList} ></Stack.Screen>
          <Stack.Screen name='CredentialDetail' component={CredentialDetail} ></Stack.Screen>
          <Stack.Screen name='Form' component={Form} ></Stack.Screen>
          <Stack.Screen name='GetCredentialCheck' component={GetCredentialCheck} ></Stack.Screen>

          
          
          {/* Certificate */}
          <Stack.Screen 
            name='CertificateQR' 
            component={CertificateQR} 
            options={{
              headerShown:false
            }}
          ></Stack.Screen>
          <Stack.Screen name='MyRule' component={MyRule} ></Stack.Screen>
          <Stack.Screen name='RuleDetail' component={RuleDetail} ></Stack.Screen>
          

          {/* Scan-Certificate */}
          <Stack.Screen name='SelectCredential' component={SelectCredential} ></Stack.Screen>
          <Stack.Screen name='SelectedCredDetail' component={SelectedCredDetail} ></Stack.Screen>


          {/* Common */}
          <Stack.Screen name='Scan' component={Scan} options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen name='Success' component={SuccessScreen} ></Stack.Screen>

          {/* <Stack.Screen name='SelectDefinition' component={SelectDefinitionScreen} ></Stack.Screen> */}

          {/* Certificate */}
          {/* 
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

