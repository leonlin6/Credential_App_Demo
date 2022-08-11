import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { Colors } from '../components/common/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { ListItem} from '@rneui/themed'

const VerifyResult = (props) => {

  const list =     {
    credential_name: '雪喬股份有限公司門禁',
    name: 'leon',
    day: '2020/02/12',
    title: 'Snowbridge',

    
  }


//   const testdata = {
//     "revealed_attr_groups": {
//         "leon_policyName": {
//             "sub_proof_index": 0, 
//             "values": [
//                 {
//                     "day": {
//                       "encoded": "899abfce0d01b6e822cdc492717ce2e8d3e965a3de8d6bb21223d48e35d54119",
//                       "raw": "dqwdq"
//                     },
//                     "name": {
//                       "encoded": "2ff6447d668d1c7a1271820e5ed9839cf6d05abc6bb91ef20aafb0b2e37e077e",
//                       "raw": "fqwf"
//                     }
//                 }
//             ]
//         }
//     }, 
//     "ruleName": "leon-驗證規則002"
// }

  useEffect(()=>{
    console.log('----verifyResultData----', props.route.params.verifyResultData);
  },[])

  const DetailList = () => {

    const revealed_attr_groups = props.route.params.verifyResultData.revealed_attr_groups;
    console.log('---revealed_attr_groups---',revealed_attr_groups);
    //測試用
    //  const revealed_attr_groups = testdata.revealed_attr_groups;
    
    const ruleList = Object.keys(revealed_attr_groups).map((item, index) => {
      console.log('---policyValue item----', item)
      if(typeof item !== 'undefined'){

        const policyValue = revealed_attr_groups[item].values;

        const tempList = Object.keys(policyValue).map((ruleKey, ruleIndex) => {
          return (
            <ListItem key={`rule${ruleIndex}`} containerStyle={{backgroundColor:'#F4F4F4'}}>
              <ListItem.Content>
                <View style={styles.subtitleView}>
                  <Text style={styles.key}>{`條件:${ruleKey}`}</Text>
                  <Text style={styles.value}>{`${policyValue[ruleKey].raw}`}</Text>
                </View>
              </ListItem.Content>
            </ListItem>
          )
        })
 
        return tempList;
      }else{
        return null;
      }

    })

    return ruleList;
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
      {
        props.route.params.verifyResultData.verifyResult === true ? (
          <View style={styles.imageArea}>
            <Ionicons name='ios-checkmark-circle' color={Colors.successGreen} size={175}></Ionicons>
            <Text style={styles.imageAreaText}>已驗證成功</Text>
          </View>
        )
        :
        (
          <View style={styles.imageArea}>
            <Ionicons name='ios-close-circle' color={Colors.failRed} size={175}></Ionicons>
            <Text style={styles.imageAreaText}>驗證失敗</Text>
          </View>
        )
      }
      
      <View style={styles.listArea}>
        <ScrollView persistentScrollbar={true}>
          <ListItem key='keyName' containerStyle={{backgroundColor:'#F4F4F4'}}>
            <ListItem.Content>
              <View style={styles.subtitleView}>
                <Text style={styles.key}>查驗規則</Text>
                <Text style={styles.value}>{props.route.params.verifyResultData.ruleName}</Text>
              </View>
            </ListItem.Content>
          </ListItem>
          <ListItem key='keyVerifyResult' containerStyle={{backgroundColor:'#F4F4F4'}}>
            <ListItem.Content>
              <View style={styles.subtitleView}>
                <Text style={styles.key}>查驗結果</Text>
                {
                  props.route.params.verifyResultData.verifyResult === true ? (
                    <Text style={[styles.value, {color:'green'}]}>成功</Text>
                  )
                  :
                  (
                    <Text style={[styles.value, {color:'red'}]}>失敗</Text>
                  )
                }
              </View>
            </ListItem.Content>
          </ListItem>
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
  

export default VerifyResult;