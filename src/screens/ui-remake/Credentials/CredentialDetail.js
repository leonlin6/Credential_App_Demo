import React, {useEffect, useState} from 'react';

import { 
  View, 
  StyleSheet, 
  TouchableOpacity,
  Text,
  ImageBackground,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import CredListComponent from '../../../components/common/CredListComponent';
import {connect} from 'react-redux';
import { ListItem } from '@rneui/themed';
import { headline, content } from '../../../styles/theme.style';

import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';


const CredentialDetail = (props) => {
  const [list, setList] = useState();
  const [showLoading, setShowLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [issuedDate, setIssuedDate] = useState('');

  const [cardData, setCardData] = useState([{
    "attrs": {
      "Age": "12", 
      "Name": "Leon", 
      "Sex": "Male", 
      "TimeStamp": "202211091021", 
      "Title": "TimeStampTest"
    }, 
    "cred_def_id": "E4BDfu4km5x7ni8P8gzbn2:3:CL:187:leontest1109-2", 
    "cred_rev_id": null, 
    "referent": "636b0e80b466ea8c3ccb4bf4", 
    "rev_reg_id": null, 
    "schema_id": "E4BDfu4km5x7ni8P8gzbn2:2:leontest1109-2:0.0.1"
  }
  ]);
  
  useEffect(() => {
    console.log('====props.route.params.from===', props.route.params.from);

    if (props.route.params.from === 'CredentialList'){
      console.log('----props.route.params.credData----',props.route.params.credData);
      setTitle(props.route.params.credData.attrs.Title);
      setIssuedDate(getParsedTimeStamp(props.route.params.credData.attrs.TimeStamp) );

      handleCredData(props.route.params.credData);
    } else if (props.route.params.from === 'GetCredential'){
      handleGetCredData(props.route.params.mergedDetailData);
    }

    setTimeout(() => {
      setShowLoading(false);
    }, 500);
  }, []);

  const getParsedTimeStamp = (text) => {
    const year = text.slice(0,4);
    const month = text.slice(4,6);
    const day = text.slice(6,8);
    const hour = text.slice(8,10);
    let minute = text.slice(10,12);


    return `${year}/${month}/${day}  ${hour}:${minute}`;
  }
 
  //處理Get Cred處理過後的array cred資料
  const handleGetCredData = (data) => {
    const temp = data.map((item) => {
      return {
        key:item.key,
        value:item.value
      }
    })
    console.log('---temp---', temp);
    setList(temp);
  }


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

  const onCloseDetail = () => {
    props.navigation.goBack();
  }

  const onVerifyHistory = () => {

  }

  const DetailList = () => {
    const mergedList = list.map((item, index) => {
      return(
        <ListItem 
          containerStyle={styles.listItem}
          linearGradientProps={{
            colors: ['rgba(124,255,255,0.1)', 'rgba(124,255,255,0.2)'],
            start: { x: 0, y: 1 },
            end: { x: 1, y: 1 },
          }}
          ViewComponent={LinearGradient}
          key={`list${index}`}
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

  if(showLoading){
    return(
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" />
      </View> 
    )
  }
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../../assets/background/BG1.png')} resizeMode="cover" style={styles.backgroundImage}>
        <View style={styles.header}>
          <CredListComponent             
            data={cardData} 
            navigation={props.navigation} 
            toPage={'CredentialDetail'}
            from={'CredentialList'}>
          </CredListComponent>
        </View> 
        <View style={styles.body}>
          <ScrollView>
            <ListItem containerStyle={styles.listItem}>
              <ListItem.Content>
                <View style={styles.subtitleView}>
                  <Text style={[content.Default, styles.key]}>Title</Text>
                  <Text style={[content.DefaultBold, styles.value]}>{title}</Text>
                </View>
              </ListItem.Content>
            </ListItem>
            <ListItem containerStyle={styles.listItem}>
              <ListItem.Content>
                <View style={styles.subtitleView}>
                  <Text style={[content.Default, styles.key]}>Issued Date</Text>
                  <Text style={[content.DefaultBold, styles.value]}>{issuedDate}</Text>
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
            <ListItem containerStyle={styles.listItem}>
              <ListItem.Content>
                {/* <TouchableOpacity style={styles.subtitleViewBtn} onPress={()=>{onVerifyHistory()}}>
                  <Text style={[headline.Headline4, styles.listItemBtn]}>Verify History</Text>
                  <Ionicons name='chevron-forward' size={24} color='rgb(45,128,147)' />
                </TouchableOpacity> */}
              </ListItem.Content>
            </ListItem>
            <Divider/>
            <DetailList></DetailList>
          </ScrollView>
        </View>  
        <View style={styles.footer}>
          <TouchableOpacity onPress={()=>{onCloseDetail()}}>
            <View style={styles.closeBtn}>
              <Ionicons name='close' size={20} color='#82ff96' />
              <Text style={[headline.Headline3, {color:'#82ff96'}]}>Close</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}



const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    padding:16
  },
  header:{

  },
  body:{
    height: 440,
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
  closeBtn:{
    width:104,
    height:43,
    backgroundColor:'rgba(79,85,101,0.5)',
    borderRadius:8,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row'
  },

});

const mapStateToProps = (state) => {  
  return {
      walletHandle: state.walletHandle,
  };
}

export default connect(mapStateToProps)(CredentialDetail);