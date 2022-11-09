import React, {useEffect, useState} from 'react';
import { content, headline, themeColor } from '../../../styles/theme.style';

import { 
  View, 
  StyleSheet, 
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ListItem } from '@rneui/themed';
import {connect} from 'react-redux';
//api
import { ENDPOINT_BASE_URL } from '../../../APIs/APIs';
import axios from 'axios';
import indy from 'indy-sdk-react-native';


const VerifyRule = (props) => {
  let tempList = {};

  const [attributesData, setAttributesData] = useState([]);
  const [ruleName, setRuleName] = useState('');

  useEffect(() => {
    initializeRuleDetail();
  },[]);

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

    tempList.predicates.forEach((item) => {
      mergedAttribute.push({
        ...item,
        hasPredicate: true
      })
    })
    tempList['mergedAttribute'] = mergedAttribute;
  }


  const initializeRuleDetail = async () => {
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

    console.log('---response.data----',response.data);

    tempList['ruleName'] = response.data.name;
    handleAttributes(response.data.attributes[0].attributes);
    handlePredicates(response.data.predicates);
    mergeAttribute();
    console.log('---tempList----', tempList);

    setAttributesData(tempList.mergedAttribute);
    setRuleName(tempList.ruleName);
    
  }
  const onReScan = () => {
    props.navigation.goBack();
  }

  const onNext = () => {
    props.navigation.navigate({
      name:'SelectCredential',
      params:{
        verifyTemplate : props.route.params.verifyTemplate,
        mergedAttribute: attributesData
      }
    });

  }
  const DetailList = () => {
    const mergedList = attributesData.map((item, index) => {
      return(
        <ListItem 
          containerStyle={styles.listItem}
          linearGradientProps={{
            colors: ['rgba(124,255,255,0.1)', 'rgba(124,255,255,0.2)'],
            start: { x: 0, y: 1 },
            end: { x: 1, y: 1 },
          }}
          ViewComponent={LinearGradient}
          key={index}
        >
          <ListItem.Content>
            <View style={styles.subtitleView}>
              <Text style={[content.Default, styles.key]}>{item.name}</Text>
              {
                item.hasPredicate ? (
                  <Text style={[content.DefaultBold, styles.value]}>{item.type}{item.value}</Text>
                )
                :
                (
                  <Text style={[content.DefaultBold, styles.value]}>Any</Text>
                )
              }
            </View>
          </ListItem.Content>
        </ListItem>
      )
    })
    return (
      <LinearGradient  
        colors={['rgba(124,255,255,0.1)', 'rgba(124,255,255,0.2)']} 
        start= {{x: 0, y: 1}}
        end= {{ x: 1, y: 1 }}
        style={styles.detailListArea}>
      {mergedList}
      </LinearGradient>
    );
  }

  const Divider = () => {
    return (
      <View style={styles.dividerArea}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
          <View>
            <Text style={[headline.Headline5, {width: 200, textAlign: 'center', color:themeColor.DarkDark60 }]}>Attributes to be verified</Text>
          </View>
          <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        </View>
      </View>
    );
  }
  // render page
  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.body}>
        <ScrollView>
          <ListItem containerStyle={styles.listItem}>
            <ListItem.Content>
              <View style={styles.subtitleView}>
                <Text style={[content.Default, styles.key]}>Rule Name</Text>
                <Text style={[content.DefaultBold, styles.value]}>{ruleName}</Text>
              </View>
            </ListItem.Content>
          </ListItem>
          <Divider/>
          <DetailList></DetailList>
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.btn} onPress={onReScan}>
          <Text style={[headline.Headline4, {color:themeColor.SemanticHighlight}]}>Re-Scan</Text>
        </TouchableOpacity>          
        <TouchableOpacity style={styles.btn} onPress={onNext}>
          <LinearGradient  
            colors={['rgb(130,255,150)', 'rgb(124,255,255)']} 
            start= {{x: 0, y: 1}}
            end= {{ x: 1, y: 1 }}
            style={styles.btn} 
          >
            <Text style={[headline.Headline4, {color:'black'}]}>Next</Text>
          </LinearGradient>
        </TouchableOpacity>     
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  backgroundImage: {
    flex: 1,
  },
  header:{
    alignItems:'center',
    justifyContent: "center",
    backgroundColor:'rgb(242,250,250)',
    height:24
  },
  body:{
    flex:8,
    backgroundColor:'white',
    paddingTop: 24,
    paddingHorizontal:16,
  },
  listItem:{
    margin: 12,
    padding: 0,
  },
  infoArea:{
    width:345,
    padding:16,
    borderRadius:6,
    marginBottom:24
  },
  infoText:{

  },
  attributesArea:{
    alignItems:'center',
    marginTop:12

  },

  subtitleView: {
    justifyContent:'space-between',
    flexDirection: 'row',
  },  
  contentView: {
    flexDirection: 'row',
  },
  subtitleViewBtn:{
    flexDirection: 'row',
    justifyContent:'flex-end',
  },
  key:{
    flex:1,
    textAlign:'left',
    color:'rgb(123,128,139)'
  },
  value:{
    flex:2,
    textAlign:'right',
    color:'rgb(79,85,101)'
  },
  dividerArea:{
    height:30,
    marginTop:24,
    marginBottom:12
  },
  footer:{
    backgroundColor:'rgb(255,255,255)',
    height:90,
    justifyContent:'space-evenly',
    flexDirection:'row',
    alignItems:'center',
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.56,
    shadowOffset: { width: -4, height: -4},
    shadowRadius: 13,
    elevation: 15,
  },
  btn:{
    width:165,
    height:50,
    borderRadius:8,
    alignItems:'center',
    justifyContent:'center'
  },

});

const mapStateToProps = (state) => {  
  return {
    loginToken: state.loginToken,

  };
}

export default connect(mapStateToProps)(VerifyRule);