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
import AsyncStorage from '@react-native-async-storage/async-storage';



const CredentialDetailCheck = (props) => {

  const [fromPage, setFromPage] = useState('VerifyCertificationScan');
  const [showLoading, setShowLoading] = useState(true);
  const [mergedDetailData, setMergedDetailData] = useState();

  let detailData = {
    '憑證名稱': '雪喬公司大門通行證',
    '發證時間': '2022/04/06 16:02:25',
    '發證單位': 'Snowbridge',
   }
  
  useEffect(()=>{

    setTimeout(()=>{
      setShowLoading(false);
    },
    500)
  },[]);


  useEffect(()=>{
    parseDetailData();
  },[]);


  const parseDetailData = async () => {
    try{
      console.log('parm', props.route.params);


      const result = Object.keys(props.route.params).map((item, index) => {
        let attribute = 'Attribute' + (index+1);
        detailData = {
          ...detailData,
          [item]:props.route.params[item]
        }
      })
      setMergedDetailData(detailData);
      const arrayData = [];
      arrayData.push(detailData);
      // await AsyncStorage.setItem('detailData',arrayData.toString());
      await AsyncStorage.removeItem('detailData');

      try{
        await AsyncStorage.setItem('detailData', JSON.stringify(detailData));
      } 
      catch(error){
        console.log(error);
      }
    }
    catch(error){
    }
  }


  const onGetCredential = () => {
    props.navigation.navigate({
      name:'Loading',
      params:{
        loadingStatusText : ['正在等待建立憑證', '正在等待憑證發送','已成功將憑證存至錢包中'],
        from:'GetCredential',
        toPage:'CredentialDetail'
      }
    });
  }


  const DetailList = () => {
    let i = 0;
    const abc = Object.keys(mergedDetailData).map(function(keyName, keyIndex) {
      // use keyName to get current key's name
      // and a[keyName] to get its value

      return(
        <ListItem key={keyIndex} containerStyle={{backgroundColor:'#F4F4F4'}}>
          <ListItem.Content>
            <View style={styles.subtitleView}>
              <Text style={styles.key}>{keyName}</Text>
              <Text style={styles.value}>{mergedDetailData[keyName]}</Text>
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
            <TouchableOpacity onPress={onGetCredential} style={styles.btn}>
                <Ionicons name='ios-archive-outline' size={60} ></Ionicons>
                <Text>領取此憑證</Text>
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
  btn:{
    justifyContent:'center',
    alignItems:'center',
  }
});

export default CredentialDetailCheck;