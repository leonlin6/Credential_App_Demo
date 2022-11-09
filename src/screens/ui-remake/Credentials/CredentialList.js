import React, {useEffect, useState} from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity,
  Text,
  ImageBackground
} from 'react-native';
import indy from 'indy-sdk-react-native';
import { useFocusEffect } from '@react-navigation/native';

import { headline } from '../../../styles/theme.style';

//icon
import HistoryWhiteIcon from '../../../assets/icons/SVG/HistoryWhite.svg';
import SettingWhiteIcon from '../../../assets/icons/SVG/SettingWhite.svg';

//components
import CredListComponent from '../../../components/common/CredListComponent';

//redux
import {connect} from 'react-redux';


const CredentialList = (props) => {
  const [credData, setCredData] = useState([]);
  const defaultData =    [{
    "attrs":
    {
        "地址": "新北市汐止區東勢街",
        "所得終止時間": "20211231",
        "所得總額": "500000",
        "所得起始時間": "20210101",
        "扶養人親屬": "無",
        "扶養人身分證統一編號": "無",
        "本人身分證統一編號": "L1234567890",
        "核發單位": "北區國稅局",
        "納稅總額": "30000",
        "納稅義務人": "周頌鈞",
        "編號": "100000001",
        "配偶姓名": "張 OO",
        "配偶身分證統一編號": "A1234567890"
    },
    "cred_def_id": "E4BDfu4km5x7ni8P8gzbn2:3:CL:12:tax-cert-test01",
    "cred_rev_id": null,
    "referent": "635fa0a15a0fbaac8eb64923",
    "rev_reg_id": null,
    "schema_id": ""
  }]

  // useEffect(() => {
  //   const getCredFromWallet = async () => {
  //     const response = await indy.proverGetCredentials(props.walletHandle);
  //     setCredData(response);
  //   }

  //   getCredFromWallet();

  // },[])


  //when screen blur, clear the interval
  useFocusEffect(
    
    React.useCallback(() => {
      const getCredFromWallet = async () => {
        const response = await indy.proverGetCredentials(props.walletHandle);
        console.log('getCredFromWallet',response);
        setCredData(response);
      }
      getCredFromWallet();

      console.log('Screen was focused');

      return () => {

        console.log('Screen was unfocused');

      };
    }, [])
  );


  const onSetting = () => {

  }
  
  const onHistory = () => {
    props.navigation.navigate('CredentialHistory');
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
              displayType={'card' }
              navigation={props.navigation} 
              toPage={'CredentialDetail'}
              from={'CredentialList'}
            > 
            </CredListComponent>
          </View>
        <View style={styles.bottomSpace}></View>

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
  },
  bottomSpace:{
    height:90
  }
});

const mapStateToProps = (state) => {  
  return {
      walletHandle: state.walletHandle,
      isFirstLogin: state.isFirstLogin
  };
}

export default connect(mapStateToProps)(CredentialList);