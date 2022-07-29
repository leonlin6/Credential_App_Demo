
import React, {useState, useEffect, useLocation} from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';

// redux
import {connect} from 'react-redux';
// actions
import {setProofReq, setVerifyId} from '../../actions/index'

//API
import { ENDPOINT_BASE_URL } from '../../APIs/APIs';
import axios from 'axios';


const Scan = (props) => {
  let credentialInfo;
  let cred_offer_json;
  let cred_id;
  let cred_def_id;

  let verifyId;
  let verifyTemplate;

  const SCREEN_HEIGHT = Dimensions.get("window").height;
  const SCREEN_WIDTH = Dimensions.get("window").width;

  const [QRCode, setQRCode] = useState('nothing QR now');
  const [isGetCredential, setIsGetCredential] = useState(true);
  const [isShowLoading, setIsShowLoading] = useState(false);
  const [isUserWriteExist, setIsUserWriteExist] = useState(true);

  useEffect(()=>{
    setIsShowLoading(false);
  },[])
  
  const onSuccessLoad = async (e) => {
    console.log('---e---',e);
    await getCredentialInfo(e.data);

    // use for test
    if(isGetCredential){
      // props.navigation.navigate({
      //   name:'Form',
      //   params:{
      //     from:'GetCredential',
      //     credentialInfo:credentialInfo,
      //     cred_offer_json:cred_offer_json,
      //     cred_id:cred_id,
      //     cred_def_id:cred_def_id,
      //   }
      // });
    }else{
      // props.navigation.navigate({
      //   name:'SelectCredential',
      //   params:{
      //     from:'CertificateCredential'
      //   }
      // });
    }
  }

  const getCredentialInfo = async (url) => {
    try{
      setIsShowLoading(true);
      console.log('qrurl', url);


      // const configurationObject = {
      //   method: 'get',
      //   url: url,
      //   headers:{
      //     'authorization':`Bearer ${props.loginToken}`,
      //     'Content-Type':'application/json'
      //   }
      // };

      //use for test
      const configurationObject = {
        method: 'get',
        url: url,
        headers:{
          'authorization':`Bearer ${props.loginToken}`,
          'Content-Type':'application/json'
        }
      };


      await axios(configurationObject)
      .then((response) => {
        credentialInfo = response.data;

        console.log('----credentialInfo---',credentialInfo);

        if(credentialInfo.type === 1){
          cred_offer_json = JSON.parse(credentialInfo.cred_offer);
          cred_id = credentialInfo.credential;
          cred_def_id = credentialInfo.credentialTemplate.credentialDefinition.cred_def_id;
          
          props.navigation.navigate({
            name:'Form',
            params:{
              from:'GetCredential',
              credentialInfo:credentialInfo,
              cred_offer_json:cred_offer_json,
              cred_id:cred_id,
              cred_def_id:cred_def_id,
            }
          });
        }else if(credentialInfo.type === 11){
          // recording data to cred detail page
          props.setProofReq(JSON.parse(credentialInfo.verify.proof_req_json));
          props.setVerifyId(credentialInfo.verify._id);


          props.navigation.navigate({
            name:'SelectCredential',
            params:{
              from:'CertificateCredential',
              verifyTemplate : credentialInfo.verify.verifyTemplate,
            }
          });
        }
        setIsShowLoading(true);
       })
    }catch(error){
      console.log('error', error);
    }
  };


  const backButton = async () => {
    // props.navigation.goBack();


    // // 若有要讓user自填的definition attribute才進form
    // if(isUserWriteExist){
    //   props.navigation.navigate({
    //     name:'Form',
    //     params:{
    //       credentialInfo:credentialInfo,
    //       cred_offer_json:cred_offer_json,
    //       cred_id:cred_id,
    //       cred_def_id:cred_def_id,
    //     }
    //   });
    // }else{
    //   props.navigation.navigate({
    //     name:'GetCredentialCheck',
    //     params:{
    //       '電子信箱': mailValue,
    //       '電話號碼': phoneValue
    //     }
    //   });
    // }


    // use for test
    // if(isGetCredential){
    //   await getCredentialInfo();
    //   props.navigation.navigate({
    //     name:'Form',
    //     params:{
    //       from:'GetCredential',
    //       credentialInfo:credentialInfo,
    //       cred_offer_json:cred_offer_json,
    //       cred_id:cred_id,
    //       cred_def_id:cred_def_id,
    //     }
    //   });
    // }else{
    //   props.navigation.navigate({
    //     name:'SelectCredential',
    //     params:{
    //       from:'CertificateCredential',
    //       verify_id: verify_id
    //     }
    //   });
    // }
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
          <TouchableOpacity onPress={backButton} style={{position:'absolute', top: 10, left: 10 ,borderRadius:100}}>
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

export default connect(mapStateToProps,{setProofReq, setVerifyId})(Scan);
