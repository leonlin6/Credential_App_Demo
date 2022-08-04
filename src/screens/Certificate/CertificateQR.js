import React, {useState, useEffect} from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity,
  Text,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import ServerStatusLoadingComponent from '../../components/common/ServerStatusLoadingComponent';

//redux
import {connect} from 'react-redux';

//api
import { ENDPOINT_BASE_URL } from '../../APIs/APIs';
import axios from 'axios';
import indy from 'indy-sdk-react-native';
// actions
import {setProofReq, setVerifyId} from '../../actions/index'

const CertificateQR = (props) => {
  let checkStatusIntervalID;
  let verifyResponse;
  const loadingStatusText = ['正在等待對方選擇憑證', '正在驗證憑證...'];
  const [showLoading, setShowLoading] = useState(false);
  const [qrValue, setQRValue] = useState({});
  const [credData, setCredData] = useState();

  //先setInterval做確認status，但會有非同步的問題，之後再看怎麼改
  useEffect(() => {
    checkStatusIntervalID = setInterval(getCurrentStatus, 5000);
    return() => {
      console.log('---checkStatusIntervalID---',checkStatusIntervalID);

      clearInterval(checkStatusIntervalID);
    }
  },[])


  const doVerifyProof = async (proofReq, proof, schemas, credDefs) => {
    console.log('====doVerifyProof====');
    verifyResponse = await indy.verifierVerifyProof(
      proofReq,
      proof,
      schemas,
      credDefs,
      {},
      {}
      
    );

    console.log('-----verifyResponse-----' , verifyResponse);
  }

  const doUploadProof = async () => {
    console.log('====doUploadProof====');

    const uploadProofConfig = {
      method: 'put',
      baseURL: ENDPOINT_BASE_URL,
      url: `api/v1/verify/${props.route.params.verifyId}/upload/valid`,
      headers:{
        'authorization':`Bearer ${props.loginToken}`,
        'Content-Type':'application/json'
      },
      data:{
        valid:verifyResponse
      }
    };

    const uploadProofResponse = await axios(uploadProofConfig);
    console.log('-----uploadProofResponse-----' , uploadProofResponse.data);
  }


  // call API to get current proccessing status
  // url param staus: 2 = (查驗者), 4 = (持證者)
  // response status: 
  // 0 = 初始化, 
  // 1 = 已取得 proof_req_json, 
  // 2 = 已上傳 proof_json, 
  // 3 = 已下載 proof_json, 
  // 4 = 已上傳驗證
  // 10 = 已完成
  const getCurrentStatus = async () => {
    console.log('--props.route.params.verifyId---', props.route.params.verifyId);
    try{
      const configurationObject = {
        method: 'get',
        baseURL: ENDPOINT_BASE_URL,
        url: `/api/v1/verify/${props.route.params.verifyId}/status?status=2`,
        headers:{
          'authorization':`Bearer ${props.loginToken}`,
          'Content-Type':'application/json'
        }
      };

      await axios(configurationObject)
      .then((response) => {
        console.log('====response=====', response.data);
          //持證者掃瞄完收到proof_req後，show Loading
          if(response.data.status === 1){
            console.log('====status1=====');
            setShowLoading(true);
            
            console.log('====before checkStatusIntervalID=====',checkStatusIntervalID);

            clearInterval(checkStatusIntervalID);
            checkStatusIntervalID = setInterval(getCurrentStatus, 5000);
            console.log('====after checkStatusIntervalID=====',checkStatusIntervalID);


          }else if(response.data.status === 3){
            //status:3 第一次response變3的時候，會下載proof相關資料，後續只回status
            console.log('====status3=====');
            console.log('proof', response.data);
            if(response.data.hasOwnProperty('proof_json')){
              const proofReqFromServer = JSON.parse(response.data.proof_req_json);
              const proofFromServer = JSON.parse(response.data.proof_json);
              const schemasFromServer = JSON.parse(response.data.schemas_json);
              const credDefsFromServer = JSON.parse(response.data.credential_defs_json);

              doVerifyProof(proofReqFromServer, proofFromServer, schemasFromServer, credDefsFromServer);
              doUploadProof();
            }else{
              clearInterval(checkStatusIntervalID);
              checkStatusIntervalID = setInterval(getCurrentStatus, 5000);
            }



          }else if(response.data.status === 10){
            //status:10 持證者下載完verify result，查驗完成
            console.log('====status10=====');

            clearInterval(checkStatusIntervalID);
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
                { name:'VerifyResult' }
              ]
            });
          }else{
            //status:2 不用做動作，持證者上傳proof後，server會自動把status改成3
            console.log('====else status====', response.data.status)
          }
      })

    }catch(error){
      console.log('error', error);
    }
  }



  const generateQRUrl =  () => {
    console.log('====props.route.params====', props.route.params);
    //use for test
    let url = `${ENDPOINT_BASE_URL}/api/v1/qrcode/${props.route.params.qrId}`;

    console.log('url', url);
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
        { name:'VerifyResult' }
      ]
    });

    // props.navigation.navigate({
    //   name:'Loading',
    //   params:{
    //     loadingStatusText : loadingStatusText,
    //     from:'QRCertificate',
    //     toPage:'VerifyResult'
    //   }
    // });
  }
  

const showPropsData = async () => {

  const configurationObject = {
    method: 'get',
    url: `http://192.168.50.169:5001/api/v1/qrcode/${props.route.params.qrId}`,
    headers:{
      'authorization':`Bearer ${props.loginToken}`,
      'Content-Type':'application/json'
    }
  };

  await axios(configurationObject)
  .then(async (response) => {
      console.log('---response.data---', response.data);
      let credentialInfo = response.data;

      // recording data to cred detail page

      props.setProofReq(JSON.parse(credentialInfo.verify.proof_req_json));
      props.setVerifyId(credentialInfo.verify._id);
      let creds = await indy.proverGetCredentials(props.walletHandle);
      console.log('---cred---',creds[0]);
      setCredData(creds[0]);
    })







  // console.log('---proofReq---', props.proofReq);
  // console.log('---proof---', props.proof);
  // console.log('---schemas---', props.schemas);
  // console.log('---defs---', props.defs);

  // let response = await indy.verifierVerifyProof(
  //   props.proofReq,
  //   props.proof,
  //   props.schemas,
  //   props.defs,
  //   {},
  //   {}
    
  // );

  // console.log('verifyProofResponse' , response);

  //async verifierVerifyProof(proofRequest, proof, schemas, credentialDefs, revRegDefs, revStates) {

}


  // render page
  return (
      <View style={{flex:1}}>
      {
        showLoading === true ? 
        (
          <ServerStatusLoadingComponent 
            onNavigate={onNavigate} 
            toPage='VerifyResult' 
            loadingStatusText={loadingStatusText} 
            nv={props.navigation}
            verifyId={props.route.params.verifyId}
            qrId={props.route.params.qrId}
            credData={credData}
          />
        )
        :
        (
          <View style={styles.container}>
            <View style={styles.QRArea}>
              <TouchableOpacity
                style={styles.contentBtn}
                onPress={showPropsData}
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
      walletHandle: state.walletHandle,

      proof: state.proof,
      proofReq: state.proofReq,

      schemas: state.schemas,
      defs: state.defs


  };
}

export default connect(mapStateToProps,{setProofReq, setVerifyId})(CertificateQR);