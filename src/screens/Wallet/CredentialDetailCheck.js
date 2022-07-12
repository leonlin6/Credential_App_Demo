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
  
import { ListItem, Dialog,} from '@rneui/themed'
import AsyncStorage from '@react-native-async-storage/async-storage';
import indy from 'indy-sdk-react-native';
import axios from 'axios';

// redux
import {connect} from 'react-redux';
import { initializeRegistryWithDefinitions } from 'react-native-animatable';



const CredentialDetailCheck = (props) => {
  const INITIAL_STATE = {
      walletHandle: props.walletHandle, 
      poolHandle: props.poolHandle,
      cred_offer_json: props.route.params.cred_offer_json,
      cred_id: props.route.params.cred_id,
      cred_def_id: props.route.params.cred_def_id,
      masterSecret: props.masterSecret,

      mergedWriteAttributes: props.route.params.mergedWriteAttributes,
      onlyDisplayAttributes: props.route.params.onlyDisplayAttributes,
      
      cred_def_json: "0",
      cred_req_json: "0",
      cred_metadata: "0",
      cred_json: "0",
  };

let returnArray = [];
  // const reducer = (state, action) => {
  //   switch (action.type) {
  //     case "CHANGE_CRED_DEF":
  //       return {
  //         ...state,
  //         cred_def_json: action.payload
  //       };

  //     case "CHANGE_CRED_REQ":
  //       return newVariable;
  //     case "CHANGE_CRED_METADATA":
  //       return newVariable;
  //     case "CHANGE_CRED":
  //       return newVariable;
  //     default:
  //       throw new Error(`不存在的 action type: ${action.type}`);
  //   }
  // };

  const [fromPage, setFromPage] = useState('VerifyCertificationScan');
  const [showLoading, setShowLoading] = useState(true);
  const [mergedDetailData, setMergedDetailData] = useState();


  // const [credInfoState, dispatch] = useReducer(reducer, INITIAL_STATE);

  let prover_did = 'VsKV7grR1BUE29mG2Fm2kX';
  let prover_link_secret_name = 'link_secret234';



  //only for test
  //  let detailData = {
  //   '憑證名稱': '雪喬公司大門通行證',
  //   '發證時間': '2022/04/06 16:02:25',
  //   '發證單位': 'Snowbridge',
  //  }

  useEffect(()=>{
    const loadingTimeout = setTimeout(()=>{
      setShowLoading(false);
    },
    500);

    return(() => {
      clearTimeout(loadingTimeout);
    })
  },[]);


  useEffect(()=>{
    parseDetailData();

    //initialize credential data
    initializeCredData();
  },[]);


  const initializeCredData = () => {
    // console.log('----credInfoState----', credInfoState); 

  }

  const parseDetailData = async () => {
    try{
      let mergedWriteAttributes = props.route.params.mergedWriteAttributes;
      let onlyDisplayAttributes = props.route.params.onlyDisplayAttributes;
      let arrayData = [];


      console.log('---mergedWriteAttributes---',mergedWriteAttributes);
      console.log('---onlyDisplayAttributes---',onlyDisplayAttributes);

      mergedWriteAttributes.forEach((item)=>{
        arrayData.push(item);

      });

      onlyDisplayAttributes.forEach((item)=>{
        arrayData.push(item);
      });
      
      setMergedDetailData(arrayData);

      
      // // await AsyncStorage.removeItem('@detailData');
      // console.log('----arrayData----',arrayData);

      // try{
      //   await AsyncStorage.setItem('@DetailData', JSON.stringify(arrayData));
      // } 
      // catch(error){
      //   console.log(error);
      // }
    }
    catch(error){
    }
  }

  // 1
  const getDefinitionReq = async () => {
    try{

      console.log('====start get definition req=====');
      let parsedData;

      //get def req
      let response = await indy.buildGetCredDefRequest('VsKV7grR1BUE29mG2Fm2kX', INITIAL_STATE.cred_def_id);
      console.log('response',response);


      //submit req
      let definitionResponse = await indy.submitRequest(INITIAL_STATE.poolHandle, response);
      // console.log('definitionResponse', definitionResponse);
      
      // parse def req response
      parsedData = await indy.parseGetCredDefResponse(definitionResponse);

      // cred_def_id = parsedData[0];
      console.log('parsedData', parsedData);
      
      // dispatch to change cred def
      // dispatch({type: "CHANGE_CRED_DEF", payload: parsedData[1]});
      INITIAL_STATE.cred_def_json = parsedData[1];

      // console.log('-----state.cred_def_json-----', INITIAL_STATE.cred_def_json);

      //[definitionID, definitionJSON]
      // console.log('DefinitionID',parsedData[0]);
      // console.log('Definition',parsedData[1]);

    } catch(error){
      console.log(error);
    }
  }

  // 2
  const CreateCredentialReq = async () => {

    console.log('========CreateCredentialReq start=======');

    console.log('---walletHandle---', INITIAL_STATE.walletHandle);
    console.log('---cred_offer_json---', INITIAL_STATE.cred_offer_json);
    console.log('---prover_did---', prover_did);

    console.log('---cred_def_json---', INITIAL_STATE.cred_def_json);
    console.log('--masterSecret---', INITIAL_STATE.masterSecret);


    const reqResponse = await indy.proverCreateCredentialReq(
      INITIAL_STATE.walletHandle, 
      prover_did, 
      INITIAL_STATE.cred_offer_json, 
      INITIAL_STATE.cred_def_json, 
      INITIAL_STATE.masterSecret
      );

      INITIAL_STATE.cred_req_json = reqResponse[0];
      INITIAL_STATE.cred_metadata = reqResponse[1];

    // console.log('-------cred_req_json--------', INITIAL_STATE.cred_req_json);
    // console.log('-------cred_metadata--------', INITIAL_STATE.cred_metadata);
  
  }

  // 3 
  const submit = async () => {
    try{
      const configurationObject = {
        method: 'put',
        baseURL:'http://192.168.0.101:5001',
        url: `api/v1/credential/${INITIAL_STATE.cred_id}/download`,
        headers:{
          'authorization':`Bearer ${props.loginToken}`,
          'Content-Type':'application/json'
        },
        data:{
          value: mergedDetailData,
          cred_req_json:JSON.stringify(INITIAL_STATE.cred_req_json)
        }
      };


      await axios(configurationObject)
      .then((response) => {
        console.log('download credential', response.data.cred_json);
        INITIAL_STATE.cred_json = response.data.cred_json;
      })

    }catch(error){
      console.log('error', error);
    }
  }

  // 4
  const saveCredential = async () => {
    try{
      console.log('======saveCredential onPress======');

      
      // proverStoreCredential(wh, credId, credReqMetadata, cred, credDef, revRegDef);

      let parsedCredJson = JSON.parse(INITIAL_STATE.cred_json);
      console.log('---parsedCredJson--', parsedCredJson); 

      const result = await indy.proverStoreCredential(
        INITIAL_STATE.walletHandle, 
        INITIAL_STATE.cred_id,
        INITIAL_STATE.cred_metadata,
        parsedCredJson,
        INITIAL_STATE.cred_def_json
      );
  
      console.log('save credential result', result);
    setShowLoading(false);

    } catch(error){
      console.log(error);
    }
  
  }



  const onGetCredential = async () => {
    setShowLoading(true);
    //download cred handle
    await getDefinitionReq();
    await CreateCredentialReq();
    await submit();
    await saveCredential();

    props.navigation.navigate({
      name:'Loading',
      params:{
        loadingStatusText : ['正在等待建立憑證', '正在等待憑證發送','已成功將憑證存至錢包中'],
        from:'GetCredential',
        toPage:'CredentialDetail',
        mergedDetailData: mergedDetailData
      }
    });
  }


  const DetailList = () => {
    let i = 0;
    const list = mergedDetailData.map((item, index) => {
      return(
        <ListItem key={index} containerStyle={{backgroundColor:'#F4F4F4'}}>
          <ListItem.Content>
            <View style={styles.subtitleView}>
              <Text style={styles.key}>{item.key}</Text>
              <Text style={styles.value}>{item.value}</Text>
            </View>
          </ListItem.Content>
        </ListItem>
      )
    })
    return list;
  }
  
  //render page
  return (
    <View style={{flex:1}}>
    {
      showLoading === true ? (
        <View style={[styles.container,{justifyContent:'center'}]}>
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
            <ScrollView persistentScrollbar={true} >
              <DetailList></DetailList>
            </ScrollView>
          </View>
          <View style={styles.buttonArea}>
            <TouchableOpacity onPress={onGetCredential} style={styles.btn}>
                <Ionicons name='ios-archive-outline' size={60} ></Ionicons>
                <Text>領取此憑證</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
    </View>
  );
}


const styles = StyleSheet.create({
  container:{
    padding:20,
    flex:1
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

  nameArea:{
    flex:1,
    width:200,
    justifyContent:'flex-end',
    paddingLeft:10,
    paddingBottom: 10
  },
  credentialName:{
    color:'white',
  },
  detailArea:{
    flex:4,

  },

  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5,
    justifyContent:'space-between',
    borderBottomWidth:1,
  },
  ratingImage: {
    height: 19.21,
    width: 100
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey'
  },
  key:{
    flex:1,
    textAlign:'left',
  },
  value:{
    flex:1,
    textAlign:'right'
  },
  buttonArea:{
    flex:1,
    marginTop: 30,
    paddingTop:20,
    borderTopWidth:1,
    borderTopColor:'gray',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row'
  },
  btn:{
    justifyContent:'center',
    alignItems:'center',
  }
});

const mapStateToProps = (state) => {  
  return {
      loginToken: state.loginToken,
      walletHandle: state.walletHandle,
      poolHandle: state.poolHandle,
      masterSecret:state.masterSecret
  };
}

export default connect(mapStateToProps)(CredentialDetailCheck);
