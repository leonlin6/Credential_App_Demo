import React, {useEffect, useState, useReducer} from 'react';
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
  
import { ListItem, Dialog,} from '@rneui/themed'
import AsyncStorage from '@react-native-async-storage/async-storage';
import indy from 'indy-sdk-react-native';
import axios from 'axios';

// redux
import {connect} from 'react-redux';


const VerifySelectCredDetail = (props) => {

  console.log('----props.credData', props.route.params.credData);
  let proofResponse;
  let INITIAL_STATE = {
    walletHandle: props.walletHandle, 
    poolHandle: props.poolHandle,
    proofReq:null,
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

  // use for test
  const proofReq = {
    'nonce': '1432422343242122312411212',
    'name': 'Job-Application',
    'version': '0.1',
    'requested_attributes': {
        'attr1_referent': {
            'name': 'name'
        },
        'attr2_referent': {
            'name': 'last_name'
        },
        'attr3_referent': {
            'name': 'title',
        },
        'attr4_referent': {
            'name': 'status',
        },
        'attr5_referent': {
            'name': 'ssn',
        },
        'attr6_referent': {
            'name': 'phone_number'
        }
    },
    'requested_predicates': {

    }
  }


  const [fromPage, setFromPage] = useState('VerifyCertificationScan');
  const [showLoading, setShowLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [list, setList] = useState();

  useEffect(() => {
    setFromPage(props.route.params.from);
    handleCredDataList(props.route.params.credData);

    setTimeout(() => {
      setShowLoading(false);
    }, 500);
  }, []);


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
    const credAttrs = props.route.params.credData.attrs;
    const requestAttrs = req.requested_attributes;
    let hashTemp= {};

    
    for(let requestAttr in requestAttrs){
      hashTemp[requestAttrs[requestAttr].name] = requestAttr;
    }

    // Hash, assign credAttr's value to self_attested_attributes
    // Example {"attr1_referent": "Leon"}
    for(let credAttr in credAttrs){
      requested_creds.self_attested_attributes[hashTemp[credAttr]] = credAttrs[credAttr];
    }
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
    //wh, JSON.stringify(proofRequest)
    const reqResponse = await indy.proverGetCredentialsForProofReq(INITIAL_STATE.walletHandle,  proofReq);
  }

  // 2. create proof
  const createProof = async () => {

    INITIAL_STATE.masterSecretName = await getMasterSecretID();
    INITIAL_STATE.schemas = await getSchema();
    INITIAL_STATE.credentialDefs = await getDefinition();

    // for test only : check data
    // console.log('===INITIAL_STATE.walletHandle===',INITIAL_STATE.walletHandle);
    // console.log('===proofReq===',proofReq);
    // console.log('===requested_creds===',requested_creds);
    // console.log('===INITIAL_STATE.masterSecretName===',INITIAL_STATE.masterSecretName);
    // console.log('===INITIAL_STATE.schemas===',INITIAL_STATE.schemas);
    // console.log('===INITIAL_STATE.credentialDefs===',INITIAL_STATE.credentialDefs);



    //(wh, JSON.stringify(proofReq), JSON.stringify(requestedCredentials), masterSecretName, JSON.stringify(schemas), JSON.stringify(credentialDefs), JSON.stringify(revStates)
    proofResponse = await indy.proverCreateProof(
      INITIAL_STATE.walletHandle, 
      proofReq, 
      requested_creds, 
      INITIAL_STATE.masterSecretName, 
      INITIAL_STATE.schemas, 
      INITIAL_STATE.credentialDefs, 
      INITIAL_STATE.revStates = {}
      ) 


      props.navigation.navigate({
        name: 'Loading',
        params: {
          loadingStatusText: ['正在驗證憑證', '憑證驗證完成', '正在返回首頁'],
          from: 'SelectCredential',
          toPage: 'Wallet',
          isUpdateStatusFromAPI:true
        },
      });
  }

  // 3. post proof to server
  // 尚需調整API config內容  2022.07.15
  const postProof = async () => {
    try{
      const configurationObject = {
        method: 'put',
        baseURL:'http://192.168.0.101:5001',
        url: `api/v1/credential/${INITIAL_STATE.cred_id}/download`,
        headers:{
          'authorization':`Bearer ${props.loginToken}`,
          'Content-Type':'application/json'
        },
        data: proofResponse
      };

      await axios(configurationObject)
      .then((response) => {
        console.log('finish update proof', response.data.cred_json);
        props.navigation.navigate({
          name: 'Loading',
          params: {
            loadingStatusText: ['正在驗證憑證', '憑證驗證完成', '正在返回首頁'],
            from: 'SelectCredential',
            toPage: 'Wallet',
            isUpdateStatusFromAPI:true
          },
        });
      })

    }catch(error){
      console.log('error', error);
    }
  }


  const handleProof = async () => {
    setShowLoading(true);

    //sending proof to server
    await getProofReq();
    await handleRequestedCredentials(proofReq);
    await createProof();
    // await postProof();
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
      {showLoading === true ? 
      (
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
              <TouchableOpacity onPress={onVerify} style={styles.btn}>
                <Ionicons name="md-checkmark" size={60} color={Colors.successGreen}></Ionicons>
                <Text>查驗此憑證</Text>
              </TouchableOpacity>
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
      )}
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

  };
}

export default connect(mapStateToProps)(VerifySelectCredDetail);
