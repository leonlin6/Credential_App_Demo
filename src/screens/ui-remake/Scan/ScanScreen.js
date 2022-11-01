
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
import { headline, content, themeColor} from '../../../styles/theme.style';

// Icon
import Alert from '../../../assets/icons/SVG/Alert.svg';


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
            name:'ApplyCredential',
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
    props.navigation.navigate('ApplyCredential');
    // props.navigation.goBack();
  }

    // only for test
  const onVerify = () => {
    props.navigation.navigate('VerifyRule');
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
                <View style={styles.titleArea}>
                  <Text style={[headline.Headline1, styles.titleText]}>SCAN</Text>
                </View>
                <View style={{
                  width:devicewidth,
                  height:300,
                  borderColor:"white",
                  flexDirection:'row'
                }}>
                  <View style={styles.sideBackgound}></View>
                  <View style={{flex:9}}></View>
                  <View style={styles.sideBackgound}/>

                  <View style={styles.topLeftEdge}></View>
                  <View style={styles.topRightEdge}></View>
                  <View style={styles.bottomLeftEdge}></View>
                  <View style={styles.bottomRightEdge}></View>
                </View>
                <View style={styles.backgroundImage}></View>
              </View>
            }
            markerStyle={{
              backgroundColor:'red'
            }}
          />
          <TouchableOpacity onPress={()=>{onClose()}}>
            <View style={styles.errorMessage}>
              <Alert></Alert>
              <Text style={[content.DefaultBold, {color:'#FFFFFF'}]}>Invalid. Please rescan</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{position:'absolute', top: 10, left: 10 ,borderRadius:100}} onPress={()=>{onClose()}}>
            <View style={styles.closeBtn}>
              <Ionicons name='close' size={20} color='#82ff96' />
              <Text style={[headline.Headline3, {color:'#82ff96'}]}>Apply Cred</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{position:'absolute', top: 70, left: 40 ,borderRadius:100}} onPress={()=>{onVerify()}}>
            <View style={styles.closeBtn}>
              <Ionicons name='close' size={20} color='#82ff96' />
              <Text style={[headline.Headline3, {color:'#82ff96'}]}>Verify Cred</Text>
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
  titleArea:{
    paddingTop:75,
    flex:1,
    backgroundColor:themeColor.DarkDarkOp8,
    alignItems:'center',

  },  
  titleText: {
    color: 'white'
  },
  sideBackgound:{
    flex:1,    
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:themeColor.DarkDarkOp8,
  },
  backgroundImage:{
    flex:2,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:themeColor.DarkDarkOp8,
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
    top: -3,
    left: 32,
    height: 75,
    width: 75,
    borderColor: 'rgb(124,255,255)',
    borderLeftWidth: 8,
    borderTopWidth: 8,
    borderRadius:6,
  },
  topRightEdge: {
    position: 'absolute',
    top: -3,
    right: 32,
    height: 75,
    width: 75,
    borderColor: 'rgb(124,255,255)',
    borderRightWidth: 8,
    borderTopWidth: 8,
    borderRadius:6,
  },
  bottomLeftEdge: {
    position: 'absolute',
    bottom: -2,
    left: 33,
    height: 75,
    width: 75,
    borderColor: 'rgb(124,255,255)',
    borderLeftWidth: 8,
    borderBottomWidth: 8,
    borderRadius:6,
  },
  bottomRightEdge: {
    position: 'absolute',
    bottom: -2,
    right: 33,
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
  errorMessage:{
    position:'absolute',
    top: SCREEN_HEIGHT - 200,
    left: 50,
    height:43,
    backgroundColor:themeColor.SemanticWarningRedOp4,
    width: 300,
    height:40,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    borderRadius: 8
  }
});

const mapStateToProps = (state) => {  
  return {
      loginToken: state.loginToken
  };
}

export default connect(mapStateToProps,{setProofReq, setVerifyId})(ScanScreen);
