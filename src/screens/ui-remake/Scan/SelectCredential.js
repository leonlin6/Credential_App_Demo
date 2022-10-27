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

const SelectCredential = (props) => {
  const [isSelectRuleShow, setIsSelectRuleShow] = useState(false);
  const [displayType, setDisplayType] = useState('card');
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [credData, setCredData] = useState([{
    cred_def_id:'test1111'
  },
  {
    cred_def_id:'test22222'
  },
  {
    cred_def_id:'test3333'
  },
  {
    cred_def_id:'test22222'
  },
  {
    cred_def_id:'test22222'
  },
  {
    cred_def_id:'test22222'
  },
]);




  const onReScan = () => {
    props.navigation.goBack();
  }

  const onNext = () => {
    props.navigation.navigate('VerifyCredConfirm');

  }

  // render page
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.listArea}>
          <CredListComponent 
            data={credData} 
            displayType={displayType} 
            navigation={props.navigation} 
            toPage={'VerifyCredConfirm'}
            from={'SelectCredential'}
          > 
          </CredListComponent>
        </View>
      </View>
      {/* <View style={styles.footer}>
        <TouchableOpacity style={styles.btn} onPress={onReScan}>
          <Text style={[headline.Headline4, {color:themeColor.SemanticHighlight}]}>View Rule</Text>
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
      </View> */}
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
    backgroundColor:'rgb(242,250,250)',
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
  listItem:{
    padding: 0,
    backgroundColor:'white',
    marginBottom:24
  },
  subtitleView: {
    flexDirection: 'row',
    marginBottom:8

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
  },
  value:{
    flex:2,
    textAlign:'right',
  },
  input: {
    height: 40,
    marginVertical:8,
    borderRadius:8,
    width:345,
    backgroundColor:'rgb(246,247,247)'
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
  listArea:{
    flex:7,
    margin:16,
    paddingTop:12

  },
});

const mapStateToProps = (state) => {  
  return {
      walletHandle: state.walletHandle,
  };
}

export default connect(mapStateToProps)(SelectCredential);