
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


// navigators
import CredentialList from './screens/ui-remake/Credentials/CredentialList';
import Scan from './screens/ui-remake/Scan/ScanScreen';
import Empty from './screens/ui-remake/Scan/Empty';
import Verify from './screens/ui-remake/Verify/Verify';

// stack
// import Login from './screens/ui-remake/Login/LoginScreen';
// import Splash from './screens/ui-remake/Login/SplashScreen';

import CredentialDetail from './screens/ui-remake/Credentials/CredentialDetail';
import ApplyCredential from './screens/ui-remake/Scan/ApplyCredential';
import ApplyCredConfirm from './screens/ui-remake/Scan/ApplyCredConfirm';

import VerifyRule from './screens/ui-remake/Scan/VerifyRule';
import SelectCredential from './screens/ui-remake/Scan/SelectCredential';
import VerifyCredConfirm from './screens/ui-remake/Scan/VerifyCredConfirm';
import VerifyResult from './screens/ui-remake/Common/VerifyResult';

// stack - History
import CredentialHistory from './screens/ui-remake/History/CredentialHistory';
import VerifierHistory from './screens/ui-remake/History/VerifierHistory';
import HistoryResult from './screens/ui-remake/History/HistoryResult';

// SVG
import TabCredentialsIcon from './assets/icons/SVG/TabCredentials.svg';
import TabCredentialsDisableIcon from './assets/icons/SVG/TabCredentialsDisable.svg';
import TabVerifyIcon from './assets/icons/SVG/TabVerify.svg';
import TabVerifyDisableIcon from './assets/icons/SVG/TabVerifyDisable.svg';
import ScannerIcon from './assets/icons/SVG/Scanner.svg';
import LeftArrowGreenIcon from './assets/icons/SVG/LeftArrowGreen.svg';

import LinearGradient from 'react-native-linear-gradient';

import { 
  TouchableOpacity,
} from 'react-native';
import { headline, themeColor } from './styles/theme.style';
import RootStackUI from './screens/ui-remake/Login/RootStackUI';

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

    const TabBar = ({ state, descriptors, navigation }) => {
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
                    : route.name ===  'Verify' ? <TabVerifyIcon/>
                    : null;
            }else{
              icon = route.name === 'CredentialList' ? <TabCredentialsDisableIcon/>
                    : route.name ===  'Empty' ? <CustomTabBarButton navigation={navigation}/>
                    : route.name ===  'Verify' ? <TabVerifyDisableIcon style={{backgroundColor:'white'}}/>
                    : null;
            }

            return (
              <TouchableOpacity
                key={route.name}
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

    // return to TabContainer
    return(
      <Tab.Navigator 
        initialRouteName="CredentialList"
        tabBar={props => <TabBar {...props} />}

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
        <Tab.Screen name='Verify' component={Verify}   
          options={{
            title:'Verify'
          }}>
        </Tab.Screen>
      </Tab.Navigator>
    );
  }

  // render page
  return (
    <NavigationContainer>  
      <Stack.Navigator
        screenOptions={{ 
          headerStyle: { 
          }, 
          headerTitleStyle: [{ 
            color:'black',
            
          }, headline.Headline3],
          headerTitleAlign: 'center',
          headerBackImage: ()=>( 
            <LeftArrowGreenIcon></LeftArrowGreenIcon>
           ),
        }}
      >

        {/* <Stack.Screen name='TabContainer' component={TabContainer} options={{headerShown: false}}></Stack.Screen> */}
          {props.loginToken !== null ? 
            (<Stack.Screen name='TabContainer' component={TabContainer} options={{headerShown: false}}></Stack.Screen>)
            : 
            (<Stack.Screen name='RootStackUI' component={RootStackUI} options={{headerShown: false}}></Stack.Screen>)
          } 
        <Stack.Screen name='CredentialDetail' component={CredentialDetail} options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name='Scan' component={Scan} options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name='ApplyCredential' component={ApplyCredential} options={{headerTitle:'Apply Credential', headerLeft:()=>null}}></Stack.Screen>
        <Stack.Screen name='ApplyCredConfirm' component={ApplyCredConfirm} options={{headerShown: false}}></Stack.Screen>

        <Stack.Screen name='VerifyRule' component={VerifyRule} options={{headerTitle:'Verify Rule', headerLeft:()=>null}}></Stack.Screen>
        <Stack.Screen name='SelectCredential' component={SelectCredential} options={{headerTitle:'Select Credential'}}></Stack.Screen>
        <Stack.Screen name='VerifyCredConfirm' component={VerifyCredConfirm} options={{headerShown: false}}></Stack.Screen> 
        <Stack.Screen name='VerifyResult' component={VerifyResult} options={{headerShown: false}}></Stack.Screen> 
        
        
        <Stack.Screen name='CredentialHistory' component={CredentialHistory} options={{headerTitle:'Credential History'}}></Stack.Screen> 
        <Stack.Screen name='VerifierHistory' component={VerifierHistory} options={{headerTitle:'Verify History'}}></Stack.Screen> 
        <Stack.Screen name='HistoryResult' component={HistoryResult} options={{headerShown: false}}></Stack.Screen> 

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
    backgroundColor:'white',
    borderColor:themeColor.DecoGreen,
    borderWidth:1
  },
  bottomBarLabel: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',

    fontFamily:'RedHatDisplay-Bold',
    fontSize:12,
  },

  headerTitle:{
    fontSize:25, 
    fontWeight:'bold'
  }
});

export default connect(mapStateToProps)(AppUI);

