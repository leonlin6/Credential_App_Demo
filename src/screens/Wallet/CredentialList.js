import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity,
  Text
} from 'react-native';
import ListComponent from '../../components/common/ListComponent';
import {connect} from 'react-redux';
import indy from 'indy-sdk-react-native';

const CredentialList = (props) => {
  const [displayType, setDisplayType] = useState('card');
  const [displayTypeIcon, setDisplayTypeIcon] = useState('reader');
  const [credData, setCredData] = useState([]);

  useEffect(() => {
    const getCredFromWallet = async () => {
      console.log('====getCredFromWallet====');
      console.log('---props.walletHandle---',props.walletHandle);

      let response = await indy.proverGetCredentials(props.walletHandle);
      setCredData(response);
      console.log('----setCredData----' , response);
    }

    getCredFromWallet();

  },[])

  const onClickDisplay = () => {
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
          data={credData} 
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

const mapStateToProps = (state) => {  
  return {
      walletHandle: state.walletHandle,
  };
}

export default connect(mapStateToProps)(CredentialList);