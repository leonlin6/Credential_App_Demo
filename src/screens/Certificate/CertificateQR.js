import React, {useState, useEffect} from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity,
  Text,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import LoadingComponent from '../../components/common/LoadingComponent';

//redux
import {connect} from 'react-redux';

//api
import { ENDPOINT_BASE_URL } from '../../APIs/APIs';
import axios from 'axios';

import indy from 'indy-sdk-react-native';

const CertificateQR = (props) => {
  const loadingStatusText = ['正在等待對方選擇憑證', '正在驗證憑證...'];
  const [showLoading, setShowLoading] = useState(false);
  const [qrValue, setQRValue] = useState({});

  useEffect(() => {
    console.log('props.route.params',props.route.params);
    setQRValue(props.route.params);
  },[]);


  //先setInterval做確認status，但會有非同步的問題，之後再看怎麼改
  // useEffect(() => {
  //   const checkStatusID = setInterval(getServerStatus, 5000);

  //   return() => {
  //     clearInterval(checkStatusID);
  //   }
  // },[])

  // 2 = 上傳 proof_json(查驗者), 4 = 上傳驗證,
  const getServerStatus = async () => {
    const configurationObject = {
      method: 'get',
      baseURL: ENDPOINT_BASE_URL,
      url: 'api/v1/qrcode/62bc34898f48d5f246cf5979',
      headers:{
        'authorization':`Bearer ${props.loginToken}`,
        'Content-Type':'application/json'
      }
    };

    const response = await axios(configurationObject);
  }

  const getCurrentRule = async () => {
    const configurationObject = {
      method: 'get',
      baseURL: ENDPOINT_BASE_URL,
      url: 'api/v1/qrcode/62bc34898f48d5f246cf5979',
      headers:{
        'authorization':`Bearer ${props.loginToken}`,
        'Content-Type':'application/json'
      }
    };

    const response = await axios(configurationObject);
  }

  const getRuleInfo = async () => {

  }

  const generateQRUrl = () => {
    console.log('prams', props.route.params);
    // let qrId = props.route.params._id;

    //use for test
    // template jos qr codeID
    // let qrId = '62e0acae0ffbd158587d8528';
    // template leon qr codeID
    let qrId = '62e0f55abe344aecb7623214';

    
    let url = `${ENDPOINT_BASE_URL}/api/v1/qrcode/${qrId}`;
    
    return url;
  }

  const onNavigate = () => {
    props.navigation.reset({
      index:1,
      routes: [
        {
          name:'DrawerContainer',
          state:{
            routes:[
              { name:'Certificate' }
            ]
          }
        },
        { name:'Success' }
      ]
    });

    // props.navigation.navigate({
    //   name:'Loading',
    //   params:{
    //     loadingStatusText : loadingStatusText,
    //     from:'QRCertificate',
    //     toPage:'Success'
    //   }
    // });
  }
  

const showPropsData = async () => {
  
  console.log('---proofReq---', props.proofReq);
  console.log('---proof---', props.proof);
  console.log('---schemas---', props.schemas);
  console.log('---defs---', props.defs);

  let response = await indy.verifierVerifyProof(
    props.proofReq,
    props.proof,
    props.schemas,
    props.defs,
    {},
    {}
    
  );

  console.log('verifyProofResponse' , response);

  //async verifierVerifyProof(proofRequest, proof, schemas, credentialDefs, revRegDefs, revStates) {

}


  // render page
  return (
      <View style={{flex:1}}>
      {
        showLoading === true ? 
        (
          <LoadingComponent 
            onNavigate={onNavigate} 
            toPage='Success' 
            loadingStatusText={loadingStatusText} 
            nv={props.navigation}/>
        )
        :
        (
          <View style={styles.container}>
            <View style={styles.QRArea}>
              <TouchableOpacity
                style={styles.contentBtn}
                // onPress={()=>{setShowLoading(true)}}
                onPress={()=>{showPropsData()}}
                >
                <QRCode 
                  value={generateQRUrl()}
                  size={200}></QRCode>
              </TouchableOpacity>
            </View>
            <View style={styles.footer}>
              <Text style={styles.info}>掃描此QR Code以查驗執照</Text>
              <Text style={styles.expiredDate}>有效期限：2022/07/08</Text>
            </View>
          </View>
        )
      }
      </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20,

  },
  QRArea:{
      flex:2,
      justifyContent:'space-evenly',
      alignItems:'center',
  },
  info:{
    textAlign:'center',
    marginBottom:5,
    fontSize:20

  },
  expiredDate:{
    textAlign:'center',
    marginBottom:20,
    color:'#2196f3',
    fontSize:20
  },
  footer:{
      flex:1,
      alignItems:'center',
      padding:20

  },
  logo:{
    height:325,
    width:300
  },

});

const mapStateToProps = (state) => {  
  return {
      loginToken: state.loginToken,
      proof: state.proof,
      proofReq: state.proofReq,

      schemas: state.schemas,
      defs: state.defs


  };
}

export default connect(mapStateToProps)(CertificateQR);