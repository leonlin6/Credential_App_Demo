import React, {useEffect, useState, useRef} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { 
  View, 
  Text,  
  StyleSheet, 
  TouchableOpacity,
  Dimensions,

} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

//api
import { ENDPOINT_BASE_URL } from '../../APIs/APIs';
import axios from 'axios';

//redux
import {connect} from 'react-redux';


const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const Certificate = (props) => {

  const [showDrawerMenu, setShowDrawerMenu] = useState(false);
  const [currentRule, setCurrentRule] = useState('');

  useEffect(()=>{
    const getCurrentRule = async () => {
      try{
        const CR = await AsyncStorage.getItem('@CurrentRule');
        console.log('CR', CR);
        console.log('currentRule',currentRule);
        if(CR !== null)
          setCurrentRule(CR);
      }catch(error){
        console.log(error);
      }
    }

    getCurrentRule();
  },[]);

  const onMenuPress = () => {
    if(showDrawerMenu === true)
      props.navigation.closeDrawer();
    else
      props.navigation.openDrawer();
  }

  const onMyRulePress = async () => {
    const configurationObject = {
      method: 'get',
      baseURL: ENDPOINT_BASE_URL,
      url: `api/v1/verify/template`,
      headers:{
        'authorization':`Bearer ${props.loginToken}`,
        'Content-Type':'application/json'
      }
    };

    const response = await axios(configurationObject);
    props.navigation.navigate({
      name:'MyRule',
      params:{
        templates:response.data.items
      }
    });
  }  

  const onCertificatePress = async () => {
    const configurationObject = {
      method: 'post',
      baseURL: ENDPOINT_BASE_URL,
      url: `api/v1/qrcode`,
      headers:{
        'authorization':`Bearer ${props.loginToken}`,
        'Content-Type':'application/json'
      }

    };
    const response = await axios(configurationObject);

    console.log('===response===', response.data);

    props.navigation.navigate({
      name:'CertificateQR',
      params:{
        _id: response.data._id,
        createdAt: response.data.createdAt,
        updatedAt: response.data.updatedAt
      }
    });
  }

  const onCertificateHistoryPress = () => {
    props.navigation.navigate('CertificateHistory');
  }

  return (
    <View style={styles.container} >
      <View style={{height:75}}></View>
      <TouchableOpacity onPress={onMyRulePress}>
        <View style={styles.blockBtn}>
            <Text style={styles.btnText}>我的規則</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onCertificatePress}>
        <View style={styles.blockBtn2}>
          <Text style={styles.btnText}>查驗憑證</Text>
          {
            currentRule !== '' ? 
            (
              <Text style={styles.currentRuleText}>{`現行規則：${currentRule}`}</Text>
            ) 
            : 
            (
              null
            )
          }
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onCertificatePress}>
        <View style={styles.blockBtn}>
            <Text style={styles.btnText}>查驗歷程</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.menu}>
        <TouchableOpacity style={styles.image} onPress={onMenuPress}>
          <Ionicons name='menu' size={50}></Ionicons>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    fontSize: 25,
    backgroundColor:'white',
    justifyContent:'center',
  },
  menu:{
    position:'absolute',
    top:10,
    left:10
  },
  blockBtn:{

    backgroundColor:'#eebb70',
    justifyContent:'center',
    flexDirection:'column',
    alignItems:'center',
    alignSelf: 'stretch', 
    height:SCREEN_HEIGHT * 0.3,
  },
  blockBtn2:{
    backgroundColor:'#03a9f4',
    justifyContent:'center',
    flexDirection:'column',
    alignItems:'center',
    alignSelf: 'stretch', 
    height:300,
    height:SCREEN_HEIGHT * 0.3,
  },
  btnText:{
    color:'white',
    fontSize:30
  },
  currentRuleText:{
    marginTop:10,
    color:'white',
    fontSize:18
  }


});

const mapStateToProps = (state) => {  
  return {
      loginToken: state.loginToken,
  };
}

export default connect(mapStateToProps)(Certificate);