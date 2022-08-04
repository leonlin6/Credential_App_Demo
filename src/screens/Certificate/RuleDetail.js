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
import RulesComponent from '../../components/common/RulesComponent';

//api
import { ENDPOINT_BASE_URL } from '../../APIs/APIs';
import axios from 'axios';
//redux
import {connect} from 'react-redux';


const RuleDetail = (props) => {
  let tempList = {};
  const [showLoading, setShowLoading] = useState(true);
  const [rulesArray, setRulesArray] = useState([]);
  const [ruleName, setRuleName] = useState('');
  const [list, setList] = useState('');



  //處理條件
  const handlePredicates = (predicates) => {
    const pred = predicates.map((item) => {
      return item;
    })
    tempList['predicates'] = pred;
  }


  //處理attribute內容
  const handleAttributes = (attributes) => {
    const attr = attributes.map((item)=>{
      return item;
    })
    tempList['attributes'] = attr;
  }

  const mergeAttribute = () => {
    let hashTemp = {};
    tempList.predicates.forEach((item) => {
      hashTemp[item.name] = item;
    })

    const mergedAttribute = tempList.attributes.map((it) => {
      if(hashTemp.hasOwnProperty(it))
        return {
          ...hashTemp[it],
          hasPredicate: true
        };
      else{
        return {
          name:it,
          hasPredicate: false
        }
      }
    })
    tempList['mergedAttribute'] = mergedAttribute;
  }


  useEffect(()=>{
    const requestTemplateDetail = async () => {
      console.log('---request template detail---');
      const configurationObject = {
        method: 'get',
        baseURL: ENDPOINT_BASE_URL,
        url: `api/v1/verify/template/${props.route.params.templateId}`,
        headers:{
          'authorization':`Bearer ${props.loginToken}`,
          'Content-Type':'application/json'
        }
      };
  
      const response = await axios(configurationObject);

      console.log('---response.data----',response.data);


      tempList['ruleName'] = response.data.name;
      handleAttributes(response.data.attributes[0].attributes);
      handlePredicates(response.data.predicates);
      mergeAttribute();
      console.log('--tempList---', tempList);
      setList(tempList);

    }

    requestTemplateDetail();
    setTimeout(()=>{
      setShowLoading(false);
    },
    500)
  },[]);



  const onChooseRule = async () => {
    console.log('props.route.params.selectedRule',props.route.params.templateId);
    console.log('props.route.params.selectedRule',props.route.params.templateName);

    const configurationObject = {
      method: 'put',
      baseURL: ENDPOINT_BASE_URL,
      url: 'api/v1/user/me/verify/template',
      headers:{
        'authorization':`Bearer ${props.loginToken}`,
        'Content-Type':'application/json'
      },
      data:{
        verifyTemplateId: props.route.params.templateId
      }
    };

    const response = await axios(configurationObject);
    console.log('===response===', response.data);

    await AsyncStorage.setItem('@CurrentRule', JSON.stringify(
      {
        templateName: props.route.params.templateName,
        templateId: props.route.params.templateId
      }));

      
    props.navigation.reset({
      index:0,
      routes: [
        {
          name:'DrawerContainer',
          state:{
            routes:[
              { name: 'Certificate' }
            ]
          }
        },
      ]
    });
  }

  const DetailList = () => {
    if(typeof(list.attributes) !== 'undefined'){
      // return to DetailList
      return (
        <View>
          <ListItem containerStyle={{backgroundColor:'#F4F4F4'}}>
            <ListItem.Content>
              <View style={styles.subtitleView}>
                <Text style={styles.key}>規則名稱</Text>
                <Text style={styles.value}>{list.ruleName}</Text>
              </View>
            </ListItem.Content>
          </ListItem>
          <RulesComponent list={list}></RulesComponent>
        </View>
      );
    }else{
      return null;
    }
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


const mapStateToProps = (state) => {  
  return {
      loginToken: state.loginToken,
  };
}

export default connect(mapStateToProps)(RuleDetail);