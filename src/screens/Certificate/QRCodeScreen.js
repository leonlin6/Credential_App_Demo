import React, {useState, useEffect, useRef} from 'react';
import { 
  View, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity,
  Text,
  ScrollView,
  Animated,
  Image
} from 'react-native';
import { Switch } from '@rneui/themed';
import { Dropdown } from 'react-native-element-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

import {Colors} from '../../components/common/Colors';
import * as Animatable from 'react-native-animatable';

const QRCodeScreen = (props) => {
  const loadingStatusText = ['正在等待對方選擇憑證', '正在驗證憑證...'];

  const onLoadingShow = () => {
    props.navigation.navigate({
      name:'Loading',
      params:{
        loadingStatusText : loadingStatusText,
        from:'QRCertificate',
        toPage:'Success'
      }
    });
  }
  
  return (
    <View style={{flex:1}}>
      <View style={styles.container}>
        <View style={styles.QRArea}>
          <TouchableOpacity
            style={styles.contentBtn}
            onPress={onLoadingShow}>
            <Image
                style={styles.logo}
                source={require('../../assets/images/QR_Code_Logo.png')}
            ></Image>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text style={styles.info}>掃描此QR Code以查驗執照</Text>
          <Text style={styles.expiredDate}>有效期限：2022/07/08</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20,

  },
  QRArea:{
      flex:2,
      justifyContent:'space-evenly',
      alignItems:'center',
  },
  info:{
    textAlign:'center',
    marginBottom:5,
    fontSize:20

  },
  expiredDate:{
    textAlign:'center',
    marginBottom:20,
    color:'#2196f3',
    fontSize:20
  },
  buttonText:{
    textAlign:'center',

  },
  footer:{
      flex:1,
      alignItems:'center',
      padding:20

  },
  logo:{
    height:325,
    width:300
  },

});

export default QRCodeScreen;