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
import CredListComponent from '../../../components/common/CredListComponent';
import LinearGradient from 'react-native-linear-gradient';
import { ListItem } from '@rneui/themed';
import {connect} from 'react-redux';
import indy from 'indy-sdk-react-native';

const VerifyRule = (props) => {
  const [isSelectRuleShow, setIsSelectRuleShow] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [attributesData, setAttributesData] = useState([{
    key:'Age',
    value:'20'
  },
  {
    key:'Gender',
    value:'MALE'
  },
  {
    key:'ID',
    value:'A123456789'
  },
  {
    key:'test1111',
    value:'1111'
  },
  {
    key:'test1111',
    value:'1111'
  },
  {
    key:'test1111',
    value:'1111'
  },
  {
    key:'test1111',
    value:'1111'
  },
  {
    key:'test1111',
    value:'1111'
  },
  {
    key:'test1111',
    value:'1111'
  },
  {
    key:'test1111',
    value:'1111'
  },
  {
    key:'test1111',
    value:'1111'
  },
  {
    key:'test1111',
    value:'1111'
  }
]);


  const onReScan = () => {
    props.navigation.goBack();
  }

  const onNext = () => {
    props.navigation.navigate('SelectCredential');

  }
  const DetailList = () => {
    const mergedList = attributesData.map((item) => {
      return(
        <ListItem 
          containerStyle={styles.listItem}
          linearGradientProps={{
            colors: ['rgba(124,255,255,0.1)', 'rgba(124,255,255,0.2)'],
            start: { x: 0, y: 1 },
            end: { x: 1, y: 1 },
          }}
          ViewComponent={LinearGradient}
        >
          <ListItem.Content>
            <View style={styles.subtitleView}>
              <Text style={[content.Default, styles.key]}>{item.key}</Text>
              <Text style={[content.DefaultBold, styles.value]}>{item.value}</Text>
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
            <Text style={[headline.Headline5, {width: 200, textAlign: 'center', color:themeColor.Dark60 }]}>Attributes to be verified</Text>
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
                <Text style={[content.DefaultBold, styles.value]}>Snowbridge Door License</Text>
              </View>
            </ListItem.Content>
          </ListItem>
          <ListItem containerStyle={styles.listItem}>
            <ListItem.Content>
              <View style={styles.subtitleView}>
                <Text style={[content.Default, styles.key]}>Verified By</Text>
                <Text style={[content.DefaultBold, styles.value]}>Snowbridge Inc.</Text>
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
      walletHandle: state.walletHandle,
  };
}

export default connect(mapStateToProps)(VerifyRule);