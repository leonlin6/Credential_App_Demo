
import React, {useState, useEffect, useLocation} from 'react';
import { 
  View, 
  StyleSheet, 
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  ImageBackground
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { headline, content} from '../../../styles/theme.style';

// redux
import {connect} from 'react-redux';
// actions
import {setProofReq, setVerifyId} from '../../../actions/index'

//API
import { ENDPOINT_BASE_URL } from '../../../APIs/APIs';
import axios from 'axios';

// window dimension
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const QR_SCAN_SQUARE_SIZE = 300;

const ScanScreen = (props) => {
  let credentialInfo;
  let cred_offer_json;
  let cred_id;
  let cred_def_id;

  let verifyId;
  let verifyTemplate;


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
      // setIsShowLoading(true);
      console.log('qrurl', url);

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

        // type 1:領證 11:查驗
        if(credentialInfo.type === 1){
        console.log('----credentialInfo---');

          cred_offer_json = JSON.parse(credentialInfo.cred_offer);
          cred_id = credentialInfo.credential;
          cred_def_id = credentialInfo.credentialTemplate.credentialDefinition.cred_def_id;
        console.log('----cred_offer_json---',cred_offer_json);
        console.log('----cred_id---',cred_id);
        console.log('----cred_def_id---',cred_def_id);
          
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
        // setIsShowLoading(true);
       })
    }catch(error){
      console.log('error', error);
    }
  };


  const backButton = async () => {
    props.navigation.goBack();


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

  const onClose = () => {
    props.navigation.goBack();
  }
  let devicewidth=Dimensions.get("window").width
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
            showMarker={true}
            customMarker={
              <View style={{flex:1}}>
                  <ImageBackground source={require('../../../assets/background/BG1.png')} resizeMode="cover" style={styles.backgroundImage}>
                    <Text style={[headline.Headline1, styles.titleText]}>SCAN</Text>
                  </ImageBackground>
                  <View style={{
                    width:devicewidth,
                    height:devicewidth,
                    borderColor:"white",
                    flexDirection:'row'
                  }}>
                  <View style={{flex:1, flexDirection:'row'}}>
                    <ImageBackground source={require('../../../assets/background/BG1.png')} resizeMode="cover" style={{flex:1, flexDirection:'column'}}></ImageBackground>
                  </View>
                  <View style={{flex:9}}></View>
                  <ImageBackground source={require('../../../assets/background/BG1.png')} resizeMode="cover" style={styles.backgroundImage}/>

                    <View style={styles.topLeftEdge}></View>
                    <View style={styles.topRightEdge}></View>
                    <View style={styles.bottomLeftEdge}></View>
                    <View style={styles.bottomRightEdge}></View>
                  </View>
                  <ImageBackground source={require('../../../assets/background/BG1.png')} resizeMode="cover" style={styles.backgroundImage}>
                  </ImageBackground>
              </View>
            }
            markerStyle={{
              backgroundColor:'red'
            }}
          />
          <TouchableOpacity style={{position:'absolute', top: 10, left: 10 ,borderRadius:100}} onPress={()=>{onClose()}}>
            <View style={styles.closeBtn}>
              <Ionicons name='close' size={20} color='#82ff96' />
              <Text style={[headline.Headline3, {color:'#82ff96'}]}>Close</Text>
            </View>
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

  },
  backgroundImage:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  titleText: {
    color: 'white'
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


  topLeftEdge: {
    position: 'absolute',
    top: 0,
    left: 35,
    height: 75,
    width: 75,
    borderColor: 'rgb(124,255,255)',
    borderLeftWidth: 8,
    borderTopWidth: 8,
    borderRadius:6,
  },
  topRightEdge: {
    position: 'absolute',
    top: 0,
    right: 35,
    height: 75,
    width: 75,
    borderColor: 'rgb(124,255,255)',
    borderRightWidth: 8,
    borderTopWidth: 8,
    borderRadius:6,
  },
  bottomLeftEdge: {
    position: 'absolute',
    bottom: 0,
    left: 35,
    height: 75,
    width: 75,
    borderColor: 'rgb(124,255,255)',
    borderLeftWidth: 8,
    borderBottomWidth: 8,
    borderRadius:6,
  },
  bottomRightEdge: {
    position: 'absolute',
    bottom: 0,
    right: 35,
    height: 75,
    width: 75,
    borderColor: 'rgb(124,255,255)',
    borderRightWidth: 8,
    borderBottomWidth: 8,
    borderRadius:6,
  },
  closeBtn:{
    position:'absolute',
    top: SCREEN_HEIGHT - 130,
    left: 135,
    width:104,
    height:43,
    backgroundColor:'rgba(79,85,101,0.5)',
    borderRadius:8,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row'
  },
});

const mapStateToProps = (state) => {  
  return {
      loginToken: state.loginToken
  };
}

export default connect(mapStateToProps,{setProofReq, setVerifyId})(ScanScreen);
