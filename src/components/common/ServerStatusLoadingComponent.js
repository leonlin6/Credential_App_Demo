import React, {useEffect, useState, useRef, useReducer} from 'react';
import { 
  ActivityIndicator, 
  StyleSheet, 
  Text, 
  View, 
  Animated,
  Button
} from "react-native";
import { Colors } from './Colors';
import { ENDPOINT_BASE_URL } from '../../APIs/APIs';
import { CommonActions } from '@react-navigation/native';
import axios from 'axios';
// redux
import {connect} from 'react-redux';

// actions
import {setProofReq, setVerifyId} from '../../actions/index'

import indy from 'indy-sdk-react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return state + 1 ;
    case "decrement":
      return state - 1 ;
    case "reset":
      return state= 0;
    default:
      return state;
  }
}

const ServerStatusLoadingComponent = (props) => {
  const fadeAnim1 = useRef(new Animated.Value(1)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;
  const fadeAnim3 = useRef(new Animated.Value(0)).current;
  const array = [fadeAnim1, fadeAnim2 , fadeAnim3];
  const [loadingStatusText, setLoadingStatusText] = useState([]);
  const [loadingStatus, dispatch] = useReducer(reducer, 0);
  
  let timeoutLoadingStatusID = null;


  // for test---------------------------------------
  let proofResponse;
  let INITIAL_STATE = {
    walletHandle: props.walletHandle, 
    poolHandle: props.poolHandle,
    proofReq:props.proofReq,
    requestedCredentials:null,
    masterSecretName:null,
    schemas:null,
    credentialDefs:null,
    revStates:null
  }
  
  let requested_creds = {
    'self_attested_attributes': {

    },
    'requested_attributes': {

    },
    'requested_predicates': {

    }
  }


  const getMasterSecretID = async () => {
    try{
      const masterSecretID = await AsyncStorage.getItem('@MasterSecretID');
      return masterSecretID;
    } catch(error){
      console.log(error);
    }
  }

  const getSchema = async () => {
    try{
      console.log('====start get schema =====');
      let parsedData;
      let schemasTemp={};

      //get schema req
      // (submitterDid, id)
      let response = await indy.buildGetSchemaRequest('VsKV7grR1BUE29mG2Fm2kX', props.credData.schema_id);

      //submit req
      let schemaResponse = await indy.submitRequest(INITIAL_STATE.poolHandle, response);
      
      // parse schema req response
      parsedData = await indy.parseGetSchemaResponse(schemaResponse);

      // schema_id = parsedData[0];
      // schema_json = parsedData[1];
      console.log('----parsedData---', parsedData);
      schemasTemp[parsedData[0]] = parsedData[1];
      console.log('====end get schema =====');

      return schemasTemp;

    } catch(error){
      console.log(error);
    }
  }

  const getDefinition = async () => {
    try{
      console.log('====start get definition req=====');
      let parsedData;
      let definitionsTemp={};

      console.log('----cred_def_id----', props.credData.cred_def_id);

      //get def req
      let response = await indy.buildGetCredDefRequest('VsKV7grR1BUE29mG2Fm2kX', props.credData.cred_def_id);
      console.log('----def req work----', response);

      //submit req
      let definitionResponse = await indy.submitRequest(INITIAL_STATE.poolHandle, response);
      console.log('----def req submit work----', definitionResponse);
      
      // parse def req response
      parsedData = await indy.parseGetCredDefResponse(definitionResponse);
      console.log('----def parse work----', parsedData);

      // cred_def_id = parsedData[0];
      // cred_def_json = parsedData[1];
      console.log('parsedData', parsedData);


      definitionsTemp[parsedData[0]] = parsedData[1];

      console.log('====end get definition req=====');
      return definitionsTemp;

    } catch(error){
      console.log(error);
    }
  }

    //處理cred資料對應要查驗的attr組成＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
    const handleRequestedCredentials = (req) => {
      const requestAttrs = req.requested_attributes;
  
      console.log('---credData---',props.credData);
      console.log('---requestAttrs---',requestAttrs);


      // Hash, assign credAttr's value to requested_attribute_referent_1
      // 'attr1_referent': {'cred_id': cred_for_attr1['referent'], 'revealed': True},
      // "requested_attribute_referent_1": {"cred_id": string, "timestamp": Optional<number>, revealed: <bool> }},
      for(let requestAttr in requestAttrs){
        requested_creds.requested_attributes[requestAttr] = {
          cred_id: props.credData.referent, 
          revealed: true
        };
      }

      console.log('---requested_creds---',requested_creds);
    }
  // for test---------------------------------------





  // useEffect(() => {
  //   if(loadingStatus <= loadingStatusText.length - 1){
  //     timeoutLoadingStatus();
  //   }
  // });

  useEffect(() => {
    setLoadingStatusText(props.loadingStatusText);
  },[])  
  
  // Animated
  const fadeIn = (fadeAnim) => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  };

  const fadeOut = (fadeAnim) => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start();
  };

  // page change
  // params (onNavigate, toPage, loadingStatusText, nv)
  const leavePage = () => {
    let toPage = props.toPage;

    if(toPage === 'VerifyCredential'){
      navigateToVerifyResult();
    } else if(toPage === 'CredentialList'){
      navigateToCredentialList();
    }else if(toPage === 'CredentialDetail'){
      navigateToCredentailDetail();
    }else if(toPage === 'VerifyResult'){
      navigateToVerifyResult();
    }else{
      navigateToCredentialList();
    }
  }

  const navigateToVerifyResult = () => {
    clearTimeout(timeoutLoadingStatusID);
    props.nv.reset({
      index:1,
      routes: [
        {
          name:'DrawerContainer',
          state:{
            routes:[
              { name: 'Certificate' }
            ]
          }
        },
        { name:'VerifyResult' }
      ]
    });
  }

  const navigateToCredentailDetail = (data) => {
    console.log('props', props);
    clearTimeout(timeoutLoadingStatusID);
    props.nv.reset({
      index:1,
      routes: [
        {name:'DrawerContainer'},
        {
          name: "CredentialDetail",
          params:{
            from:'GetCredential',
            mergedDetailData: props.mergedDetailData
          }
        }
      ]
    });
  }

  const navigateToCredentialList = (data) => {
    clearTimeout(timeoutLoadingStatusID);
    props.nv.reset({
      index:1,
      routes: [
        {
          name:'TabContainer',
          state:{
            routes:[
              {  name: 'CredentialList' }
            ]
          }
        },
      ]
    });
  }

  const timeoutLoadingStatus = () => {
    timeoutLoadingStatusID = setTimeout(() => {
      dispatch({ type: "increment" });
      // fadeout現在這個
      fadeOut(array[loadingStatus]);

      // fadein 下一個
      if(loadingStatus < 2)
        fadeIn(array[loadingStatus+1]);

      //leave page
      // if(loadingStatus === loadingStatusText.length - 1){
      //   leavePage();
      // }

    }, 3000);
  }


  // for test---------------------------------------------

  // 1. get proof req
  const getProofReq = async () => {
    console.log('====getProofReq===');
    console.log('---INITIAL_STATE.proofReq---',    INITIAL_STATE.proofReq);
    console.log('---INITIAL_STATE.walletHandle---',    INITIAL_STATE.walletHandle);

    
    //wh, JSON.stringify(proofRequest)

    const reqResponse = await indy.proverGetCredentialsForProofReq(INITIAL_STATE.walletHandle,  INITIAL_STATE.proofReq);
    
    
    // const reqResponse = await indy.proverGetCredentialsForProofReq(INITIAL_STATE.walletHandle,  testProofReq);
    console.log('reqResponse',reqResponse);
    
  }

  // 2. create proof
  const createProof = async () => {
    console.log('====createProofReq===');

    INITIAL_STATE.masterSecretName = await getMasterSecretID();
    INITIAL_STATE.schemas = await getSchema();
    INITIAL_STATE.credentialDefs = await getDefinition();

    // for test only : check data
    console.log('===INITIAL_STATE.walletHandle===',INITIAL_STATE.walletHandle);
    console.log('===proofReq===',INITIAL_STATE.proofReq);
    console.log('===requested_creds===',requested_creds);
    console.log('===INITIAL_STATE.masterSecretName===',INITIAL_STATE.masterSecretName);
    console.log('===INITIAL_STATE.schemas===',INITIAL_STATE.schemas);
    console.log('===INITIAL_STATE.credentialDefs===',INITIAL_STATE.credentialDefs);


    console.log('===start create proof===',proofResponse);
    //(wh, JSON.stringify(proofReq), JSON.stringify(requestedCredentials), masterSecretName, JSON.stringify(schemas), JSON.stringify(credentialDefs), JSON.stringify(revStates)
    proofResponse = await indy.proverCreateProof(
      INITIAL_STATE.walletHandle, 
      INITIAL_STATE.proofReq, 
      requested_creds, 
      INITIAL_STATE.masterSecretName, 
      INITIAL_STATE.schemas, 
      INITIAL_STATE.credentialDefs, 
      INITIAL_STATE.revStates = {}
      ) 

      console.log('===proofResponse===',proofResponse);


      // use for test: use for send proof to server
      // props.setProof(proofResponse);
      // props.setProofReq(proofReq);
      // props.setSchemas(INITIAL_STATE.schemas);
      // props.setCredDefs( INITIAL_STATE.credentialDefs);
      
  }

  // 3. put proof to server
  // 尚需調整API config內容  2022.07.15
  const putProof = async () => {

    console.log("proof_json", proofResponse);
    console.log("schemas_json", INITIAL_STATE);
    console.log("credential_defs_json", INITIAL_STATE.credentialDefs);
    console.log("verifyId", props.verifyId);
    
   
    try{
      const configurationObject = {
        method: 'put',
        baseURL:ENDPOINT_BASE_URL,
        url: `/api/v1/verify/${props.verifyId}/upload/proof`,
        headers:{
          'authorization':`Bearer ${props.loginToken}`,
          'Content-Type':'application/json'
        },
        data: {
          "proof_json": JSON.stringify(proofResponse),
          "schemas_json": JSON.stringify(INITIAL_STATE.schemas),
          "credential_defs_json": JSON.stringify(INITIAL_STATE.credentialDefs),
          "rev_reg_defs_json": "{}",
          "rev_regs_json": "{}"
        }
        
      };

      const response = await axios(configurationObject);
      console.log('put proof response', response.data);
      // .then((response) => {
      //   props.navigation.navigate({
      //     name: 'Loading',
      //     params: {
      //       loadingStatusText: ['正在驗證憑證', '憑證驗證完成', '正在返回首頁'],
      //       from: 'SelectCredential',
      //       toPage: 'Wallet',
      //       isUpdateStatusFromAPI:true
      //     },
      //   });
      // })

    }catch(error){
      console.log('error', error);
    }
  }


  const uploadProof = async () => {
    await getProofReq();
    await handleRequestedCredentials(INITIAL_STATE.proofReq);
    await createProof();
    await putProof();
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
  const downloadResult = async () => {
    const configurationObject = {
      method: 'get',
      baseURL: ENDPOINT_BASE_URL,
      url: `/api/v1/verify/${props.verifyId}/status?status=4`,
      headers:{
        'authorization':`Bearer ${props.loginToken}`,
        'Content-Type':'application/json'
      }
    };

    const response = await axios(configurationObject);
    console.log('---download response---',response.data);

  }
  // for test---------------------------------------------


  const animatedText = loadingStatusText.map((item, index) => {
    return(
      <Animated.View key={item} style={[styles.textArea, {opacity:array[index]}]}>
        <Text style={styles.text}>{item}</Text>
      </Animated.View>
    )
  });
  
  return(
    <View style={styles.container}>
      <View>
        <ActivityIndicator size="large" />
      </View>
      <Text style={styles.text}>憑證驗證中</Text>


{/* 
      <Button title='uploadProof' onPress={uploadProof}>
      </Button>

      <Button title='downloadResult' onPress={downloadResult}>
      </Button> */}

    </View>
  );
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20,
    justifyContent: "center",

  },
  text:{
    color:Colors.loadingTextLightBlue,
    textAlign:'center',
    fontSize:20
  },
  textArea: {
    position: 'absolute', top: 100, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'
  }

});

const mapStateToProps = (state) => {  
  return {
    loginToken: state.loginToken,
    walletHandle: state.walletHandle,
    poolHandle: state.poolHandle,
    proofReq: state.proofReq,
    verifyId: state.verifyId
  };
}

export default connect(mapStateToProps)(ServerStatusLoadingComponent);
