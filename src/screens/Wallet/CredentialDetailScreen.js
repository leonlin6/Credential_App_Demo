import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity,
  ActivityIndicator, 
  Image,
} from 'react-native';
  
import { ListItem, Dialog} from '@rneui/themed'
import { Button} from '@rneui/base'


import {Colors} from '../../components/common/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';


const CredentialDetailScreen = (props) => {

  const [fromPage, setFromPage] = useState('VerifyCertificationScan');
  const [showLoading, setShowLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [list , setList] = useState();

  useEffect(()=>{
    console.log(props.route.params.from);
    if(props.route.params.from !== undefined)
      setFromPage(props.route.params.from);

    setTimeout(()=>{
      setShowLoading(false);
    },
    500)
  },[]);



  useEffect(() => {
    const getData = async () => {
        const data = await AsyncStorage.getItem('detailData');
        const itemParse = JSON.parse(data);
        setList(itemParse);
    }
    getData();
  },[]);


  // const list = {
  //   '憑證名稱': '雪橋公司大門通行證',
  //   '發證時間': '2022/04/06 16:02:25',
  //   '發證單位': 'Snowbridge',
  //   'Attribute1': 'Age:20',
  //   'Attribute2': 'Country:Taiwan',
  //   'Attribute3': 'ID:A123456789',
  //   'Attribute4': 'Name:Leon',

  // }

  const onVerify = () => {
    setModalVisible(!modalVisible);
  }

  const onVerifiedHistory = () => {
    // setModalVisible(!modalVisible);
  }

  const onModalConfirm =() => {
    setModalVisible(!modalVisible);
    props.navigation.navigate({
      name:'Loading',
      params:{
        loadingStatusText : ['正在驗證憑證', '憑證驗證完成','正在返回首頁'],
        from:'SelectCredential',
        toPage:'Wallet'
      }
    });
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
  
  const VerifyModal = () => {
    return(
      <Dialog
        isVisible={modalVisible}
        onBackdropPress={toggleModal}
        overlayStyle={{height:200,width:300, justifyContent:'space-around' , paddingHorizontal:20,paddingBottom:0}}>
        <View>
          <Dialog.Title title="請確認是否選擇此憑證做查驗？"/>
        </View>
        <Dialog.Actions>
          <Button               
            titleStyle={styles.modalBtnText} 
            buttonStyle={styles.modalCancelBtn} 
            title="取消" 
            onPress={modalClose} />
          <Button               
            titleStyle={styles.modalBtnText} 
            buttonStyle={styles.modalYesBtn} 
            title="確認" 
            onPress={onModalConfirm} />
        </Dialog.Actions>
      </Dialog> 
    )
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
              <Text style={styles.value}>{list[keyName]}</Text>
            </View>
          </ListItem.Content>
        </ListItem>
      )
    })
    return abc;
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
        <View style={styles.imageArea}>
            <Image style={styles.image} resizeMode={'contain'} source={require('../../assets/images/logo.png')}></Image>
          </View>
          <View style={styles.detailArea}>
            <ScrollView persistentScrollbar={true} >
              <DetailList></DetailList>
            </ScrollView>
          </View>
          <View style={styles.buttonArea}>
            {
              fromPage === 'CertificateCredential' ? (
                <TouchableOpacity onPress={onVerify} style={styles.btn}>
                  <Ionicons name='md-checkmark' size={60} color={Colors.successGreen}></Ionicons>
                  <Text>查驗此憑證</Text>
                </TouchableOpacity>
              )
              :
              (
                <TouchableOpacity onPress={onVerifiedHistory} style={styles.btn}>
                  <Ionicons name='library' size={60} color='black'></Ionicons>
                  <Text>憑證被查驗</Text>
                  <Text>歷程紀錄</Text>
                </TouchableOpacity>
              )
            }
          </View>
        </View>
      )
    }
    <VerifyModal></VerifyModal>
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

export default CredentialDetailScreen;