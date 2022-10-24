
import React,{useState, useEffect} from 'react';
import { 
  LogBox, 
  StyleSheet ,
  View,
  Text
} from "react-native"
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
import VerifyQR from './screens/ui-remake/Verify/VerifyQRScreen';

// stack
import CredentialDetail from './screens/ui-remake/Credentials/CredentialDetail';
import Empty from './screens/ui-remake/Scan/Empty';


// SVG
import TabCredentialsIcon from './assets/icons/SVG/TabCredentials.svg';
import TabCredentialsDisableIcon from './assets/icons/SVG/TabCredentialsDisable.svg';
import TabVerifyIcon from './assets/icons/SVG/TabVerify.svg';
import TabVerifyDisableIcon from './assets/icons/SVG/TabVerifyDisable.svg';
import ScannerIcon from './assets/icons/SVG/Scanner.svg';

import LinearGradient from 'react-native-linear-gradient';

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

  const [showHeader, setShowHeader] = useState(false);

  const onPersonalSetting = () => {
    console.log('teststes');
  }

  const onPressHistory = () => {
    console.log('onPressHistory');
    setShowHeader(true);
  }


const TabContainer = () => {

  
  function MyTabBar({ state, descriptors, navigation }) {
    return (
      <View style={styles.bottomBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =  options.title !== undefined ? options.title
              : route.name;
  
          const isFocused = state.index === index;
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
  
           if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({ name: route.name, merge: true });
            }
          };
  
          let icon;
          if(isFocused){
            icon = route.name === 'CredentialList' ? <TabCredentialsIcon/>
                  : route.name ===  'Empty' ? <CustomTabBarButton navigation={navigation}/>
                  : route.name ===  'VerifyQR' ? <TabVerifyIcon/>
                  : null;
          }else{
            icon = route.name === 'CredentialList' ? <TabCredentialsDisableIcon/>
                  : route.name ===  'Empty' ? <CustomTabBarButton navigation={navigation}/>
                  : route.name ===  'VerifyQR' ? <TabVerifyDisableIcon style={{backgroundColor:'white'}}/>
                  : null;
          }

          return (
            <TouchableOpacity
              style={{justifyContent:'center', alignItems:'center', width:100}}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
            >
              {icon}
              <Text style={styles.bottomBarLabel}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  const CustomTabBarButton = ({navigation}) => {
    return (
      <TouchableOpacity 
        onPress={()=>{navigation.navigate('Scan')}}
        style={{
          top: 0,
          justifyContent:'center',
          alignItems:'center'
        }}>
        <LinearGradient colors={['#82ff96','#7cffff']} style={{width:60, height:60, borderRadius:8, justifyContent:'center', alignItems:'center'}}>
          <ScannerIcon></ScannerIcon>
        </LinearGradient>
      </TouchableOpacity>
    )
  }

  const ScanStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Scan" component={Scan} />
      </Stack.Navigator>
    )
  }

  return(
    <Tab.Navigator 
      initialRouteName="CredentialList"
      tabBar={props => <MyTabBar {...props} />}

      screenOptions={({ route }) => ({
        headerShown:showHeader,
        defaultStatus:"open",
        gestureEnabled:false,
        tabBarInactiveTintColor: 'black',
        tabBarActiveTintColor: 'black',
      })}>
      <Tab.Screen name='CredentialList' component={CredentialList}   
        options={{
          title:'Credentials'
        }}>
      </Tab.Screen>
      <Tab.Screen name='Empty' component={Empty}   
        options={{
          title:''

        }}>
      </Tab.Screen>
      <Tab.Screen name='VerifyQR' component={VerifyQR}   
        options={{
          title:'Verify'

        }}>
      </Tab.Screen>
    </Tab.Navigator>
  );
}

  return (
    <NavigationContainer>  
      <Stack.Navigator>
        <Stack.Screen name='TabContainer' component={TabContainer} options={{headerShown: false}}></Stack.Screen>

        <Stack.Screen name='CredentialDetail' component={CredentialDetail} options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name='Scan' component={Scan} options={{headerShown: false}}></Stack.Screen>

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
  bottomBar: {
    flex:1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',

    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    height: 66,
    borderRadius:60,
    paddingBottom:10,
    backgroundColor:'white'
  },
  bottomBarLabel: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',

    fontFamily:'RedHatDisplay-Bold',
    fontSize:12,
  },

  headerTitle:{
    ontSize:25, 
    fontWeight:'bold'
  }
});

export default connect(mapStateToProps)(AppUI);

