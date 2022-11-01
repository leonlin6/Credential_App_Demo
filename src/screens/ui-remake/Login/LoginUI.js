import React, {useEffect, useState, useRef} from 'react';
import { 
  View, 
  Text, 
  Image,
  TextInput, 
  StyleSheet, 
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Keyboard,
  ImageBackground ,
  BackHandler,
  Alert
} from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import indy from 'indy-sdk-react-native';
import axios from 'axios';
import RNFS from 'react-native-fs';
import { ENDPOINT_BASE_URL } from '../../../APIs/APIs';

import { SafeAreaView } from 'react-native-safe-area-context'
import LinearGradient from 'react-native-linear-gradient';

// icon
import Logo from '../../../assets/icons/SVG/Logo.svg';
import NameMark from '../../../assets/icons/SVG/NameMark.svg';
import QuickLogin from '../../../assets/icons/SVG/QuickLogin.svg';


// redux
import { connect } from 'react-redux';
import { setLoginToken, setWalletHandle, setPoolHandle, setMasterSecret, setIsFirstLogin } from '../../../actions/index'
import { headline, content, themeColor, hint } from '../../../styles/theme.style';
import { set } from 'react-native-reanimated';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const LoginUI = (props) => {

  const [isLoading, setIsLoading] = useState(false);

  const inputValue0 = useRef();
  const inputValue1 = useRef();
  const inputValue2 = useRef();
  const inputValue3 = useRef();
  const valueRefContainer = [inputValue0, inputValue1, inputValue2, inputValue3];

  const refInput0 = useRef();
  const refInput1 = useRef();
  const refInput2 = useRef();
  const refInput3 = useRef();
  const inputRefContainer = [refInput0, refInput1, refInput2, refInput3];

  const currentRefIndex = useRef();


  const walletConfig = {id: 'sbadmin@gmail.com'};
  const walletCredentials = {key: '12345678'};
  const local_pool_name = 'genesis';
  let isFirstLogin;
  let WH;
  let prover_link_secret_name = 'link_secret234';

  useEffect(() => {
    currentRefIndex.current = 0;
  },[]);

  useEffect(() => {
    const determineFirstLogin = async () => {
      const isWalletExist = await AsyncStorage.getItem('@HasWallet');
      if(isWalletExist === 'true'){
        isFirstLogin = false;
      }
      else{
        isFirstLogin = true;
      }
    }
    determineFirstLogin();

  })

  useEffect(() => {
    if(props.walletHandle !== null){
      console.log('props create master secret in');
      createMasterSecret();

    }

  },[props.walletHandle])

  // indy sdk control function
  const createWallet = async () => {
    try{
      console.log('====createWallet onPress====');
      const result = await indy.createWallet(walletConfig, walletCredentials);
      await AsyncStorage.setItem('@HasWallet', 'true');

      console.log('result', result);
    } catch(error){
      console.log(error);
    }
  }

  const openWallet = async () => {
    try{
      console.log('====openWallet onPress====');
      const result = await indy.openWallet(walletConfig, walletCredentials);
      WH = result;
      props.setWalletHandle(result);
      console.log('result', result);
    } catch(error){
      console.log(error);
    }
  }



  const createPool = async () => {
    try{
    console.log('====create pool onPress====');

      var path = RNFS.DocumentDirectoryPath + '/test.txt';


      
      let ttt = `{"reqSignature":{},"txn":{"data":{"data":{"alias":"Node1","blskey":"4N8aUNHSgjQVgkpm8nhNEfDf6txHznoYREg9kirmJrkivgL4oSEimFF6nsQ6M41QvhM2Z33nves5vfSn9n1UwNFJBYtWVnHYMATn76vLuL3zU88KyeAYcHfsih3He6UHcXDxcaecHVz6jhCYz1P2UZn2bDVruL5wXpehgBfBaLKm3Ba","blskey_pop":"RahHYiCvoNCtPTrVtP7nMC5eTYrsUA8WjXbdhNc8debh1agE9bGiJxWBXYNFbnJXoXhWFMvyqhqhRoq737YQemH5ik9oL7R4NTTCz2LEZhkgLJzB3QRQqJyBNyv7acbdHrAT8nQ9UkLbaVL9NBpnWXBTw4LEMePaSHEw66RzPNdAX1","client_ip":"35.236.189.49","client_port":9702,"node_ip":"35.236.189.49","node_port":9701,"services":["VALIDATOR"]},"dest":"Gw6pDLhcBcoQesN72qfotTgFa7cbuqZpkX3Xo6pLhPhv"},"metadata":{"from":"Th7MpTaRZVRYnPiabds81Y"},"type":"0"},"txnMetadata":{"seqNo":1,"txnId":"fea82e10e894419fe2bea7d96296a6d46f50f93f9eeda954ec461b2ed2950b62"},"ver":"1"}
      {"reqSignature":{},"txn":{"data":{"data":{"alias":"Node2","blskey":"37rAPpXVoxzKhz7d9gkUe52XuXryuLXoM6P6LbWDB7LSbG62Lsb33sfG7zqS8TK1MXwuCHj1FKNzVpsnafmqLG1vXN88rt38mNFs9TENzm4QHdBzsvCuoBnPH7rpYYDo9DZNJePaDvRvqJKByCabubJz3XXKbEeshzpz4Ma5QYpJqjk","blskey_pop":"Qr658mWZ2YC8JXGXwMDQTzuZCWF7NK9EwxphGmcBvCh6ybUuLxbG65nsX4JvD4SPNtkJ2w9ug1yLTj6fgmuDg41TgECXjLCij3RMsV8CwewBVgVN67wsA45DFWvqvLtu4rjNnE9JbdFTc1Z4WCPA3Xan44K1HoHAq9EVeaRYs8zoF5","client_ip":"35.236.189.49","client_port":9704,"node_ip":"35.236.189.49","node_port":9703,"services":["VALIDATOR"]},"dest":"8ECVSk179mjsjKRLWiQtssMLgp6EPhWXtaYyStWPSGAb"},"metadata":{"from":"EbP4aYNeTHL6q385GuVpRV"},"type":"0"},"txnMetadata":{"seqNo":2,"txnId":"1ac8aece2a18ced660fef8694b61aac3af08ba875ce3026a160acbc3a3af35fc"},"ver":"1"}
      {"reqSignature":{},"txn":{"data":{"data":{"alias":"Node3","blskey":"3WFpdbg7C5cnLYZwFZevJqhubkFALBfCBBok15GdrKMUhUjGsk3jV6QKj6MZgEubF7oqCafxNdkm7eswgA4sdKTRc82tLGzZBd6vNqU8dupzup6uYUf32KTHTPQbuUM8Yk4QFXjEf2Usu2TJcNkdgpyeUSX42u5LqdDDpNSWUK5deC5","blskey_pop":"QwDeb2CkNSx6r8QC8vGQK3GRv7Yndn84TGNijX8YXHPiagXajyfTjoR87rXUu4G4QLk2cF8NNyqWiYMus1623dELWwx57rLCFqGh7N4ZRbGDRP4fnVcaKg1BcUxQ866Ven4gw8y4N56S5HzxXNBZtLYmhGHvDtk6PFkFwCvxYrNYjh","client_ip":"35.236.189.49","client_port":9706,"node_ip":"35.236.189.49","node_port":9705,"services":["VALIDATOR"]},"dest":"DKVxG2fXXTU8yT5N7hGEbXB3dfdAnYv1JczDUHpmDxya"},"metadata":{"from":"4cU41vWW82ArfxJxHkzXPG"},"type":"0"},"txnMetadata":{"seqNo":3,"txnId":"7e9f355dffa78ed24668f0e0e369fd8c224076571c51e2ea8be5f26479edebe4"},"ver":"1"}
      {"reqSignature":{},"txn":{"data":{"data":{"alias":"Node4","blskey":"2zN3bHM1m4rLz54MJHYSwvqzPchYp8jkHswveCLAEJVcX6Mm1wHQD1SkPYMzUDTZvWvhuE6VNAkK3KxVeEmsanSmvjVkReDeBEMxeDaayjcZjFGPydyey1qxBHmTvAnBKoPydvuTAqx5f7YNNRAdeLmUi99gERUU7TD8KfAa6MpQ9bw","blskey_pop":"RPLagxaR5xdimFzwmzYnz4ZhWtYQEj8iR5ZU53T2gitPCyCHQneUn2Huc4oeLd2B2HzkGnjAff4hWTJT6C7qHYB1Mv2wU5iHHGFWkhnTX9WsEAbunJCV2qcaXScKj4tTfvdDKfLiVuU2av6hbsMztirRze7LvYBkRHV3tGwyCptsrP","client_ip":"35.236.189.49","client_port":9708,"node_ip":"35.236.189.49","node_port":9707,"services":["VALIDATOR"]},"dest":"4PS3EDQ3dW1tci1Bp6543CfuuebjFrg36kLAUcskGfaA"},"metadata":{"from":"TWwCRQRZ2ZHMJFn9TzLp7W"},"type":"0"},"txnMetadata":{"seqNo":4,"txnId":"aa5e817d7cc626170eca175822029339a444eb0ee8f0bd20d3b0b76e566fb008"},"ver":"1"}`

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
      console.log('====open pool onPress====');
      var path = RNFS.DocumentDirectoryPath + '/test.txt';
      console.log('---path---', path);
      let pool_config = {genesis_txn:path};
      const result = await indy.openPoolLedger(local_pool_name);
      props.setPoolHandle(result);
      console.log('open pool result', result);
    } catch(error){
      console.log(error);
    }
  }

  const createMasterSecret = async () => {
    console.log('====createMasterSecret on press====');
    try{
      const secretID = await AsyncStorage.getItem('@MasterSecretID');
      console.log('---secretID----',secretID);

      if(secretID !== null){
        console.log('---secretID exist----');
        props.setMasterSecret(secretID);
      }else{
        console.log('---secretID null---');
        console.log('---props.walletHandle---',props.walletHandle);
        console.log('---type---',typeof props.walletHandle);


        console.log('---prover_link_secret_name---',prover_link_secret_name);
        console.log('---type---',typeof prover_link_secret_name);


        let master_secret_id = await indy.proverCreateMasterSecret(WH, prover_link_secret_name);
        console.log('---master_secret_id---',master_secret_id);
        console.log('---type---',typeof master_secret_id);

        props.setMasterSecret(master_secret_id);

        await AsyncStorage.setItem('@MasterSecretID', master_secret_id);
        console.log('---createMasterSecret END---');
        
      }



    } catch(error){
      console.log(error);
    }
  }
  
  // indy sdk control - first login / not first login
  const initPoolandWallet = async () => {
    console.log('set is first login', isFirstLogin);
    props.setIsFirstLogin(isFirstLogin);

    if(isFirstLogin){
      console.log('------create pool & wallet-----');
      await createPool();
      await openPool();
      await createWallet();
      await openWallet();
      await createMasterSecret();

    }else{
      console.log('------not create pool & wallet-----');
      await openPool();
      await openWallet();
      await createMasterSecret();

    }
  }


  // login request
  const requestLogin = async () => {
    console.log('=====requestLogin=====');
    const configurationObject = {
      method: 'post',
      baseURL: ENDPOINT_BASE_URL,
      url: 'api/auth/login',
      data:{
        username:'sbadmin@gmail.com',
        password:'12345678'
      }
    };

    const response = await axios(configurationObject);
    if(response.data !== undefined){
      await initPoolandWallet().then(()=>{
        console.log('request last step');
        console.log('response.accessTolen',response.data.accessToken);

        props.setLoginToken(response.data.accessToken);
        
        AsyncStorage.setItem('@userToken' , JSON.stringify(response.data.accessToken));
      });
    }

    //use for test
    // props.setLoginToken('tesst1234');
    // AsyncStorage.setItem('@userToken' ,'test1234');


  };

  const Divider = () => {
    return (
      <View style={styles.dividerArea}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1, height: 1, backgroundColor: themeColor.DarkDark60}} />
          <View>
            <Text style={[headline.Headline5, {width: 50, textAlign: 'center', color:themeColor.DarkDark60 }]}>Or</Text>
          </View>
          <View style={{flex: 1, height: 1, backgroundColor: themeColor.DarkDark60}} />
        </View>
      </View>
    );
  }

  const onChangePin = (text, valueRef, refIndex) => {
    console.log('=======onChangePin start=======',text);

    console.log('text',text);
    valueRef.current = text;
    console.log('onChangePin currentRefIndex', refIndex);

    if(refIndex !== 3){
      currentRefIndex.current = refIndex + 1;
      console.log('currentRefIndex', currentRefIndex.current);
      inputRefContainer[refIndex+1].current.focus();
    }else{
      console.log('currentRefIndex', currentRefIndex.current);
      console.log('end',valueRefContainer);
      setIsLoading(true);
      requestLogin();
    }
  }

  const handleKeyDown = (e) => {
    if(e.nativeEvent.key == "Backspace"){
      if( currentRefIndex.current === 0){
        valueRefContainer[0].current = 0;
      }else{
        console.log('=====handleKeyDown currentRefIndex',currentRefIndex.current);
        valueRefContainer[currentRefIndex.current-1].current = '';
        inputRefContainer[currentRefIndex.current-1].current.focus();
        currentRefIndex.current = currentRefIndex.current - 1;

      }
    }
  }

  const onPinTarget = () => {
    console.log('onPinTarget currentRefIndex', currentRefIndex);
    inputRefContainer[currentRefIndex.current].current.focus();
  }

  const onQuickLogin = () => {


  }



  const SinglePinTextInput = (props) => {
    const [inputBorderColor, setInputBorderColor] = useState('rgb(246,247,247)');

    return(
      <TextInput         
        style={[styles.pinInput, {borderColor:inputBorderColor, borderWidth:3}]}
        onChangeText={(text)=>{onChangePin( text, props.valueRef, props.refIndex)}}
        value={props.valueRef.current}
        onFocus={(e)=>{setInputBorderColor(themeColor.SemanticHighlight);}}    
        onBlur={(e)=>{setInputBorderColor('rgb(246,247,247)');}}
        keyboardType="numeric"
        maxLength={1}
        textAlign='center'
        returnKeyType='next'
        ref={inputRefContainer[props.refIndex]}
        cursorColor='rgb(246,247,247)'
        selectTextOnFocus={true}
        onKeyPress={(e)=>{handleKeyDown(e)}}
      >
      </TextInput>
    )
  }

  return (
    isLoading ? (
      <View style={styles.loadingWrap}>
      <ActivityIndicator size='large'></ActivityIndicator>
      <Text style={styles.loadingText}>初始化錢包</Text>
    </View>
    )
    :
    (
      <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../../../assets/background/BG1.png')} resizeMode={'stretch'} style={styles.background}>
        <View style={styles.header}>
          <Image style={styles.logo} source={require('../../../assets/icons/PNG/Logo.png')}></Image>
          <Text style={[headline.Headline1, styles.title]}>LOGIN</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.loginArea}>
            <View style={styles.hintArea}>
              <Text style={[hint.Default, styles.hint]}>Login as whangwang0430@gmail.com</Text>
            </View>
            <View style={styles.pincodeArea}>
              <Text style={[headline.Headline4, styles.pincodeTitle]}>PIN Code</Text>
              <View style={styles.inputArea}>
                <TouchableOpacity onPress={onPinTarget} style={{flex:1, position:'absolute', width:'100%', height:'100%', zIndex:2}}></TouchableOpacity>
                <SinglePinTextInput valueRef={inputValue0} refIndex={0} ></SinglePinTextInput>
                <SinglePinTextInput valueRef={inputValue1} refIndex={1} ></SinglePinTextInput>
                <SinglePinTextInput valueRef={inputValue2} refIndex={2} ></SinglePinTextInput>
                <SinglePinTextInput valueRef={inputValue3} refIndex={3} ></SinglePinTextInput>
              </View>
            </View>
            <Divider></Divider>
            <TouchableOpacity onPress={onQuickLogin} style={styles.quickLoginArea}>
              <QuickLogin style={{marginRight:6}}></QuickLogin>
              <Text style={[content.DefaultBold, styles.quickLoginText]}>Quick Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
    )

    )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  loadingWrap:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText:{
    marginTop:10,
    fontSize:20,
    color:'black'
  },  
  background:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  header:{
    flex: 2,
    justifyContent:'center',
    alignItems:'center',
  },
  logo:{
    height:81,
    width:81,
    marginBottom:12
  },
  title:{
    color:themeColor.DarkDark0
  },
  body:{
    flex:5,
    paddingHorizontal:12

  },  
  loginArea:{
    width: 343,
    height:281,
    backgroundColor:themeColor.DarkDark0,
    borderRadius:6,
    paddingVertical:24,
    paddingHorizontal:16

  },
  hintArea:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  hint:{
    color: themeColor.DarkDark60,
    justifyContent:'center',
    alignItems:'center'
  },
  pincodeArea:{
    flex:2,

  },
  inputArea:{
    flexDirection:'row',
    flex:2,
    justifyContent:'space-evenly',


  },
  pinInput: {
    height: 50,
    width:65,
    borderWidth: 1,
    borderColor:'rgb(246,247,247)',
    padding: 10,
    borderRadius:8,
    backgroundColor:'rgb(246,247,247)'
  },
  pincodeTitle:{
    marginBottom:8,
    color: themeColor.DarkDark,
    
  },
  dividerArea:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  quickLoginArea:{
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'

  },
  quickLoginText:{
    color: themeColor.SemanticHighlight
  }
});

const mapStateToProps = (state) => {  
  return {
      loginToken: state.loginToken,
      walletHandle: state.walletHandle,
      poolHandle: state.poolHandle,
      masterSecret: state.masterSecret,


  };
}

export default connect(mapStateToProps, {setLoginToken, setWalletHandle, setPoolHandle, setMasterSecret, setIsFirstLogin})(LoginUI);