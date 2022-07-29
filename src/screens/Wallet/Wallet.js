import React, {useState, useRef, useCallback} from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity,
  Text,
  Dimensions,
  Button,
  SafeAreaView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import LoginData from '../APIs/LoginData';
import transactions_local_genesis from '../../config/transactions_local_genesis'
import Ionicons from 'react-native-vector-icons/Ionicons';



const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const Wallet = (props) => {

  const [showDrawerMenu, setShowDrawerMenu] = useState(false);
 
  const onScanPress = () => {
      props.navigation.navigate('Scan');
  }

  const onCredentilaListPress = () => {
    props.navigation.navigate({
      name:'CredentialList',
      params:{
        from:'Wallet'
      }
    });
  }

  const onMenuPress = () => {
    if(showDrawerMenu === true)
      props.navigation.closeDrawer();
    else
      props.navigation.openDrawer();
  }

  return (
    <View style={styles.container} >
      <View style={styles.menuArea}>
        <View style={styles.menu}>
          <TouchableOpacity style={styles.image} onPress={onMenuPress}>
            <Ionicons name='menu' size={50}></Ionicons>
          </TouchableOpacity>
        </View> 
      </View>
      <View style={styles.scanArea}>
        <TouchableOpacity style={styles.image}  onPress={onScanPress}>
            <Ionicons name='ios-scan-sharp' color='white' size={200} ></Ionicons>
            <Text style={styles.imageText}>掃描</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.walletArea}>
        <TouchableOpacity style={styles.image} onPress={onCredentilaListPress}>
            <Ionicons name='wallet-outline' color='white' size={200} ></Ionicons>
            <Text style={styles.imageText}>我的錢包</Text>
        </TouchableOpacity>
      </View>
    </View>
  );






}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    fontSize: 25,
    justifyContent:'center',
  },
  menuArea:{
    flex:1,
  },
  buttonArea:{
    flex:9
  },
  menu:{
    position:'absolute',
    top:10,
    left:10
  },
  image:{

  },
  imageText:{
    fontSize:35,
    color:'white',
    textAlign:'center',
    fontFamily:'Iansui094-Regular'
  },
  scanArea:{
    backgroundColor:'#03a9f4',
    justifyContent:'center',
    flexDirection:'column',
    alignItems:'center',
    alignSelf: 'stretch', 
    height:300,
    height:(SCREEN_HEIGHT * 0.45) - 10,
  },
  walletArea:{
    backgroundColor:'#eebb70',
    justifyContent:'center',
    flexDirection:'column',
    alignItems:'center',
    alignSelf: 'stretch', 
    height:SCREEN_HEIGHT * 0.45
  },

});


export default Wallet;