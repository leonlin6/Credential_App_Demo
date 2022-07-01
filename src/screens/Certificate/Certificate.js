import React, {useEffect, useState, useRef} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { 
  View, 
  Text,  
  StyleSheet, 
  TouchableOpacity,

} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Certificate = (props) => {

  const [showDrawerMenu, setShowDrawerMenu] = useState(false);
  const [currentRule, setCurrentRule] = useState('');

  useEffect(()=>{
    const getCurrentRule = async () => {
      try{
        const CR = await AsyncStorage.getItem('currentRule');
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

  const onMyRulePress = () => {
    props.navigation.navigate('MyRule');
  }  

  const onCertificatePress = () => {
    props.navigation.navigate('QRCode');
  }

  const onCertificateHistoryPress = () => {
    props.navigation.navigate('CertificateHistory');
  }

  return (
    <View style={styles.container} >
      <View style={styles.menu}>
        <TouchableOpacity style={styles.image} onPress={onMenuPress}>
          <Ionicons name='menu' size={50}></Ionicons>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={onMyRulePress}>
        <View style={styles.blockBtn}>
            <Text style={styles.btnText}>我的規則</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onCertificatePress}>
        <View style={styles.blockBtn}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    fontSize: 25,
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'center'
  },
  menu:{
    position:'absolute',
    top:10,
    left:10
  },
  blockBtn:{
    width:300,
    height:150,
    backgroundColor:'#2196f3',
    margin:20,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:20
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


export default Certificate;