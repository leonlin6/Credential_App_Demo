

import React, {useState} from 'react';
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


const CertificateScreen = (props) => {

  const onScanPress = () => {
    props.navigation.navigate('Scan');
  }
  
  const onQRCodePress = () => {
    props.navigation.navigate('CreateQR');
  }

  const onCertificateHistory = () => {
    props.navigation.navigate({
      name:'CertificateHistory',
      params:{
        from:'CertificateScreen'
      }
    });
  }
  return (
    <View style={styles.container}>
      <View style={styles.cardAreaOdd}>
        <View style={styles.imageArea}>
          <Ionicons name="qr-code-outline" size={100} color='black'></Ionicons>
        </View>
        <View style={styles.contentArea}>
          <Text style={styles.contentText}>建立QR Code及規則以查驗他人執照</Text>
          <TouchableOpacity
            style={styles.contentBtn}
            onPress={onQRCodePress}>
            <Ionicons name="qr-code-outline" size={30} color='white'></Ionicons>
            <Text style={styles.btnText}>QR Code</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.cardAreaEven}>
        <View style={styles.contentArea}>
          <Text style={styles.contentText}>掃描QR Code以查驗所持有的執照</Text>
          <TouchableOpacity
            style={styles.contentBtn}
            onPress={onScanPress}>
            <Ionicons name="scan-outline" size={30} color='white'></Ionicons>
            <Text style={styles.btnText}>Scan</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.imageArea}>
          <Image 
            style={styles.cardImage}
            source={require('../../assets/images/certificate_scan_image.png')}
          ></Image>
        </View>
      </View>
      <View style={styles.cardAreaOdd}>
        <View style={styles.imageArea}>
          <Image 
            style={styles.cardImage}
            source={require('../../assets/images/certificate_history_image.png')}
          ></Image>
        </View>
        <View style={styles.contentArea}>
          <Text style={styles.contentText}>查看查驗歷程紀錄</Text>
          <TouchableOpacity
            onPress={onCertificateHistory}
            style={styles.contentBtn}>
            <Ionicons name="book-outline" size={30} color='white'></Ionicons>
            <Text style={styles.btnText}>History</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'flex-start',
  },
  cardAreaOdd:{
    margin:30,
    height:150,
    flexDirection:'row',
    borderRadius:10,
    shadowColor: '#171717',
    shadowOpacity: 0.56,
    shadowOffset: { width: 0, height: 2},
    shadowRadius: 20,
    elevation: 5,
    backgroundColor: 'white'
  },
  cardAreaEven:{
    marginHorizontal:30,
    height:150,

    flexDirection:'row',
    borderRadius:10,
    shadowColor: '#171717',
    shadowColor: 'black',
    shadowOpacity: 0.56,
    shadowOffset: { width: 0, height: 2},
    shadowRadius: 20,
    elevation: 5,
    backgroundColor: 'white'
  },
  imageArea:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
    
  },
  cardImage:{
    height:125,
    width:100
  },
  contentArea:{
    flex:2,
    flexDirection:'column',


  },
  contentText:{
    flex:2,
    margin:15,
    fontSize:20
  },
  contentBtn:{
    backgroundColor:'#2196f3',
    borderRadius: 20,
    width:150,
    alignItems:'center',    
    justifyContent:'center',
    marginBottom:15,
    marginHorizontal:35,
    flexDirection:'row',
    paddingVertical:5,
  },
  btnText:{
    color:'white',
    marginLeft:15,
    fontWeight:'bold',
    fontSize: 20
  }


});

export default CertificateScreen;