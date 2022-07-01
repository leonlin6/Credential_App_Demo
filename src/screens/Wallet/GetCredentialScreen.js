
// import React, {useState, useEffect} from 'react';
// import { 
//   View, 
//   StyleSheet, 
//   Dimensions,
//   ActivityIndicator
// } from 'react-native';
// import QRCodeScanner from 'react-native-qrcode-scanner';
// import { RNCamera } from 'react-native-camera';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { Dialog,} from '@rneui/themed'


// const GetCredentialScreen = (props) => {
//   const SCREEN_HEIGHT = Dimensions.get("window").height;
//   const SCREEN_WIDTH = Dimensions.get("window").width;

//   const [QRCode, setQRCode] = useState('nothing QR now');
//   const [modalVisible, setModalVisible] = useState(false);
//   const [showLoading, setShowLoading] = useState(false);

//   const loadingStatusText = ['正在等待建立憑證','正在等待憑證發送','已成功將憑證存至錢包中']

//   const onSuccessLoad = (e) => {
//     setModalVisible(true);
//     // navigation.reset({
//     //   index: 0,
//     //   routes: [
//     //     { name: 'TabContainer' },
//     //     { name: 'CredentialList', 
//     //       params:{
//     //         from:'VerifyCertificationScan'
//     //       },
//     //     }
//     //   ],
//     // });
//   }


//   const onPressShowRoute = () => {
//     console.log(props.route.params);
//   }
//   const onRead = (e) => {
//     setQRCode(e.data);
//     console.log('e= ', e);
//   }

//   // const backButton = () => {
//   //   navigation.goBack();
//   // }

//   //Dialog control
//   const toggleModal = () => {
//     setModalVisible(!modalVisible);
//   };

//   const modalClose = () => {
//     // props.navigation.reset({
//     //   index: 0,
//     //   routes: [
//     //     { name: 'TabContainer' },
//     //     { name: 'CreateCredential'},
//     //     { name: 'DefinitionList'},
//     //     { 
//     //       name: 'DefinitionDetail',
//     //       params:{
//     //         selectedSchema
//     //       }
//     //     }],
//     // });
//     setModalVisible(!modalVisible);
//   }

//   const onModalConfirm =() => {
//     setModalVisible(!modalVisible);
//     setShowLoading(!showLoading);
//     //props.navigation.navigate('CredentialHistoryDetail');
//   }

//   const SignSignatureModal = () => {
//     return(
//       <Dialog
//         isVisible={modalVisible}
//         onBackdropPress={toggleModal}
//         overlayStyle={{height:200,width:300, justifyContent:'space-around' , paddingHorizontal:20,paddingBottom:0}}>
//         <View>
//           <Dialog.Title title="請確認是否要簽名以領取憑證？"/>
//         </View>
//         <Dialog.Actions>
//           <Dialog.Button               
//             titleStyle={styles.modalBtnText} 
//             buttonStyle={styles.modalCancelBtn} 
//             title="取消" onPress={modalClose} />
//           <Dialog.Button               
//             titleStyle={styles.modalBtnText} 
//             buttonStyle={styles.modalYesBtn} 
//             title="簽名" onPress={onModalConfirm} />
//         </Dialog.Actions>
//       </Dialog> 
//     )
//   }

//   return (
//     <View style={{flex:1}}>
//     {
//       showLoading === true ? (
//         <LoadingComponent nv={props.navigation} loadingStatusText={loadingStatusText}/>
//       ) 
//       :
//       (
//         <QRCodeScanner
//         cameraStyle={{height:SCREEN_HEIGHT,width:SCREEN_WIDTH}}
//         onRead={onSuccessLoad}
//         flashMode={RNCamera.Constants.FlashMode.torch}
//         showMarker={true}
//         customMarker={
//           <View style={{flex:1, justifyContent:'center', alignItems:'center', flexDirection:'row'}}>
//             <MaterialCommunityIcons name='scan-helper' style={styles.aimIcon} size={(SCREEN_HEIGHT * 0.475) }></MaterialCommunityIcons>
//           </View>
//         }
//         />
//       )
//     }
      
//       {/* <TouchableOpacity  onPress={backButton} style={{position:'absolute', top: 10, left: 10 ,borderRadius:100}}>
//         <Ionicons 
//           name = 'arrow-back-circle-sharp'
//           size={50} 
//           style={{color:'white'}}
//         ></Ionicons>
//       </TouchableOpacity> */}
//       <SignSignatureModal></SignSignatureModal>
//     </View>

//   );
// }


// const styles = StyleSheet.create({
//   body:{
//   },
//   centerText: {
//     flex: 1,
//     fontSize: 18,
//     padding: 32,
//     color: '#777'
//   },
//   textBold: {
//     fontWeight: '500',
//     color: '#000'
//   },
//   buttonText: {
//     fontSize: 21,
//     color: 'rgb(0,122,255)'
//   },
//   buttonTouchable: {
//     padding: 16,
//     backgroundColor: 'yellow'
//   },
//   screenOpacity:{
//     backgroundColor: 'green',
//     opacity: 0.6,
//     flex:1,
//     position: 'absolute'
//   },
//   rectangleContainer:{
//     flex:1,
//     backgroundColor: 'red',
//     flexDirection:'row',
//   },
//   aimIcon:{
//     color:'white',
//     justifyContent:'center',
//     alignItems:'center',
//     flex:1,
//     fontWeight: '100'
//   },
//   centerText: {
//     flex: 1,
//     fontSize: 18,
//     padding: 32,
//     color: '#777'
//   },
//   textBold: {
//     fontWeight: '500',
//     color: '#000'
//   },
//   buttonText: {
//     fontSize: 21,
//     color: 'rgb(0,122,255)'
//   },
//   buttonTouchable: {
//     padding: 16
//   },
//   modalContainer:{
    
//   },
//   modalYesBtn:{
//     backgroundColor:'#2196f3',
//     color:'white',
//     borderRadius:10,
//     width:150,
//     height:30,
//     padding:0,
//   },
//   modalCancelBtn:{
//     backgroundColor:'#616161',
//     color:'white',
//     borderRadius:10,
//     width:75,
//     height:30,
//     padding:0,
//     marginLeft: 30
//   },
//   modalBtnText:{
//     color:'white',
//     fontWeight:'bold',
//     fontSize:20
//   }
// });

// export default GetCredentialScreen;


