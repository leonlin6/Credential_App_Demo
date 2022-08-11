import React, {useEffect, useState, useRef} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity,
  ActivityIndicator, 
  Image
} from 'react-native';
import { Button } from '@rneui/base';
import { Colors } from '../../components/common/Colors';
import ServerStatusLoadingComponent from '../../components/common/ServerStatusLoadingComponent';
  
import { ListItem, Dialog,} from '@rneui/themed'
import AsyncStorage from '@react-native-async-storage/async-storage';
import indy from 'indy-sdk-react-native';
import axios from 'axios';

// redux
import {connect} from 'react-redux';
// actions
import {setProof, setSchemas, setCredDefs, setProofReq} from '../../actions/index'

//API
import { ENDPOINT_BASE_URL } from '../../APIs/APIs';

const SelectedCredDetail = (props) => {

  let proofResponse;
  let statusIntervalId = useRef(null);
  let verifyResponse;


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


  const [fromPage, setFromPage] = useState('VerifyCertificationScan');
  const [showInitLoading, setShowInitLoading] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    setFromPage(props.route.params.from);
    handleCredDataList(props.route.params.credData);

    setTimeout(() => {
      setShowInitLoading(false);
    }, 500);
  }, []);


  // 因closure的問題，先把clean up function每次rerender都做，才能讀到global varible：statusIntervalId，之後在看則麼解
  // 2022.08.03 可用 待優化
  useEffect(() => {
    return function cleanup() {
      console.log('---useEffect clear interval---',statusIntervalId.current);
      clearInterval(statusIntervalId.current)
    }

  },[]);

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
    console.log('---downloadResult response---',response.data);
  }

  //以持證者身份打getCurrentStatus
  const getCurrentStatusByProver = async () => {
    console.log('--getCurrentStatusByProver---');
    try{
      const configurationObject = {
        method: 'get',
        baseURL: ENDPOINT_BASE_URL,
        url: `/api/v1/verify/${props.verifyId}/status?status=4`,
        headers:{
          'authorization':`Bearer ${props.loginToken}`,
          'Content-Type':'application/json'
        }
      };

      
      await axios(configurationObject)
      .then((response) => {
        console.log('---getCurrentStatusByProver response.data---',response.data);
        console.log('----statusIntervalId---',statusIntervalId.current);

        if(response.data.status === 4){
          console.log('----statusIntervalId 4 ---',statusIntervalId.current);
          downloadResult();
          console.log('---response.data---',response.data);
        }else if(response.data.status === 10){
          console.log('----sttus 10---',response.data.status);
          props.navigation.reset({
            index:0,
            routes: [
              {
                name:'DrawerContainer',
                state:{
                  routes:[{ name: 'Wallet' } ]
                }
              }
            ]
          });
        }else{
          console.log('---other status----')
        }
      })

    }catch(error){
      console.log('error', error);
    }
  }


  const handleCredDataList = (data) => {
    const credData = Object.keys(data.attrs).map((keyName) => {
      return {
        key:keyName,
        value:data.attrs[keyName]
      }
    })
    setList(credData);
  }

  //處理cred資料對應要查驗的attr組成＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  const handleRequestedCredentials = (req) => {
    const requestAttrs = req.requested_attributes;
  
    console.log('---credData---',props.route.params.credData);
    console.log('---requestAttrs---',requestAttrs);

    //之後要再考慮self_attested_attributes和requested_predicates'
    //現在做法是把cred的referent直接回給indy讓他去找，不用一個一個組內容
    for(let requestAttr in requestAttrs){
      requested_creds.requested_attributes[requestAttr] = {
        cred_id: props.route.params.credData.referent, 
        revealed: true
      };
    }

    console.log('---requested_creds---',requested_creds);
  }


  const onVerify = () => {

    setModalVisible(!modalVisible);
  };


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
      let response = await indy.buildGetSchemaRequest('VsKV7grR1BUE29mG2Fm2kX', props.route.params.credData.schema_id);

      //submit req
      let schemaResponse = await indy.submitRequest(INITIAL_STATE.poolHandle, response);
      
      // parse schema req response
      parsedData = await indy.parseGetSchemaResponse(schemaResponse);

      // schema_id = parsedData[0];
      // schema_json = parsedData[1];
      console.log('parsedData', parsedData);
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

      console.log('----cred_def_id----', props.route.params.credData.cred_def_id);

      //get def req
      let response = await indy.buildGetCredDefRequest('VsKV7grR1BUE29mG2Fm2kX', props.route.params.credData.cred_def_id);
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
      console.log('====end get definition req=====');

      definitionsTemp[parsedData[0]] = parsedData[1];

      console.log('====end get schema =====');
      return definitionsTemp;

    } catch(error){
      console.log(error);
    }
  }



  // create proof step
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
    // console.log('===INITIAL_STATE.walletHandle===',INITIAL_STATE.walletHandle);
    // console.log('===proofReq===',INITIAL_STATE.proofReq);
    // console.log('===requested_creds===',requested_creds);
    // console.log('===INITIAL_STATE.masterSecretName===',INITIAL_STATE.masterSecretName);
    // console.log('===INITIAL_STATE.schemas===',INITIAL_STATE.schemas);
    // console.log('===INITIAL_STATE.credentialDefs===',INITIAL_STATE.credentialDefs);



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
      props.setProof(proofResponse);
      // props.setProofReq(proofReq);
      props.setSchemas(INITIAL_STATE.schemas);
      props.setCredDefs( INITIAL_STATE.credentialDefs);
      
      setShowLoading(true);
  }

  // 3. put proof to server
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

      await axios(configurationObject)
      .then((response)=>{
        if(response.data.success === true){
          //成功上傳proof後，開始第一次更新status
          statusIntervalId.current = setInterval(getCurrentStatusByProver,5000);
        }else{
          clearInterval(statusIntervalId.current);

          console.log('put proof response false', response.data);
        }
      })


    }catch(error){
      console.log('error', error);
    }
  }


  const handleProof = async () => {
    // setShowInitLoading(true);

    //sending proof to server
    await getProofReq();
    await handleRequestedCredentials(INITIAL_STATE.proofReq);
    await createProof();
    await putProof();

  }


  const onVerifiedHistory = () => {
    console.log('23243');
  }


  const onModalConfirm = () => {

    setModalVisible(!modalVisible);
    handleProof();

  };


  //Dialog control
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const modalClose = () => {
    setModalVisible(!modalVisible);
  };

  const VerifyModal = () => {
    return (
      <Dialog
        isVisible={modalVisible}
        onBackdropPress={toggleModal}
        overlayStyle={{
          height: 200,
          width: 300,
          justifyContent: 'space-around',
          paddingHorizontal: 20,
          paddingBottom: 0,
        }}>
        <View>
          <Dialog.Title title="請確認是否選擇此憑證做查驗？" />
        </View>
        <Dialog.Actions>
          <Button
            titleStyle={styles.modalBtnText}
            buttonStyle={styles.modalCancelBtn}
            title="取消"
            onPress={modalClose}
          />
          <Button
            titleStyle={styles.modalBtnText}
            buttonStyle={styles.modalYesBtn}
            title="確認"
            onPress={onModalConfirm}
          />
        </Dialog.Actions>
      </Dialog>
    );
  };

  const DetailList = () => {
    let i = 0;
    const detailList = list.map((item, index) => {
      return (
        <ListItem key={index} containerStyle={{ backgroundColor: '#F4F4F4' }}>
          <ListItem.Content>
            <View style={styles.subtitleView}>
              <Text style={styles.key}>{item.key}</Text>
              <Text style={styles.value}>{item.value}</Text>
            </View>
          </ListItem.Content>
        </ListItem>
      );
    });
    return detailList;
  };


  //render page
  return (
    <View style={{ flex: 1 }}>
      {
        showLoading === true ? (
          <ServerStatusLoadingComponent 
            loadingStatusText={['正在驗證憑證', '憑證驗證完成', '正在返回首頁'] }
            from='SelectCredential'
            toPage='Wallet'
            nv={props.navigation}
            verifyId={props.route.params.verifyId}
            />
        )
        :
        (
          showInitLoading === true ? (
            <View style={[styles.container, { justifyContent: 'center' }]}>
              <ActivityIndicator size="large" />
            </View>
          ) 
          : 
          (
            <View style={styles.container}>
              <View style={styles.imageArea}>
                <Image style={styles.image} resizeMode={'contain'} source={require('../../assets/images/logo.png')}></Image>
              </View>
              <View style={styles.detailArea}>
                <ScrollView persistentScrollbar={true}>
                  <DetailList></DetailList>
                </ScrollView>
              </View>
              <View style={styles.buttonArea}>
                {fromPage === 'CertificateCredential' ? 
                (
                  <View>
                    <TouchableOpacity onPress={onVerify} style={styles.btn}>
                      <Ionicons name="md-checkmark" size={60} color={Colors.successGreen}></Ionicons>
                      <Text>查驗此憑證</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={onTest} style={styles.btn}>
                      <Ionicons name="md-checkmark" size={60} color={Colors.successGreen}></Ionicons>
                      <Text>查驗此憑證</Text>
                    </TouchableOpacity> */}
                  </View>
                ) 
                : 
                (
                  <TouchableOpacity onPress={onVerifiedHistory} style={styles.btn}>
                    <Ionicons name="library" size={60} color="black"></Ionicons>
                    <Text>憑證被查驗</Text>
                    <Text>歷程紀錄</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )
        )
      }
      <VerifyModal></VerifyModal>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  imageArea: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    height: 150,
    width: 200,
    margin: 20,
    marginTop: 0,
    paddingTop: 20,
  },

  credentialName: {
    color: 'white',
  },
  detailArea: {
    flex: 4,
  },

  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
  ratingImage: {
    height: 19.21,
    width: 100,
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey',
  },
  key: {
    flex: 1,
    textAlign: 'left',
  },
  value: {
    flex: 1,
    textAlign: 'right',
  },
  buttonArea: {
    flex: 1,
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'gray',

    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  modalContainer: {},
  modalYesBtn: {
    backgroundColor: '#2196f3',
    color: 'white',
    borderRadius: 10,
    width: 150,
    height: 30,
    padding: 0,
  },
  modalCancelBtn: {
    backgroundColor: '#616161',
    color: 'white',
    borderRadius: 10,
    width: 75,
    height: 30,
    padding: 0,
    marginLeft: 30,
  },
  modalBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
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

export default connect(mapStateToProps, {setProof, setSchemas, setCredDefs, setProofReq})(SelectedCredDetail);
