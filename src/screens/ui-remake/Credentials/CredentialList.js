import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { headline } from '../../../styles/theme.style';
import HistoryWhiteIcon from '../../../assets/icons/SVG/HistoryWhite.svg';
import SettingWhiteIcon from '../../../assets/icons/SVG/SettingWhite.svg';

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
  const [credData, setCredData] = useState([]);

  useEffect(() => {
    const getCredFromWallet = async () => {
      console.log('====getCredFromWallet====');
      console.log('---props.walletHandle---',props.walletHandle);

      //不是第一次執行再去取wallet中的cred
      if(!props.isFirstLogin){
        console.log('----setCredData----' , response);
        console.log('====not FirstLogin====' , props.isFirstLogin);
 
        const response = await indy.proverGetCredentials(props.walletHandle);
        setCredData(response);
      }else{
        console.log('====is first login====' , props.isFirstLogin);
        setCredData([]);
      }


    }
    console.log('props.isFirstLogin======',props.isFirstLogin);


    getCredFromWallet();

  },[])

  const onSetting = () => {

  }
  const onHistory = () => {

  }

  // render page
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../../assets/background/BG1.png')} resizeMode="cover" style={styles.backgroundImage}>
        <View style={styles.headerArea}>
          <View style={styles.headlineArea}>
            <Text style={[headline.Headline1, styles.titleText]}>CREDENTIAL</Text>
          </View>
          <View style={styles.btnArea}>
            <TouchableOpacity
              style={styles.btn}
              onPress={onSetting}>
              <SettingWhiteIcon></SettingWhiteIcon>
            </TouchableOpacity>          
            <TouchableOpacity
              style={styles.btn}
              onPress={onHistory}>
              <HistoryWhiteIcon ></HistoryWhiteIcon>
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
  titleText:{
    color:'white'
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
      isFirstLogin: state.isFirstLogin
  };
}

export default connect(mapStateToProps)(CredentialList);