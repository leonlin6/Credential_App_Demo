
import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Dimensions,TouchableOpacity} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';

const ScanScreen = (props) => {
  const SCREEN_HEIGHT = Dimensions.get("window").height;
  const SCREEN_WIDTH = Dimensions.get("window").width;

  const [QRCode, setQRCode] = useState('nothing QR now');

  const [isGetCredential, setIsGetCredential] = useState(true);


  const onSuccessLoad = (e) => {
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



    getCredentialInfo();


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
  }

  const getCredentialInfo = async () => {
    try{
      const authToken = await AsyncStorage.getItem('@userToken');


      const configurationObject = {
        method: 'get',
        baseURL:'http://192.168.0.101:5001',
        url: 'api/v1/qrcode/62bc34898f48d5f246cf5979',
        
        headers:{
          'authorization':`Bearer ${props.loginToken}`,
          'Content-Type':'application/json'
        }
      };
      const response = await axios(configurationObject);
      console.log(response.data);
    }catch(error){
      console.log('error', error);
    }

  };

  const onPressShowRoute = () => {
    console.log(props.route.params);
  }

  const onRead = (e) => {
    setQRCode(e.data);
    console.log('e= ', e);
  }

  const backButton = () => {

    getCredentialInfo();
    // navigation.goBack();
    // if(isGetCredential){
    //   props.navigation.navigate('Form');
    // }else{
    //   props.navigation.navigate({
    //     name:'SelectCredential',
    //     params:{
    //       from:'CertificateCredential'
    //     }
    //   });
    // }

    // props.navigation.navigate('Form');

    // props.navigation.reset({
    //     index: 0,
    //     routes: [
    //       { name: 'Home'}, 
    //       { name: 'Form'}
    //     ],
    //   });
  }

  const setToggle = () => {
    setIsGetCredential(!isGetCredential);
  }

  return (
    <View style={{flex:1}}>
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
      <TouchableOpacity  onPress={setToggle} style={{position:'absolute', top: 10, left: 90 ,borderRadius:100}}>
        <Ionicons 
          name = {isGetCredential === true ? 'toggle': 'toggle-outline'}
          
          size={50} 
          style={{color:'white'}}
        ></Ionicons>
      </TouchableOpacity>
    </View>

  );
}


const styles = StyleSheet.create({
  body:{
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

export default connect(mapStateToProps)(ScanScreen);
