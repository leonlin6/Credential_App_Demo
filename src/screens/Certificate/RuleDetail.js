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
import {Colors} from '../../components/common/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';


const RuleDetail = (props) => {

  const [showLoading, setShowLoading] = useState(true);
  let list = {
    '規則名稱': '雪橋公司大門通行證',
    '查驗規則': {
        rule1:'Age > 18',
        rule2:'Country',
        rule3:'Sex',
        rule4:'Expired Date < 2022/07/30',
    }
  }

  useEffect(()=>{
    setTimeout(()=>{
      setShowLoading(false);
    },
    500)
  },[]);



  const onChooseRule = async () => {

    await AsyncStorage.setItem('currentRule',  props.route.params.selectedRule);
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

  const DetailList = () => {
    const rules = Object.keys(list['查驗規則']).map(function(keyName, keyIndex) {
      // use keyName to get current key's name
      // and a[keyName] to get its value
      return(
        <ListItem key={keyIndex} containerStyle={{backgroundColor:'#F4F4F4'}}>
            <ListItem.Content>
                <View style={styles.subtitleView}>
                    {
                        keyIndex === 0 ? 
                        (
                            <Text style={styles.key}>查驗規則</Text>
                        )
                        :
                        (
                            null
                        )
                    }
                    <Text style={styles.value}>{list['查驗規則'][keyName]}</Text>
                </View>
            </ListItem.Content>
        </ListItem>
      )
    })
    return rules;
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
            <View style={styles.detailArea}>
                <ScrollView persistentScrollbar={true} >
                    <ListItem containerStyle={{backgroundColor:'#F4F4F4'}}>
                        <ListItem.Content>
                            <View style={styles.subtitleView}>
                                <Text style={styles.key}>規則名稱</Text>
                                <Text style={styles.value}>{props.route.params.selectedRule}</Text>
                            </View>
                        </ListItem.Content>
                    </ListItem>
                    <DetailList></DetailList>
                </ScrollView>
            </View>
            <View style={styles.buttonArea}>
                <TouchableOpacity onPress={onChooseRule} style={styles.btn}>
                    <Ionicons name='ios-pricetag' size={60} color='#2196f3'></Ionicons>
                    <Text>選用規則</Text>
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


});

export default RuleDetail;