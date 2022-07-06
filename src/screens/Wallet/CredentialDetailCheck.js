import React, {useEffect, useState} from 'react';
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



const CredentialDetailCheck = (props) => {

  const [fromPage, setFromPage] = useState('VerifyCertificationScan');
  const [showLoading, setShowLoading] = useState(true);
  const [mergedDetailData, setMergedDetailData] = useState();

  let detailData = {
    '憑證名稱': '雪喬公司大門通行證',
    '發證時間': '2022/04/06 16:02:25',
    '發證單位': 'Snowbridge',
   }
  
  useEffect(()=>{

    setTimeout(()=>{
      setShowLoading(false);
    },
    500)
  },[]);


  useEffect(()=>{
    parseDetailData();
  },[]);


  const parseDetailData = async () => {
    try{
      let attributes = props.route.params.attributesValue;
      const result = Object.keys(attributes).map((item, index) => {

        
        //let attribute = 'Attribute' + (index+1);

        detailData = {
          ...detailData,
          [item]:attributes[item]
        }
      })
      setMergedDetailData(detailData);
      const arrayData = [];
      arrayData.push(detailData);
      // await AsyncStorage.setItem('detailData',arrayData.toString());
      await AsyncStorage.removeItem('detailData');

      try{
        await AsyncStorage.setItem('detailData', JSON.stringify(detailData));
      } 
      catch(error){
        console.log(error);
      }
    }
    catch(error){
    }
  }
  const getDefinitionReq = async () => {
    try{
      let parsedData;
      let response = await indy.buildGetCredDefRequest('VsKV7grR1BUE29mG2Fm2kX','E4BDfu4km5x7ni8P8gzbn2:3:CL:9:fwfweew');

      console.log('response',response);
      console.log('poolHandle',poolHandle);

      let definitionResponse = await indy.submitRequest(poolHandle,response);
      console.log('definitionResponse',definitionResponse);
      
      parsedData = await indy.parseGetCredDefResponse(definitionResponse);
      cred_def_json = parsedData[1];
      //[definitionID, definitionJSON]
      console.log('DefinitionID',parsedData[0]);
      console.log('Definition',parsedData[1]);

    } catch(error){
      console.log(error);
    }
  }


  const CreateCredentialReq = async () => {
    const reqResponse = await indy.proverCreateCredentialReq(walletHandle, pover_did, cred_offer_json, cred_def_json, prover_link_secret_name);

    // console.log('walletHandle', walletHandle);
    // console.log('pover_did', pover_did);
    // console.log('cred_offer_json', cred_offer_json);
    // console.log('cred_def_json', cred_def_json);
    // console.log('prover_link_secret_name', prover_link_secret_name);
    cred_req_json = reqResponse[0];
    cred_metadata= reqResponse[1];

    console.log('-------cred_req_json--------', cred_req_json);
    console.log('-------cred_metadata--------', cred_metadata);
  
  }

  const submit = async () => {
    try{
      const configurationObject = {
        method: 'put',
        baseURL:'http://192.168.0.101:5001',
        url: `api/v1/credential/${cred_id}/download`,
        headers:{
          'authorization':`Bearer ${props.loginToken}`,
          'Content-Type':'application/json'
        },
        data:{
          value:[        {
            "key": "name",
            "type": 0,
            "value": "male"
        }],
          cred_req_json:cred_req_json
        }
      };


      await axios(configurationObject)
      .then((response) => {
        console.log('download credential', response);
      })

    }catch(error){
      console.log('error', error);
    }
  }


  const saveCredential = async () => {
    try{
      console.log('saveCredential onPress');

      
      //proverStoreCredential(wh, credId, credReqMetadata, cred, credDef, revRegDef) {
      console.log('----wh----',walletHandle);
      console.log('----cred_id----',cred_id);
      console.log('----cred_metadata----',cred_metadata);
      console.log('----cred_json----',cred_json);
      console.log('----cred_def_json----',cred_def_json);

      let parsedCredJson = JSON.parse(cred_json);
      console.log('---parsedCredJson--', parsedCredJson); 

      const result = await indy.proverStoreCredential(
        walletHandle, 
        cred_id,
        cred_metadata,
        parsedCredJson,
        cred_def_json
      );
  
      console.log('save credential result', result);
    } catch(error){
      console.log(error);
    }
  
  }



  const onGetCredential = async () => {
    // props.navigation.navigate({
    //   name:'Loading',
    //   params:{
    //     loadingStatusText : ['正在等待建立憑證', '正在等待憑證發送','已成功將憑證存至錢包中'],
    //     from:'GetCredential',
    //     toPage:'CredentialDetail'
    //   }
    // });
    setShowLoading(true);

    //download cred handle
    await getDefinitionReq();
    await CreateCredentialReq();
    await submit();
    await saveCredential();


    setShowLoading(false);


    console.log('hadle done');


  }


  const DetailList = () => {
    let i = 0;
    const abc = Object.keys(mergedDetailData).map(function(keyName, keyIndex) {
      // use keyName to get current key's name
      // and a[keyName] to get its value

      return(
        <ListItem key={keyIndex} containerStyle={{backgroundColor:'#F4F4F4'}}>
          <ListItem.Content>
            <View style={styles.subtitleView}>
              <Text style={styles.key}>{keyName}</Text>
              <Text style={styles.value}>{mergedDetailData[keyName]}</Text>
            </View>
          </ListItem.Content>
        </ListItem>
      )
    })
    return abc;
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

export default CredentialDetailCheck;