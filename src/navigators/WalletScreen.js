import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
} from 'react-native';
import InternetSetting from '../screens/Wallet/InternetSettingScreen'


const WalletScreen = (props) => {
  const puzzle_name = [
    '憑證列表','憑證被查驗紀錄','建立憑證'
  ]

  const onCredentialList = () => {
    props.navigation.navigate({
      name:'CredentialList',
      params:{
        from:'WalletScreen'
      }
    });
  }

  const onCredentialHistory = () => {
    props.navigation.navigate({
      name:'CredentialHistory',
      params:{
        from:'WalletScreen'
      }
    });
  }

  const onCreateCredential = () => {
    props.navigation.navigate('CreateCredential');
  }
  
  


  return (
    <View style={styles.container}>
      <View style={styles.puzzleTitle}>
        <Text style={styles.puzzleTitleText}>項目</Text>
      </View>
      <View style={styles.puzzleArea}>
        <View style={styles.puzzleContent}>
          <TouchableOpacity onPress={onCredentialList} style={styles.largePuzzle}>
            <Ionicons name='card' size={100} color='white'></Ionicons>
            <Text style={styles.largePuzzleText}>憑證列表</Text>
          </TouchableOpacity>
          <View onPress={onCredentialHistory} style={styles.smallPuzzleArea}>
            <TouchableOpacity onPress={onCredentialHistory} style={styles.smallPuzzle}>
              <Ionicons name='search' size={60} color='white'></Ionicons>
              <Text style={styles.smallPuzzleText}>憑證</Text>
              <Text style={styles.smallPuzzleText}>被查驗紀錄</Text>              
            </TouchableOpacity>
            <TouchableOpacity onPress={onCreateCredential} style={styles.smallPuzzle}>
              <Ionicons name='receipt' size={60} color='white'></Ionicons>
              <Text style={styles.smallPuzzleText}>建立憑證</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.iconArea}>
        <TouchableOpacity onPress={()=>{props.navigation.navigate('InternetSetting')}} style={styles.iconGroup}>
          <Ionicons style={styles.icon} name='ios-globe' size={40} ></Ionicons>
          <Text style={styles.iconText} >區塊鏈網路</Text>
        </TouchableOpacity>
        <View style={styles.iconGroup}>
          <Ionicons style={styles.icon} name='ios-globe' size={40} ></Ionicons>
          <Text style={styles.iconText} >區塊鏈網路</Text>
        </View>
        <View style={styles.iconGroup}>
          <Ionicons style={styles.icon} name='square' color='white' size={40} ></Ionicons>
          <Text style={styles.iconText} ></Text>
        </View>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'space-between'
  },
  puzzleArea:{
    flex:1,
  },
  puzzleTitleText:{
    fontSize:30,
    color:'black',
    marginTop:10,
    marginLeft:20
  },
  puzzleContent:{
    flex:1,
    padding: 5,
    flexDirection:'row'

  },
  largePuzzleArea:{

  },
  largePuzzle:{
    flex:1,
    width:100,
    height:290,
    backgroundColor:'#2196f3',
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 15,
    margin: 10,
    borderRadius:10,
    shadowColor: '#171717',
    shadowColor: 'black',
    shadowOpacity: 0.56,
    shadowOffset: { width: 0, height: 2},
    shadowRadius: 20,
    elevation: 5,
  },
  smallPuzzleArea:{
    justifyContent:'flex-start',

  },
  smallPuzzle:{
    justifyContent:'center',
    alignItems:'center',
    width:150,
    height:125,
    backgroundColor:'#2196f3',
    borderRadius: 15,
    margin: 15,
    padding: 5,
    borderRadius:10,
    shadowColor: '#171717',
    shadowColor: 'black',
    shadowOpacity: 0.56,
    shadowOffset: { width: 0, height: 2},
    shadowRadius: 20,
    elevation: 5,
  },
  largePuzzleText:{
    fontSize:25,
    color:'white',
    fontWeight:'bold'
  },
  smallPuzzleText:{
    fontSize:20,
    color:'white',
    fontWeight:'bold'

  },
  iconArea:{
    flex:1,
    flexWrap:'wrap',
    flexDirection:'row',
    justifyContent:'space-evenly',

    margin:20,
    borderRadius:10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2},
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: 'white'
  },
  iconGroup:{
    width: 100,
    marginRight:10,
    alignItems:'center',
  },
  icon:{
    marginTop:20,
    marginLeft:20,
    marginRight:20
  },
  iconText:{
    color:'black',
    fontSize:18,
    marginLeft:20,
    marginRight:20
  }
});

export default WalletScreen;