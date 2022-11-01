import React, {useEffect, useState} from 'react';

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
import {connect} from 'react-redux';
import { ListItem } from '@rneui/themed';
import { headline, content, themeColor } from '../../../styles/theme.style';

import LinearGradient from 'react-native-linear-gradient';
import indy from 'indy-sdk-react-native';
import axios from 'axios';
import LoadingComponent from '../../../components/common/LoadingComponent';
//API
import { ENDPOINT_BASE_URL } from '../../../APIs/APIs';

const ApplyCredConfirm = (props) => {
  const loadingStatusText = ['正在等待建立憑證', '正在等待憑證發送','已成功將憑證存至錢包中'];
  let prover_did = 'VsKV7grR1BUE29mG2Fm2kX';
  let prover_link_secret_name = 'link_secret234';

  let INITIAL_STATE = {
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

  const [fromPage, setFromPage] = useState('VerifyCertificationScan');
  const [showLoading, setShowLoading] = useState(false);
  const [showInitLoading, setShowInitLoading] = useState(true);
  const [mergedDetailData, setMergedDetailData] = useState();


  useEffect(()=>{
    const loadingTimeout = setTimeout(()=>{
      setShowInitLoading(false);
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
      console.log('---arrayData---',arrayData);
      setMergedDetailData(arrayData);

    }
    catch(error){
    }
  }

  // 1
  const getDefinition = async () => {
    try{

      console.log('====start get definition req=====');
      let parsedData;

      //get def req
      let response = await indy.buildGetCredDefRequest('VsKV7grR1BUE29mG2Fm2kX', INITIAL_STATE.cred_def_id);
      console.log('response',response);

      console.log('INITIAL_STATE.poolHandle', typeof INITIAL_STATE.poolHandle);
      console.log('INITIAL_STATE.poolHandle typeof', typeof INITIAL_STATE.poolHandle);


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

    console.log('-------cred_req_json--------', INITIAL_STATE.cred_req_json);
    console.log('-------cred_metadata--------', INITIAL_STATE.cred_metadata);
  
  }

  // 3 
  const submit = async () => {
    try{
      console.log('---mergedDetailData---',mergedDetailData);

      const configurationObject = {
        method: 'put',
        baseURL:ENDPOINT_BASE_URL,
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
        console.log('---download cred---', response.data);
        console.log('---download credential----', response.data.cred_json);
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
      console.log('---INITIAL_STATE.cred_json--', INITIAL_STATE.cred_json); 
      console.log('---INITIAL_STATE', INITIAL_STATE); 
      let parsedCredJson = JSON.parse(INITIAL_STATE.cred_json);
      console.log('---parsedCredJson--', parsedCredJson); 

      const result = await indy.proverStoreCredential(
        INITIAL_STATE.walletHandle, 
        INITIAL_STATE.cred_id,
        INITIAL_STATE.cred_metadata,
        parsedCredJson,
        INITIAL_STATE.cred_def_json
      );
  
      console.log('----save credential result----', result);

    } catch(error){
      console.log(error);
    }
  }

  //上方卡片圖案用.記得修掉 by Leon 2022.10.31
  const [credData, setCredData] = useState([{
      key:'test1111',
      value:'1111'
    }
  ]);


  const onCancel = () => {
    props.navigation.goBack();
  }

  const onDownload = async () => {
    setShowLoading(true);

    //download cred handle
    await getDefinition();
    await CreateCredentialReq();
    await submit();
    await saveCredential();

  }

  const DetailList = () => {
    const mergedList = mergedDetailData.map((item) => {
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
    <View style={{flex:1}}>
    {
      showLoading === true ? (
        <LoadingComponent 
          loadingStatusText={loadingStatusText} 
          from={props.route.params.from} 
          toPage='CredentialList' 
          mergedDetailData={mergedDetailData}
          nv={props.navigation}/>
      )
      :
      (
        showInitLoading === true ? (
          <View style={[styles.container,{justifyContent:'center'}]}>
            <ActivityIndicator size="large" />
          </View>      
        )
        :
        (
          <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleArea}>
          <Text style={[headline.Headline1, styles.titleText]}>CREDENTIAL READY</Text>
        </View>
        <View>
          <CredListComponent             
            data={credData} 
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
                <Text style={[content.DefaultBold, styles.value]}>Snowbridge Door License</Text>
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
        <TouchableOpacity style={styles.btn} onPress={onCancel}>
          <Text style={[headline.Headline4, {color:'white'}]}>Cancel</Text>
        </TouchableOpacity>          
        <TouchableOpacity style={styles.btn} onPress={onDownload}>
          <LinearGradient  
            colors={['rgb(130,255,150)', 'rgb(124,255,255)']} 
            start= {{x: 0, y: 0}}
            end= {{ x: 1, y: 1 }}
            style={styles.btn} 
          >
            <Text style={[headline.Headline4, {color:'black'}]}>Download</Text>
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
    height: 365,
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
    masterSecret:state.masterSecret
  };
}

export default connect(mapStateToProps)(ApplyCredConfirm);