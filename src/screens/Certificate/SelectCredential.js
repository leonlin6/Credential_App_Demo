import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity,
  Text
} from 'react-native';
import ListComponent from '../../components/common/ListComponent';
import {connect} from 'react-redux';
import indy from 'indy-sdk-react-native';

//api
import { ENDPOINT_BASE_URL } from '../../APIs/APIs';
import axios from 'axios';
import { setGestureState } from 'react-native-reanimated/lib/reanimated2/NativeMethods';


const SelectCredential = (props) => {
  let credsFromWallet = [];

  const [displayType, setDisplayType] = useState('card');
  const [displayTypeIcon, setDisplayTypeIcon] = useState('reader');
  const [credData, setCredData] = useState([]);

  useEffect(() => {
    console.log('===props.route.params===', props.route.params);
    console.log('proofReq',props.proofReq);
    console.log('verifyId',props.verifyId);

    const initialCred = async () => {
      await getCredFromWallet();
      await getQualifiedCred();
    }

    initialCred();
  },[])


  const getCredFromWallet = async () => {
    console.log('---getCredFromWallet---');

    let response = await indy.proverGetCredentials(props.walletHandle);
    credsFromWallet = response;
  }

  const getQualifiedCred = async () => {
    const configurationObject = {
      method: 'get',
      baseURL: ENDPOINT_BASE_URL,
      url: `api/v1/verify/template/${props.route.params.verifyTemplate}`,
      headers:{
        'authorization':`Bearer ${props.loginToken}`,
        'Content-Type':'application/json'
      }
    };

    const response = await axios(configurationObject);
    const templateAttributes = response.data.attributes[0].attributes;

    // check if cred has the attrs which requested by template
    templateAttributes.forEach((item) => {
      credsFromWallet.forEach((it) => {
        if(!it.attrs.hasOwnProperty(item)){
          it['ruleNotContain'] = true;
        }
      })
    })

    const filteredCreds = credsFromWallet.filter((cred) => {
      return !cred.hasOwnProperty('ruleNotContain');
    })
    setCredData(filteredCreds);
  }

  const onClickDisplay = () => {
    if(displayType === 'card'){
      setDisplayType('list');
      setDisplayTypeIcon('ios-card-outline');
    }else{
      setDisplayType('card');
      setDisplayTypeIcon('reader');
    }
  }


  // render page
  return (
    <View style={styles.container}>
      <View style={styles.searchArea}>
        <Text style={styles.title}>請選擇用來查驗的憑證</Text>
        <View style={styles.displayBtn}>
          <TouchableOpacity
            style={styles.contentBtn}
            onPress={onClickDisplay}>
            <Ionicons name={displayTypeIcon} size={40} color='black'></Ionicons>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.listArea}>
        <ListComponent 
          data={credData} 
          displayType={displayType} 
          navigation={props.navigation} 
          toPage={'SelectedCredDetail'}
          from={props.route.params.from}
        > 
        </ListComponent>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  searchArea:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:'center',
    paddingHorizontal:20,
    backgroundColor:'white'
  },
  title:{
    flex:8,
    fontSize:25
  },

  displayBtn:{
    flex:1
  },
  listArea:{
    flex:7,
    backgroundColor:'white'
  },
  card:{
      height:150,
      margin:20,
      marginTop:0,
      backgroundColor:'#215cf3',
      paddingTop: 20,
      borderRadius:20,
      shadowColor: 'black',
      shadowOpacity: 0.26,
      shadowOffset: { width: 0, height: 2},
      shadowRadius: 10,
      elevation: 3,

  },
  dateArea:{
    backgroundColor:'#2196f3',

  },
  dateText:{
    height:20,

    color:'white',
    textAlign:'right',
    paddingRight:5

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
  }
  

});

const mapStateToProps = (state) => {  
  return {
      loginToken:state.loginToken,
      walletHandle: state.walletHandle,
      proofReq: state.proofReq,
      verifyId: state.verifyId
  };
}

export default connect(mapStateToProps)(SelectCredential);