
import React, {useState, useEffect} from 'react';
import { 
  View, 
  StyleSheet, 
  Dimensions,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';


const Scan = (props) => {
  let credentialInfo;
  let cred_offer_json;
  let cred_id;
  let cred_def_id;

  const SCREEN_HEIGHT = Dimensions.get("window").height;
  const SCREEN_WIDTH = Dimensions.get("window").width;

  const [QRCode, setQRCode] = useState('nothing QR now');
  const [isGetCredential, setIsGetCredential] = useState(true);
  const [isShowLoading, setIsShowLoading] = useState(false);
  const [isUserWriteExist, setIsUserWriteExist] = useState(true);

  
  const onSuccessLoad = async (e) => {
    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occured', err)
    // );
    // console.log('success');


    // navigation.reset({
    //   index: 0,
    //   routes: [
    //     { name: 'Home'}, 
    //     { name: 'Form'}
    //   ],
    // });


    // if(isGetCredential){
    //   navigation.navigate('Form');
    // }else{
    //   navigation.navigate({
    //     name:'SelectCredential',
    //     params:{
    //       from:'ScanPage'
    //     }
    //   });
    // }

    // console.log(e.data);

    // await getCredentialInfo();



  }

  const getCredentialInfo = async () => {
    try{
      setIsShowLoading(true);

      const configurationObject = {
        method: 'get',
        baseURL:'http://192.168.0.101:5001',
        url: 'api/v1/qrcode/62bc34898f48d5f246cf5979',
        headers:{
          'authorization':`Bearer ${props.loginToken}`,
          'Content-Type':'application/json'
        }
      };
       await axios(configurationObject)
       .then((response) => {
        credentialInfo = response.data;

        console.log('----credentialInfo---',credentialInfo);

        cred_offer_json = JSON.parse(credentialInfo.cred_offer);
        cred_id = credentialInfo.credential;
        cred_def_id = credentialInfo.credentialTemplate.credentialDefinition.cred_def_id;

        setIsShowLoading(true);
       })
    }catch(error){
      console.log('error', error);
    }
  };

  //????
  const onRead = (e) => {
    setQRCode(e.data);
    console.log('e= ', e);
  }

  const backButton = async () => {
    // props.navigation.goBack();

    await getCredentialInfo();

    // 若有要讓user自填的definition attribute才進form
    if(isUserWriteExist){
      props.navigation.navigate({
        name:'Form',
        params:{
          credentialInfo:credentialInfo,
          cred_offer_json:cred_offer_json,
          cred_id:cred_id,
          cred_def_id:cred_def_id,
        }
      });
    }else{
      props.navigation.navigate({
        name:'CredentialDetailCheck',
        params:{
          '電子信箱': mailValue,
          '電話號碼': phoneValue
        }
      });
    }

  }

  // use for test
  const setToggle = () => {
    setIsGetCredential(!isGetCredential);
  }

  return (
    <View style={{flex:1}}>
    {
      isShowLoading ? 
      (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>      
      )
      :
      (
        <View >
          <QRCodeScanner
            cameraStyle={{height:SCREEN_HEIGHT,width:SCREEN_WIDTH}}
            onRead={onSuccessLoad}
            flashMode={RNCamera.Constants.FlashMode.torch}
            showMarker={true}
            customMarker={
              <View style={{flex:1, justifyContent:'center', alignItems:'center', flexDirection:'row'}}>
                <MaterialCommunityIcons name='scan-helper' style={styles.aimIcon} size={(SCREEN_HEIGHT * 0.475) }></MaterialCommunityIcons>
              </View>
            }
          />
          <TouchableOpacity  onPress={backButton} style={{position:'absolute', top: 10, left: 10 ,borderRadius:100}}>
            <Ionicons 
              name = 'arrow-back-circle-sharp'
              size={50} 
              style={{color:'white'}}
            ></Ionicons>
          </TouchableOpacity>
          {/* <TouchableOpacity  onPress={setToggle} style={{position:'absolute', top: 10, left: 90 ,borderRadius:100}}>
            <Ionicons 
              name = {isGetCredential === true ? 'toggle': 'toggle-outline'}
              
              size={50} 
              style={{color:'white'}}
            ></Ionicons>
          </TouchableOpacity> */}
        </View>
      )
    }
    </View>
  );
}


const styles = StyleSheet.create({
  body:{
  },
  container:{
    flex:1,
    justifyContent:'center',
    flexDirection:'column',
    alignItems:'center'
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16,
    backgroundColor: 'yellow'
  },
  screenOpacity:{
    backgroundColor: 'green',
    opacity: 0.6,
    flex:1,
    position: 'absolute'
  },
  rectangleContainer:{
    flex:1,
    backgroundColor: 'red',
    flexDirection:'row',
  },
  aimIcon:{
    color:'white',
    justifyContent:'center',
    alignItems:'center',
    flex:1,
    fontWeight: '100'
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});

const mapStateToProps = (state) => {  
  return {
      loginToken: state.loginToken
  };
}

export default connect(mapStateToProps)(Scan);
