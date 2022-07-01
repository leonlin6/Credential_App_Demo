import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity,
  Dimensions,
  Linking,
  Button
} from 'react-native';
import ListComponent from '../../components/utils/ListComponent';

const CredentialHistoryScreen = (props) => {
  const [text, setText] = useState('');
  const [data, setData] = useState({test:1234});

  const onChangeText = () => {
      
  }


  // render page
  return (
    <View style={styles.container}>
      <View style={styles.searchArea}>
        <View style={styles.inputWrap}>
          <Ionicons name="search" size={30} color='black'></Ionicons>
          <TextInput
            style={styles.searchInput}
            onChangeText={onChangeText}
            placeholder="please enter credential name"
          />
        </View>
      </View>
      <View style={styles.listArea}>
        <ListComponent 
          data={data} 
          displayType={'list'} 
          navigation={props.navigation} 
          toPageType={'CredentialHistoryDetail'}
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
    justifyContent:'center',
    alignItems:'center',
  },
  inputWrap:{
    flex:8,
    borderRadius:30,
    flexDirection:'row',
    borderWidth:1,
    marginHorizontal:15,
    paddingLeft:5,
    paddingTop:3,
    height:40
  },
  searchIcon:{
    flex:2
  },
  searchInput:{
    paddingVertical: 0 ,
    height:30,
    fontSize:18

  },
  displayBtn:{
    flex:1
  },
  listArea:{
    flex:7,

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

export default CredentialHistoryScreen;