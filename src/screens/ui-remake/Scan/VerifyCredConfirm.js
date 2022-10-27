import React, {useEffect, useState} from 'react';

import { 
  View, 
  StyleSheet, 
  TouchableOpacity,
  Text,
  ImageBackground,
  ScrollView
} from 'react-native';
import CredListComponent from '../../../components/common/CredListComponent';
import {connect} from 'react-redux';
import { ListItem } from '@rneui/themed';
import { headline, content, themeColor } from '../../../styles/theme.style';

import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';


const VerifyCredConfirm = (props) => {

  const [credData, setCredData] = useState([{
      key:'test1111',
      value:'1111'
    }
  ]);
  
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


  const onReSelect = () => {
    props.navigation.goBack();
  }

  const onSend = () => {
    props.navigation.navigate('VerifyResult');

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
            <Text style={{width: 100, textAlign: 'center'}}>Attributes</Text>
          </View>
          <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <CredListComponent             
            data={credData} 
            navigation={props.navigation} 
            toPage={'CredentialDetail'}
            from={'CredentialList'}>
          </CredListComponent>
        </View>
      </View> 

      <View style={styles.body}>
        <ScrollView>
          <ListItem containerStyle={styles.listItem}>
            <ListItem.Content>
              <View style={styles.subtitleView}>
                <Text style={[content.Default, styles.key]}>Name</Text>
                <Text style={[content.DefaultBold, styles.value]}>Snowbridge Door License</Text>
              </View>
            </ListItem.Content>
          </ListItem>
          <ListItem containerStyle={styles.listItem}>
            <ListItem.Content>
              <View style={styles.subtitleView}>
                <Text style={[content.Default, styles.key]}>Issued Date</Text>
                <Text style={[content.DefaultBold, styles.value]}>2022/06/06 16:04:46</Text>
              </View>
            </ListItem.Content>
          </ListItem>
          <ListItem containerStyle={styles.listItem}>
            <ListItem.Content>
              <View style={styles.subtitleView}>
                <Text style={[content.Default, styles.key]}>Issued By</Text>
                <Text style={[content.DefaultBold, styles.value]}>Snowbridge Inc.</Text>
              </View>
            </ListItem.Content>
          </ListItem>
          <Divider/>
          <DetailList></DetailList>
        </ScrollView>
      </View>  
      <View style={styles.footer}>
        <TouchableOpacity style={styles.btn} onPress={onReSelect}>
          <Text style={[headline.Headline4, {color:'white'}]}>Re-Select</Text>
        </TouchableOpacity>          
        <TouchableOpacity style={styles.btn} onPress={onSend}>
          <LinearGradient  
            colors={['rgb(130,255,150)', 'rgb(124,255,255)']} 
            start= {{x: 0, y: 0}}
            end= {{ x: 1, y: 1 }}
            style={styles.btn} 
          >
            <Text style={[headline.Headline4, {color:'black'}]}>Send</Text>
          </LinearGradient>
        </TouchableOpacity>     
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:themeColor.DarkDarkOp8,
    padding:16
  },
  header:{
    flex:1,

    justifyContent: "center",
  },
  titleArea:{
    alignItems:'center',
    marginTop:32,
    marginBottom:10

  },  
  titleText: {
    color: 'white'
  },
  body:{
    flex:2,
    backgroundColor:'white',
    borderRadius:6,
    padding:16,
  },
  listItem:{
    margin: 12,
    marginBottom: 0,
    padding: 0,
  },
  detailListArea:{
    borderRadius:6,
    paddingBottom:16
  },
  footer:{
    flex:1,

    marginTop:32,
    alignItems:'center',
    justifyContent:'center',

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
    justifyContent:'space-between',
  },
  subtitleViewBtn:{
    flexDirection: 'row',
    justifyContent:'flex-end',
  },
  dividerArea:{
    height:30,
    marginTop:24,
    marginBottom:12
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
  listItemBtn:{
    flex:2,
    textAlign:'right',
    color:'rgb(45,128,147)'
  },
  footer:{
    height:125,
    justifyContent:'space-evenly',
    flexDirection:'row',
    alignItems:'center',
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

export default connect(mapStateToProps)(VerifyCredConfirm);