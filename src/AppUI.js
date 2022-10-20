
import React,{useState, useEffect} from 'react';
import { LogBox, StyleSheet } from "react-native"

// import { AuthContext } from './components/context';
import {connect} from 'react-redux';

import { NavigationContainer, TabActions, useFocusEffect } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Login Page
import RootStackScreen from './navigators/RootStackScreen';

// navigators
import CredentialList from './screens/ui-remake/Credentials/CredentialList';
import Scan from './screens/ui-remake/Scan/ScanScreen';
// import VerifyQR from './screens/ui-remake/Verify/VerifyQRScreen';



import { 
  TouchableOpacity,
} from 'react-native';

const AppUI = (props) => {

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
  // const Drawer = createDrawerNavigator();
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

const TabContainer = () => {
  return(
    <Tab.Navigator 
      initialRouteName="CredentialList"
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
      <Tab.Screen name='CredentialList' component={CredentialList}   
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
        }}>
      </Tab.Screen>
      <Tab.Screen name='Scan' component={Scan}   
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
        }}>
      </Tab.Screen>
      {/* <Tab.Screen name='VerifyQR' component={VerifyQR}   
        options={{
          headerLeft: (props) => (
            <TouchableOpacity style={{marginLeft:10}} onPress={onPressHistory}>
              <Ionicons name='md-person-circle' size={45} color={Colors.puzzleBlue} ></Ionicons>
            </TouchableOpacity>
          ),
        }}>
      </Tab.Screen> */}
    </Tab.Navigator>
  );
}

  return (
    <NavigationContainer>  
      <Stack.Navigator>
        <Stack.Screen name='DrawerContainer' component={TabContainer} options={{headerShown: false}}></Stack.Screen>
      </Stack.Navigator>                
    </NavigationContainer>
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

export default connect(mapStateToProps)(AppUI);

