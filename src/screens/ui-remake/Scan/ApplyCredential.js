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

const ApplyCredential = (props) => {
  const [isSelectRuleShow, setIsSelectRuleShow] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState();

  const [attributesData, setAttributesData] = useState([{
    key:'Email',
  },
  {
    key:'Mobile',
  },
  {
    key:'ID',
  },
  {
    key:'test1111',
  },
  {
    key:'test1111',
  },
  {
    key:'test1111',
  },
  {
    key:'test1111',
  },
]);

  const FormList = () => {
    const mergedList = attributesData.map((item) => {
      return(
        <ListItem containerStyle={styles.listItem} >
          <ListItem.Content>
            <View style={styles.subtitleView}>
              <Text style={[headline.Headline4, {color:themeColor.DarkDark}]}>{item.key}</Text>
            </View>           
            <View style={styles.contenView}>
              <TextInput style={styles.input}></TextInput>
            </View>
          </ListItem.Content>
        </ListItem>
      )
    })

    return mergedList;
  }

  const onReScan = () => {
    props.navigation.goBack();
  }

  const onNext = () => {
    props.navigation.navigate('ApplyCredConfirm');

  }

  // render page
  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.body}>
        <ScrollView>
          <LinearGradient  
            colors={['rgba(124,255,255,0.1)', 'rgba(124,255,255,0.2)']} 
            start= {{x: 0, y: 1}}
            end= {{ x: 1, y: 1 }}
            style={styles.infoArea}
          >
            <Text style={[content.Small, {color:themeColor.Dark60}]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
          </LinearGradient>
          <ListItem containerStyle={styles.listItem} >
            <ListItem.Content>
              <View style={styles.subtitleView}>
                <Text style={[headline.Headline4, {color:themeColor.DarkDark}]}>Title</Text>
              </View>           
              <View style={styles.contenView}>
              <Text style={[content.Default, {color:themeColor.DarkDark}]}>Employee ID card</Text>
              </View>
            </ListItem.Content>
          </ListItem>
          <ListItem containerStyle={styles.listItem} >
            <ListItem.Content>
              <View style={styles.subtitleView}>
                <Text style={[headline.Headline4, {color:themeColor.DarkDark}]}>Issued By</Text>
              </View>           
              <View style={styles.contenView}>
              <Text style={[content.Default, {color:themeColor.DarkDark}]}>Snowbridge Inc.</Text>
              </View>
            </ListItem.Content>
          </ListItem>
          <FormList></FormList>
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
    alignItems:'center'
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
    marginTop:8,
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

});

const mapStateToProps = (state) => {  
  return {
      walletHandle: state.walletHandle,
  };
}

export default connect(mapStateToProps)(ApplyCredential);