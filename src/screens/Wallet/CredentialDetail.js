import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native';

import { ListItem, Dialog } from '@rneui/themed';
import { Button } from '@rneui/base';

import { Colors } from '../../components/common/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';


// 只放純Credential顯示Detail，複雜indy處理的不導到這頁
const CredentialDetail = (props) => {
  const [showLoading, setShowLoading] = useState(true);
  const [list, setList] = useState();

  useEffect(() => {
    if (props.route.params.from === 'Wallet'){
      handleCredData(props.route.params.credData);
    } else if (props.route.params.from === 'GetCredential'){
      handleGetCredData(props.route.params.mergedDetailData);
    }

    setTimeout(() => {
      setShowLoading(false);
    }, 500);
  }, []);

  //處理Wallet中get_cred出來的object cred資料
  const handleCredData = (data) => {
    const credData = Object.keys(data.attrs).map((keyName) => {
      return {
        key:keyName,
        value:data.attrs[keyName]
      }
    })
    console.log('---credData---', credData);
    setList(credData);
  }

  //處理Get Cred處理過後的array cred資料
  const handleGetCredData = (data) => {
    const credData = data.map((item) => {
      return {
        key:item.key,
        value:item.value
      }
    })
    console.log('---credData---', credData);
    setList(credData);
  }

  const onVerifiedHistory = () => {

  }
  
  const DetailList = () => {
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
            <TouchableOpacity onPress={onVerifiedHistory} style={styles.btn}>
              <Ionicons name="library" size={60} color="black"></Ionicons>
              <Text>憑證被查驗</Text>
              <Text>歷程紀錄</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

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
  }
});

export default CredentialDetail;
