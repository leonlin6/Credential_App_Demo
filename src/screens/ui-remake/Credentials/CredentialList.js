import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { headline } from '../../../styles/theme.style';
import HistoryIcon from '../../../assets/icons/SVG/History.svg';
import SettingIcon from '../../../assets/icons/SVG/Setting.svg';

import { 
  View, 
  StyleSheet, 
  TouchableOpacity,
  Text,
  ImageBackground
} from 'react-native';
import CredListComponent from '../../../components/common/CredListComponent';
import {connect} from 'react-redux';
import indy from 'indy-sdk-react-native';
import { themeSpacing } from '@rneui/themed/dist/config/ThemeProvider';

const CredentialList = (props) => {
  const [displayType, setDisplayType] = useState('card');
  const [displayTypeIcon, setDisplayTypeIcon] = useState('reader');
  const [credData, setCredData] = useState([{
    cred_def_id:'test1111'
  },
  {
    cred_def_id:'test22222'
  },
  {
    cred_def_id:'test3333'
  },
]);

  useEffect(() => {
    const getCredFromWallet = async () => {
      console.log('====getCredFromWallet====');
      console.log('---props.walletHandle---',props.walletHandle);

      let response = await indy.proverGetCredentials(props.walletHandle);
      setCredData(response);
      console.log('----setCredData----' , response);
    }

    // getCredFromWallet();

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
      <ImageBackground source={require('../../../assets/background/BG1.png')} resizeMode="cover" style={styles.backgroundImage}>
        <View style={styles.headerArea}>
          <View style={styles.headlineArea}>
            <Text style={headline.Headline1}>CREDENTIAL</Text>
          </View>
          <View style={styles.btnArea}>
            <TouchableOpacity
              style={styles.btn}
              onPress={onClickDisplay}>
              <SettingIcon></SettingIcon>
            </TouchableOpacity>          
            <TouchableOpacity
              style={styles.btn}
              onPress={onClickDisplay}>
              <HistoryIcon ></HistoryIcon>
            </TouchableOpacity>            
          </View>
        </View>
        <View style={styles.listArea}>
          <CredListComponent 
            data={credData} 
            displayType={displayType} 
            navigation={props.navigation} 
            toPage={'CredentialDetail'}
            from={'CredentialList'}
          > 
          </CredListComponent>
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
    justifyContent: "center"
  },

  headerArea:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
  },
  headlineArea:{
    flex:4,
    paddingLeft:16
  },
  btnArea:{
    flex:1,
    flexDirection:'row',
    paddingRight:16
  },
  btn:{
    marginRight:12
  },
  listArea:{
    flex:7,
    margin:16

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