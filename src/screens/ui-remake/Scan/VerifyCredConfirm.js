import React, {useEffect, useState, useRef} from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity,
  ActivityIndicator, 
  Image
} from 'react-native';
import CredListComponent from '../../../components/common/CredListComponent';
import ServerStatusLoadingComponent from '../../../components/common/ServerStatusLoadingComponent';

import { headline, content, themeColor } from '../../../styles/theme.style';

import LinearGradient from 'react-native-linear-gradient';
import { Button } from '@rneui/base';

import { ListItem, Dialog,} from '@rneui/themed'
import AsyncStorage from '@react-native-async-storage/async-storage';
import indy from 'indy-sdk-react-native';
import axios from 'axios';
// redux
import {connect} from 'react-redux';
// actions
import {setProof, setSchemas, setCredDefs, setProofReq} from '../../../actions/index'

//API
import { ENDPOINT_BASE_URL } from '../../../APIs/APIs';

const VerifyCredConfirm = (props) => {
  const [title, setTitle] = useState('');
  const [timeStamp, setTimeStamp] = useState('');

  const [cardData, setCardData] = useState([{
    "attrs": {
      "Age": "12", 
      "Name": "Leon", 
      "Sex": "Male", 
      "TimeStamp": "202211091021", 
      "Title": "TimeStampTest"
    }, 
    "cred_def_id": "E4BDfu4km5x7ni8P8gzbn2:3:CL:187:leontest1109-2", 
    "cred_rev_id": null, 
    "referent": "636b0e80b466ea8c3ccb4bf4", 
    "rev_reg_id": null, 
    "schema_id": "E4BDfu4km5x7ni8P8gzbn2:2:leontest1109-2:0.0.1"
  }
  ]);
  const [attributesData, setAttributesData] = useState([{
      key:'Age',
      value:'20'
    },
    {
      key:'Gender',
      value:'MALE'
    },
    {
      key:'ID',
      value:'A123456789'
    },
    {
      key:'test1111',
      value:'1111'
    },
    {
      key:'test1111',
      value:'1111'
    },
    {
      key:'test1111',
      value:'1111'
    },
    {
      key:'test1111',
      value:'1111'
    },
    {
      key:'test1111',
      value:'1111'
    },
    {
      key:'test1111',
      value:'1111'
    },
    {
      key:'test1111',
      value:'1111'
    },
    {
      key:'test1111',
      value:'1111'
    },
    {
      key:'test1111',
      value:'1111'
    }
  ]);


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
    console.log('---props.route.params.credData---',props.route.params.credData);
    setTitle( props.route.params.credData.attrs.Title);
    setTimeStamp(getParsedTimeStamp(props.route.params.credData.attrs.TimeStamp));

    setCardData([{
      "attrs": {
        "Age": "12", 
        "Name": "Leon", 
        "Sex": "Male", 
        "TimeStamp": props.route.params.credData.attrs.TimeStamp, 
        "Title": props.route.params.credData.attrs.Title
      }, 
      "cred_def_id": "E4BDfu4km5x7ni8P8gzbn2:3:CL:187:leontest1109-2", 
      "cred_rev_id": null, 
      "referent": "636b0e80b466ea8c3ccb4bf4", 
      "rev_reg_id": null, 
      "schema_id": "E4BDfu4km5x7ni8P8gzbn2:2:leontest1109-2:0.0.1"
    }
    ])
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


  const getParsedTimeStamp = (text) => {
    const year = text.slice(0,4);
    const month = text.slice(4,6);
    const day = text.slice(6,8);
    const hour = text.slice(8,10);
    let minute = text.slice(10,12);


    return `${year}/${month}/${day}  ${hour}:${minute}`;
  }

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
                name:'TabContainer',
                state:{
                  routes:[{ name: 'CredentialList' } ]
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
    let finalTemp = [];

    const credData = Object.keys(data.attrs).map((keyName) => {
      return {
        key:keyName,
        value:data.attrs[keyName]
      }
    })
    
    credData.forEach((item) => {
      props.route.params.mergedAttribute.forEach((it)=>{
        if(item.key === it.name){
          finalTemp.push(item);
        }
      })
    })
    console.log('------final',finalTemp);
    setList(finalTemp);
  }

  //處理cred資料對應要查驗的attr組成＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  const handleRequestedCredentials = (req) => {
    const requestAttrs = req.requested_attributes;
    const predicateAttrs = req.requested_predicates;

    console.log('---req---',req);
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

    for(let predicateAttr in predicateAttrs){
      requested_creds.requested_predicates[predicateAttr] = {
        cred_id: props.route.params.credData.referent, 
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
    console.log('===INITIAL_STATE.walletHandle===',INITIAL_STATE.walletHandle);
    console.log('===proofReq===',INITIAL_STATE.proofReq);
    console.log('===requested_creds===',requested_creds);
    console.log('===INITIAL_STATE.masterSecretName===',INITIAL_STATE.masterSecretName);
    console.log('===INITIAL_STATE.schemas===',INITIAL_STATE.schemas);
    console.log('===INITIAL_STATE.credentialDefs===',INITIAL_STATE.credentialDefs);



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
    setShowInitLoading(true);

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


  const onReSelect = () => {
    props.navigation.goBack();
  }

  const onSend = () => {
    handleProof();

    // props.navigation.navigate('VerifyResult');

  }

  const DetailList = () => {
    const mergedList = list.map((item) => {
      return(
        <ListItem 
          containerStyle={styles.listItem}
          linearGradientProps={{
            colors: ['rgba(124,255,255,0.1)', 'rgba(124,255,255,0.2)'],
            start: { x: 0, y: 1 },
            end: { x: 1, y: 1 },
          }}
          ViewComponent={LinearGradient}
        >
          <ListItem.Content>
            <View style={styles.subtitleView}>
              <Text style={[content.Default, styles.key]}>{item.key}</Text>
              <Text style={[content.DefaultBold, styles.value]}>{item.value}</Text>
            </View>
          </ListItem.Content>
        </ListItem>
      )
    })
    return (
      <LinearGradient  
        colors={['rgba(124,255,255,0.1)', 'rgba(124,255,255,0.2)']} 
        start= {{x: 0, y: 1}}
        end= {{ x: 1, y: 1 }}
        style={styles.detailListArea}>
      {mergedList}
      </LinearGradient>
    );
  }

  const Divider = () => {
    return (
      <View style={styles.dividerArea}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
          <View>
            <Text style={{width: 100, textAlign: 'center'}}>Attributes</Text>
          </View>
          <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        </View>
      </View>
    );
  }

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
              <View style={styles.header}>
                <View>
                  <CredListComponent             
                    data={cardData} 
                    navigation={props.navigation} 
                    toPage={'CredentialDetail'}
                    from={'CredentialList'}>
                  </CredListComponent>
                </View>
              </View> 

              <View style={styles.body}>
                <ScrollView>
                  <ListItem containerStyle={styles.listItem}>
                    <ListItem.Content>
                      <View style={styles.subtitleView}>
                        <Text style={[content.Default, styles.key]}>Title</Text>
                        <Text style={[content.DefaultBold, styles.value]}>{title}</Text>
                      </View>
                    </ListItem.Content>
                  </ListItem>
                  <ListItem containerStyle={styles.listItem}>
                    <ListItem.Content>
                      <View style={styles.subtitleView}>
                        <Text style={[content.Default, styles.key]}>Issued Date</Text>
                        <Text style={[content.DefaultBold, styles.value]}>{timeStamp}</Text>
                      </View>
                    </ListItem.Content>
                  </ListItem>
                  <ListItem containerStyle={styles.listItem}>
                    <ListItem.Content>
                      <View style={styles.subtitleView}>
                        <Text style={[content.Default, styles.key]}>Issued By</Text>
                        <Text style={[content.DefaultBold, styles.value]}>Snowbridge Inc.</Text>
                      </View>
                    </ListItem.Content>
                  </ListItem>
                  <Divider/>
                  <DetailList></DetailList>
                </ScrollView>
              </View>  
              <View style={styles.footer}>
                <TouchableOpacity style={styles.btn} onPress={onReSelect}>
                  <Text style={[headline.Headline4, {color:'white'}]}>Re-Select</Text>
                </TouchableOpacity>          
                <TouchableOpacity style={styles.btn} onPress={onSend}>
                  <LinearGradient  
                    colors={['rgb(130,255,150)', 'rgb(124,255,255)']} 
                    start= {{x: 0, y: 0}}
                    end= {{ x: 1, y: 1 }}
                    style={styles.btn} 
                  >
                    <Text style={[headline.Headline4, {color:'black'}]}>Send</Text>
                  </LinearGradient>
                </TouchableOpacity>     
              </View>
            </View>
          )
        )
      }
    </View>
  );
}



const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:themeColor.DarkDarkOp8,
    padding:16
  },
  header:{
    flex:1,

    justifyContent: "center",
  },
  titleArea:{
    alignItems:'center',
    marginTop:32,
    marginBottom:10

  },  
  titleText: {
    color: 'white'
  },
  body:{
    flex:2,
    backgroundColor:'white',
    borderRadius:6,
    padding:16,
  },
  listItem:{
    margin: 12,
    marginBottom: 0,
    padding: 0,
  },
  detailListArea:{
    borderRadius:6,
    paddingBottom:16
  },
  footer:{
    flex:1,

    marginTop:32,
    alignItems:'center',
    justifyContent:'center',

  },

  imageArea:{
    flex:2,
    justifyContent:'center',
    alignItems:'center'
  },

  image:{
    height:150,
    width:200,
    margin:20,
    marginTop:0,
    paddingTop: 20,
  },
  credentialName:{
    color:'white',
  },
  detailArea:{
    flex:4,
  },
  subtitleView: {
    flexDirection: 'row',
    justifyContent:'space-between',
  },
  subtitleViewBtn:{
    flexDirection: 'row',
    justifyContent:'flex-end',
  },
  dividerArea:{
    height:30,
    marginTop:24,
    marginBottom:12
  },
  key:{
    flex:1,
    textAlign:'left',
    color:'rgb(123,128,139)'
  },
  value:{
    flex:2,
    textAlign:'right',
    color:'rgb(79,85,101)'
  },
  listItemBtn:{
    flex:2,
    textAlign:'right',
    color:'rgb(45,128,147)'
  },
  footer:{
    height:125,
    justifyContent:'space-evenly',
    flexDirection:'row',
    alignItems:'center',
  },
  btn:{
    width:165,
    height:50,
    borderRadius:8,
    alignItems:'center',
    justifyContent:'center'
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

export default connect(mapStateToProps, {setProof, setSchemas, setCredDefs, setProofReq})(VerifyCredConfirm);
