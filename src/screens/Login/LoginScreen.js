import React, {useEffect, useState, useRef} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import messaging from '@react-native-firebase/messaging';
import indy from 'indy-sdk-react-native';
import axios from 'axios';
import RNFS from 'react-native-fs';

import {connect} from 'react-redux';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Keyboard,
} from 'react-native';

// import LoginData from '../APIs/LoginData';
import {setLoginToken} from '../../actions/index'

const LOGO_CIRCLE_HEIGHT = 150;
const LOGO_SMALL_CIRCLE_HEIGHT = 100;
const LOGO_WIDTH = 75;
const LOGO_SMALL_WIDTH = 50;

const LoginScreen = (props) => {
  const [userName , setUserName] = useState('');
  const [password , setPassword] = useState('');
  // const [userToken, setUserToken] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [inputIDFocus, setInputIDFocus] = useState(false);
  const [inputPasswordFocus, setInputPasswordFocus] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);

  const IDWrapStyle = inputIDFocus? styles.inputWrapFocus : styles.inputWrap;
  const passwordWrapStyle = inputPasswordFocus? styles.inputWrapFocus : styles.inputWrap;
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);
  var resizeLogoCircleAnim = useRef(new Animated.Value(LOGO_CIRCLE_HEIGHT)).current;
  var resizeLogoAnim = useRef(new Animated.Value(LOGO_WIDTH)).current;

  const walletConfig = {id: 'sbadmin@gmail.com'};
  const walletCredentials = {key: '12345678'};
  const local_pool_name = 'genesis';
  let isFirstLogin;

  useEffect(() => {
    const determineFirstLogin = async () => {
      const WH = await AsyncStorage.getItem('@WalletHandle');
      console.log('---------WH--------', WH);
      if(WH === null){
        isFirstLogin = true;
      }
      else{
        isFirstLogin = false;
      }
    }
    determineFirstLogin();
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  })

  // run keyboard animation stuff
  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      Animated.timing(resizeLogoCircleAnim,{
        duration: 700,
        toValue: LOGO_SMALL_CIRCLE_HEIGHT,
        useNativeDriver: false
      }).start();

      Animated.timing(resizeLogoAnim,{
        duration: 700,
        toValue: LOGO_SMALL_WIDTH,
        useNativeDriver: false
      }).start();
    });

    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      Animated.timing(resizeLogoCircleAnim,{
        duration: 500,
        toValue: LOGO_CIRCLE_HEIGHT,
        useNativeDriver: false
      }).start();

      Animated.timing(resizeLogoAnim,{
        duration: 500,
        toValue: LOGO_WIDTH,
        useNativeDriver: false
      }).start();
    });


    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }
  ,[]);



  // indy sdk control
  const createWallet = async () => {
    try{
      console.log('-----createWallet onPress-----');
      const result = await indy.createWallet(walletConfig, walletCredentials);
      console.log('result', result);
    } catch(error){
      console.log(error);
    }
  }

  const openWallet = async () => {
    try{
      console.log('-----openWallet onPress-----');
      const result = await indy.openWallet(walletConfig, walletCredentials);
      await AsyncStorage.setItem('@WalletHandle',result.toString())

      console.log('result', result);
    } catch(error){
      console.log(error);
    }
  }



  const createPool = async () => {
    try{
    console.log('-----create pool onPress-----');

      var path = RNFS.DocumentDirectoryPath + '/test.txt';

      let ttt = `{"reqSignature":{},"txn":{"data":{"data":{"alias":"Node1","blskey":"4N8aUNHSgjQVgkpm8nhNEfDf6txHznoYREg9kirmJrkivgL4oSEimFF6nsQ6M41QvhM2Z33nves5vfSn9n1UwNFJBYtWVnHYMATn76vLuL3zU88KyeAYcHfsih3He6UHcXDxcaecHVz6jhCYz1P2UZn2bDVruL5wXpehgBfBaLKm3Ba","blskey_pop":"RahHYiCvoNCtPTrVtP7nMC5eTYrsUA8WjXbdhNc8debh1agE9bGiJxWBXYNFbnJXoXhWFMvyqhqhRoq737YQemH5ik9oL7R4NTTCz2LEZhkgLJzB3QRQqJyBNyv7acbdHrAT8nQ9UkLbaVL9NBpnWXBTw4LEMePaSHEw66RzPNdAX1","client_ip":"192.168.0.101","client_port":9702,"node_ip":"192.168.0.101","node_port":9701,"services":["VALIDATOR"]},"dest":"Gw6pDLhcBcoQesN72qfotTgFa7cbuqZpkX3Xo6pLhPhv"},"metadata":{"from":"Th7MpTaRZVRYnPiabds81Y"},"type":"0"},"txnMetadata":{"seqNo":1,"txnId":"fea82e10e894419fe2bea7d96296a6d46f50f93f9eeda954ec461b2ed2950b62"},"ver":"1"}
      {"reqSignature":{},"txn":{"data":{"data":{"alias":"Node2","blskey":"37rAPpXVoxzKhz7d9gkUe52XuXryuLXoM6P6LbWDB7LSbG62Lsb33sfG7zqS8TK1MXwuCHj1FKNzVpsnafmqLG1vXN88rt38mNFs9TENzm4QHdBzsvCuoBnPH7rpYYDo9DZNJePaDvRvqJKByCabubJz3XXKbEeshzpz4Ma5QYpJqjk","blskey_pop":"Qr658mWZ2YC8JXGXwMDQTzuZCWF7NK9EwxphGmcBvCh6ybUuLxbG65nsX4JvD4SPNtkJ2w9ug1yLTj6fgmuDg41TgECXjLCij3RMsV8CwewBVgVN67wsA45DFWvqvLtu4rjNnE9JbdFTc1Z4WCPA3Xan44K1HoHAq9EVeaRYs8zoF5","client_ip":"192.168.0.101","client_port":9704,"node_ip":"192.168.0.101","node_port":9703,"services":["VALIDATOR"]},"dest":"8ECVSk179mjsjKRLWiQtssMLgp6EPhWXtaYyStWPSGAb"},"metadata":{"from":"EbP4aYNeTHL6q385GuVpRV"},"type":"0"},"txnMetadata":{"seqNo":2,"txnId":"1ac8aece2a18ced660fef8694b61aac3af08ba875ce3026a160acbc3a3af35fc"},"ver":"1"}
      {"reqSignature":{},"txn":{"data":{"data":{"alias":"Node3","blskey":"3WFpdbg7C5cnLYZwFZevJqhubkFALBfCBBok15GdrKMUhUjGsk3jV6QKj6MZgEubF7oqCafxNdkm7eswgA4sdKTRc82tLGzZBd6vNqU8dupzup6uYUf32KTHTPQbuUM8Yk4QFXjEf2Usu2TJcNkdgpyeUSX42u5LqdDDpNSWUK5deC5","blskey_pop":"QwDeb2CkNSx6r8QC8vGQK3GRv7Yndn84TGNijX8YXHPiagXajyfTjoR87rXUu4G4QLk2cF8NNyqWiYMus1623dELWwx57rLCFqGh7N4ZRbGDRP4fnVcaKg1BcUxQ866Ven4gw8y4N56S5HzxXNBZtLYmhGHvDtk6PFkFwCvxYrNYjh","client_ip":"192.168.0.101","client_port":9706,"node_ip":"192.168.0.101","node_port":9705,"services":["VALIDATOR"]},"dest":"DKVxG2fXXTU8yT5N7hGEbXB3dfdAnYv1JczDUHpmDxya"},"metadata":{"from":"4cU41vWW82ArfxJxHkzXPG"},"type":"0"},"txnMetadata":{"seqNo":3,"txnId":"7e9f355dffa78ed24668f0e0e369fd8c224076571c51e2ea8be5f26479edebe4"},"ver":"1"}
      {"reqSignature":{},"txn":{"data":{"data":{"alias":"Node4","blskey":"2zN3bHM1m4rLz54MJHYSwvqzPchYp8jkHswveCLAEJVcX6Mm1wHQD1SkPYMzUDTZvWvhuE6VNAkK3KxVeEmsanSmvjVkReDeBEMxeDaayjcZjFGPydyey1qxBHmTvAnBKoPydvuTAqx5f7YNNRAdeLmUi99gERUU7TD8KfAa6MpQ9bw","blskey_pop":"RPLagxaR5xdimFzwmzYnz4ZhWtYQEj8iR5ZU53T2gitPCyCHQneUn2Huc4oeLd2B2HzkGnjAff4hWTJT6C7qHYB1Mv2wU5iHHGFWkhnTX9WsEAbunJCV2qcaXScKj4tTfvdDKfLiVuU2av6hbsMztirRze7LvYBkRHV3tGwyCptsrP","client_ip":"192.168.0.101","client_port":9708,"node_ip":"192.168.0.101","node_port":9707,"services":["VALIDATOR"]},"dest":"4PS3EDQ3dW1tci1Bp6543CfuuebjFrg36kLAUcskGfaA"},"metadata":{"from":"TWwCRQRZ2ZHMJFn9TzLp7W"},"type":"0"},"txnMetadata":{"seqNo":4,"txnId":"aa5e817d7cc626170eca175822029339a444eb0ee8f0bd20d3b0b76e566fb008"},"ver":"1"}`
    
      
        // write the file
      RNFS.writeFile(path, ttt, 'utf8')
        .then((success) => {
          console.log('path',path);
          console.log('FILE WRITTEN!');
        })
        .catch((err) => {
          console.log(err.message);
        });
      let pool_config = {genesis_txn:path};

      const result = await indy.createPoolLedgerConfig(local_pool_name, pool_config);
      console.log('result', result);

    } catch(error){
      console.log(error);
    }
  }

  const openPool = async () => {
    try{
      console.log('-----open pool onPress-----');
      var path = RNFS.DocumentDirectoryPath + '/test.txt';
      let pool_config = {genesis_txn:path};
      let result = await indy.openPoolLedger(local_pool_name,);
      console.log('open pool result', result);
    } catch(error){
      console.log(error);
    }
  }


  const initPoolandWallet = async () => {
    // const walletName = {id: data.id};
    // const walletCredentials = {key: data.pw};
    
    // let walletInfo = AsyncStorage.getItem('WalletInfo');
    // const isWalletExist = walletInfo === null ? false : true;

    if(isFirstLogin){
      console.log('------create pool & wallet-----');
      await createPool();
      await openPool();
      await createWallet();
      await openWallet();
    }else{
      console.log('------not create pool & wallet-----');
      await openPool();
      await openWallet();
    }
  }


  // login control
  const requestLogin = async () => {
    const configurationObject = {
      method: 'post',
      url: `http://192.168.0.101:5001/api/auth/login`,
      data:{
        username:'sbadmin@gmail.com',
        password:'12345678'
      }
    };

    const response = await axios(configurationObject);
    if(response.data !== undefined){
      await initPoolandWallet().then(()=>{
        setIsLoading(false);
        props.setLoginToken(response.data.accessToken);
        AsyncStorage.setItem('@userToken' , JSON.stringify(response.data.accessToken));
        AsyncStorage.setItem('@userInfo' , JSON.stringify({
          username:'sbadmin@gmail.com',
          password:'12345678'
        }));
      });
    }
  };

  const onPressLogin = () => {
    try{
      setIsLoading(true);

      requestLogin();
    }catch(error){
      console.log('error', error);
    }
  }

  const handleUserNameChange = (val) => {    
    if( val.trim().length >= 8 ) {
      setUserName(val);


      // setData({
      //     ...data,
      //     id: val,
      //     isPasswordValid: true
      // });
    } else {
      setUserName(val);



      // setData({
      //     ...data,
      //     id: val,
      //     isPasswordValid: false
      // });
    }
  }

  const handlePasswordChange = (val) => {
    // if( val.trim().length >= 8 ) {
    //   setData({
    //       ...data,
    //       pw: val,
    //       isPasswordValid: true
    //   });
    // } else {
    //   setData({
    //       ...data,
    //       pw: val,
    //       isPasswordValid: false
    //   });
    // }
    setPassword(val);

  }

  const onPwIconPress = () => {
    setPasswordShow(!passwordShow);
  }
  

  if(isLoading){
    return(
      <View style={styles.loadingWrap}>
        <ActivityIndicator size='large'></ActivityIndicator>
      </View>
    )
  }

  return (
    <View style={styles.container} >
      <View style={styles.header}>
        <View style={styles.logoWrap}>
          <View style={styles.circleWrap}>
            <Animated.View style={[styles.circle, {height:resizeLogoCircleAnim, width:resizeLogoCircleAnim}]}>
              <Animated.Image 
                style={[styles.logo, {width:resizeLogoAnim}]}
                source={require('../../assets/images/logo.png')}
                resizeMode="stretch"
              ></Animated.Image>
            </Animated.View>
          </View>
        </View>
        <Animatable.View
          animation="lightSpeedIn"
          style={styles.logoTextWrap}>
          <Text style={styles.logoText}>Snowbridge</Text>
        </Animatable.View>
      </View>
      {/* <Animatable.View 
        animation="fadeInUpBig"
        style={styles.footer}> */}
      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <View style={IDWrapStyle}> 
            <View style={styles.idInputIcon}>
              <Ionicons name='md-person-circle-sharp' size={25} ></Ionicons>
            </View>
            <View style={styles.idIinput}>
              <TextInput
                placeholder="電子信箱"
                onChangeText={(val) => {handleUserNameChange(val)}}
                style={{padding:0, margin:0}}
                onFocus={() => {setInputIDFocus(true)}}
                onBlur={() => {setInputIDFocus(false)}}
                value={userName}
              />
            </View>
          </View>
          <View style={passwordWrapStyle}>
            <View style={styles.idInputIcon}>
              <Ionicons name='key' size={25} ></Ionicons>
            </View>
            <View style={styles.pwInput}>
              <TextInput
                style={{padding:0,margin:0}}
                placeholder="請輸入使用者密碼"
                onChangeText={(val) => {handlePasswordChange(val)}}
                onFocus={() => {setInputPasswordFocus(true)}}
                onBlur={() => {setInputPasswordFocus(false)}} 
                secureTextEntry={!passwordShow}
                value={password}             
              />
            </View>
            <View style={styles.passwordInputIcon}>                
              <TouchableOpacity  onPress={onPwIconPress}>
                <Ionicons 
                  name = {passwordShow ? 'md-eye' : 'md-eye-off'}
                  size={25} 
                ></Ionicons>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={onPressLogin}
          >
            <Text>Login</Text>
          </TouchableOpacity>
        </View>
      {/* </Animatable.View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    fontSize: 25,
    backgroundColor:'white',
    justifyContent:'flex-end',

  },
  header:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    paddingTop: 30,
    backgroundColor:'#0f659d',
    borderBottomRightRadius: 125,
    paddingHorizontal: 30
  },  
  loadingWrap:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200
  },
  logoWrap:{
    flex:2,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 5,
  },
  circleWrap: {
    backgroundColor: 'white',
    justifyContent:'center',
    alignItems:"center",
    padding: 5,
    borderRadius: 1000,
    minHeight: 75
  },
  circle:{
    justifyContent:'center',
    alignItems:"center",
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 1000, 
  },
  logo:{
    alignItems: 'center',
  },
  logoTextWrap:{
    flex: 1,

  },
  logoText:{
    color:'white',
    fontSize: 36,
    fontFamily:"DancingScript-Regular",
    
  },  
  footer:{
    flex:1,
    backgroundColor: '#0f659d',
  },

  inputContainer:{
    flex:2,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderTopLeftRadius: 125,
    paddingTop:75
  },
  inputWrap:{
    width: 250,
    borderBottomWidth: 1, 
    borderColor: 'black',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap:'nowrap',
    marginBottom: 25
  },  
  inputWrapFocus:{
    width: 250,    
    borderBottomWidth: 1, 
    borderColor: '#0f659d',    
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginBottom: 25

  },  

  idIinput:{
    flex:5,
    borderWidth: 0,
    paddingBottom:0,
    width: 100,
    height:25
  },
  idInputIcon:{
    flex:1,
    height:25,
  },
  pwInput:{
    flex: 4,
    borderWidth: 0,
    paddingBottom:0,
    width: 100,
    height:25
  },
  passwordInputIcon:{
    flex:1,
    height:25
  },
  loginBtn:{
    borderWidth: 1,      
    borderColor: '#0f659d',
    borderRadius: 10,
    width:250,
    alignItems:'center',    
    paddingVertical:5
  }
});

const mapStateToProps = (state) => {  
  return {
      loginToken: state.loginToken
  };
}

export default connect(mapStateToProps, {setLoginToken})(LoginScreen);