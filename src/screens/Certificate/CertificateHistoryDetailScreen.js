import React, {useEffect, useState} from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity,
  ActivityIndicator, 
} from 'react-native';
  
import { ListItem} from '@rneui/themed'


const CertificateHistoryDetailScreen = (props) => {

  const [fromPage, setFromPage] = useState('VerifyCertificationScan');
  const [showLoading, setShowLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [status, setStatus] = useState('');

  let statusFromBackEnd = '查驗中';
  useEffect(()=>{
 

    setTimeout(()=>{
      setShowLoading(false);
    },
    500)
  },[]);

  useEffect(()=>{
    switch(statusFromBackEnd){
      case '查驗中':
        setStatus('查驗中');
        return;
      case '查驗成功':
        setStatus('查驗成功');
        return;

      case '查驗錯誤':
        setStatus('查驗錯誤');
        return;

      default:
        setStatus();
    }

  },[statusFromBackEnd]);

  // 先填假資料做畫面，實際資料串的方式在看後端怎麼給
  const list = {
    '查驗狀態': '查驗中',
    '憑證名稱': '門禁入內驗證用憑證',
    '被查驗時間': '2022/05/30 13:03:42',
    '查驗單位': '雪喬股份有限公司',
    '其他': '天熱請注意火燭',
  }

  const onVerify = () => {
    setModalVisible(!modalVisible);
  }

  const onVerifiedHistory = () => {
    setModalVisible(!modalVisible);
  }

  //Dialog control
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const modalClose = () => {
    // props.navigation.reset({
    //   index: 0,
    //   routes: [
    //     { name: 'TabContainer' },
    //     { name: 'CreateCredential'},
    //     { name: 'DefinitionList'},
    //     { 
    //       name: 'DefinitionDetail',
    //       params:{
    //         selectedSchema
    //       }
    //     }],
    // });
    setModalVisible(!modalVisible);
  }

  const DetailList = () => {
    let i = 0;
    const abc = Object.keys(list).map(function(keyName, keyIndex) {
      // use keyName to get current key's name
      // and a[keyName] to get its value

      return(
        <ListItem key={keyIndex} containerStyle={{backgroundColor:'#F4F4F4'}}>
          <ListItem.Content>
            <View style={styles.subtitleView}>
              <Text style={styles.key}>{keyName}</Text>
              {
                (status === '查驗中' && keyIndex === 0) ? (
                  <View>
                    <Text style={[styles.value,{color:'blue'}]}>{list[keyName]}</Text>
                    <Text>*查驗狀態每15秒重新更新</Text>
                  </View>
                )
                :
                (
                  <View>
                    <Text style={styles.value}>{list[keyName]}</Text>
                  </View>
                )
              }
              
            </View>
          </ListItem.Content>
        </ListItem>
      )
    })
    return abc;
  }
  
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
          <View style={styles.cardArea}>
            <View style={styles.card}>
              <View style={styles.dateArea}>
                <Text style={styles.dateText}>Issued 2022/05/30</Text>
              </View>
              <View style={styles.nameArea}>
                <Text style={styles.credentialName}>雪喬股份有限公司</Text>
              </View>                    
            </View>
          </View>
          <View style={styles.detailArea}>
            <ScrollView persistentScrollbar={true} >
              <DetailList></DetailList>
            </ScrollView>
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
  cardArea:{
    flex:2,
  },

  card:{
    height:150,
    margin:20,
    marginTop:0,
    backgroundColor:'#215cf3',
    paddingTop: 20,
    borderRadius:20,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2},
    shadowRadius: 10,
    elevation: 3,
  },
  dateArea:{
    backgroundColor:'#2196f3',
  },
  dateText:{
    height:20,
    color:'white',
    textAlign:'right',
    paddingRight:5

  },
  nameArea:{
    flex:1,
    width:200,
    justifyContent:'flex-end',
    paddingLeft:10,
    paddingBottom: 10
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
    textAlign:'right',
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
  modalContainer:{
    
  },
  modalYesBtn:{
    backgroundColor:'#2196f3',
    color:'white',
    borderRadius:10,
    width:150,
    height:30,
    padding:0,
  },
  modalCancelBtn:{
    backgroundColor:'#616161',
    color:'white',
    borderRadius:10,
    width:75,
    height:30,
    padding:0,
    marginLeft: 30
  },
  modalBtnText:{
    color:'white',
    fontWeight:'bold',
    fontSize:20
  }

});

export default CertificateHistoryDetailScreen;