import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { 
  View, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity,
  Text
} from 'react-native';
import ListComponent from '../../components/common/ListComponent';
import AsyncStorage from "@react-native-async-storage/async-storage";

const CredentialListScreen = (props) => {
  const [text, setText] = useState('');
  const [displayType, setDisplayType] = useState('card');
  const [displayTypeIcon, setDisplayTypeIcon] = useState('reader');
  const [data, setData] = useState({test:1234});
  const [walletHandle , setWalletHandle] = useState('');
  const onChangeText = () => {
      
  }

  useEffect(() => {
    setWalletHandle(AsyncStorage.getItem(''));
  },[])

  const onClickDisplay = () => {
    console.log(displayType);
    if(displayType === 'card'){
      setDisplayType('list');
      setDisplayTypeIcon('ios-card-outline');

    }else{
      setDisplayType('card');
      setDisplayTypeIcon('reader');

    }
  }


  // render page
  return (
    <View style={styles.container}>
      <View style={styles.searchArea}>
        <Text style={styles.title}>憑證列表</Text>
        <View style={styles.displayBtn}>
          <TouchableOpacity
            style={styles.contentBtn}
            onPress={onClickDisplay}>
            <Ionicons name={displayTypeIcon} size={40} color='black'></Ionicons>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.listArea}>
        <ListComponent 
          data={data} 
          displayType={displayType} 
          navigation={props.navigation} 
          toPageType={'CredentialDetail'}
          from={props.route.params.from}
        > 
        </ListComponent>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  searchArea:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:'center',
    paddingHorizontal:20,
    backgroundColor:'white'
  },
  title:{
    flex:8,
    fontSize:30
  },

  displayBtn:{
    flex:1
  },
  listArea:{
    flex:7,
    backgroundColor:'white'
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
  }
  

});

export default CredentialListScreen;