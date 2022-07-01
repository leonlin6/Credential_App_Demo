import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { Colors } from './Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { ListItem} from '@rneui/themed'

const SuccessScreen = (props) => {

  const list =     {
    credential_name: 'Customized Credential Name by Individual',
    issued_date: '2022/04/06',
    ca2: 'Snowbridge',
    issued_date2: '2022/04/06',
    ca3: 'Snowbridge',
    issued_date3: '2022/04/06',
    ca4: 'Snowbridge',
    issued_date6: '2022/04/06',
    ca5: 'Snowbridge',
    issued_date7: '2022/04/06',
    ca6: 'Snowbridge',
    issued_date8: '2022/04/06',
    ca7: 'Snowbridge',
    
  }

  const DetailList = () => {
    let i = 0;

    const abc = Object.keys(list).map(function(keyName, keyIndex) {
      // use keyName to get current key's name
      // and a[keyName] to get its value
      return(
        <ListItem key={keyName} containerStyle={{backgroundColor:'#F4F4F4'}}>
          <ListItem.Content>
            <View style={styles.subtitleView}>
              <Text style={styles.key}>{keyName}</Text>
              <Text style={styles.value}>{list[keyName]}</Text>
            </View>
          </ListItem.Content>
        </ListItem>
      )
    })

    return abc;
  }

  const onHomePress = () => {
    props.navigation.reset({
      index:0,
      routes: [
        {
          name:'DrawerContainer',
          state:{
            routes:[
              {
                name: 'Certificate'
              }
            ]
          }
        },
      ]
    });
  }


  return(
    <View style={styles.container}>
      <View style={styles.imageArea}>
        <Ionicons name='ios-checkmark-circle' color={Colors.successGreen} size={175}></Ionicons>
        <Text style={styles.imageAreaText}>已驗證成功</Text>
      </View>
      <View style={styles.listArea}>
        <ScrollView persistentScrollbar={true}>
          <DetailList/>
        </ScrollView>
      </View>
      <View style={styles.buttonArea}>
        <TouchableOpacity
          style={styles.btn}
          onPress={onHomePress}>
          <Text style={styles.btnText}>回到首頁</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    padding:20,
    flex:1
  },
  imageArea:{
    justifyContent:'center',
    alignItems:'center',
    flex:2
  },
  imageAreaText:{
    fontSize:25,
    color:'black',
    fontWeight:'bold'
  },
  listArea:{
    flex:3,
    marginTop:20

  },
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5,
    justifyContent:'space-between',
    borderBottomWidth:1,
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
    paddingTop:20,
    justifyContent:'center',
    alignItems:'center'
  },
  btn:{
    backgroundColor:'#2196f3',
    borderRadius: 20,
    width:150,
    alignContent:'center',    
    justifyContent:'center',

    flexDirection:'row',
    paddingVertical:5,
  },
  btnText:{
    color:'white',
    fontSize:20
  }

});
  

export default SuccessScreen;