import React, {useEffect, useState, useRef} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import messaging from '@react-native-firebase/messaging';
import indy from 'indy-sdk-react-native';
import anoncreds from 'indy-sdk-react-native';
import pool from 'indy-sdk-react-native';
import RNFS from 'react-native-fs';
import {connect} from 'react-redux';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Keyboard,
  Image
} from 'react-native';

// import LoginData from '../APIs/LoginData';
import transactions_local_genesis from '../../config/transactions_local_genesis'

const Wallet = (props) => {
  const walletName = {id: 'wallet-123'};
  const walletCredentials = {key: 'key'};
  const local_pool_name = 'genesis';
  const [showDrawerMenu, setShowDrawerMenu] = useState(false);
 


  useEffect(() => {
    async function initIndy () {
      // await createWallet();
      // await openWallet();
      // await createPool();
      // await openPool();
    }
    initIndy ();
  },[])


  const createWallet = async () => {
    try{
      console.log('createWallet onPress');
      const result = await indy.createWallet(walletName, walletCredentials);
      console.log('result', result);
    } catch(error){
      console.log(error);
    }
  }

  const openWallet = async () => {
    try{
      console.log('openWallet onPress');
      const result = await indy.openWallet(walletName, walletCredentials);
      AsyncStorage.setItem('walletHandle',result.toString())

      console.log('result', result);
    } catch(error){
      console.log(error);
    }
  }

  const createPool = async () => {
    try{
      // console.log('create pool onPress');
     
    //  let pool= './IndyTest.js'
      // let ttt =require('./genesis.txn');
      // console.log('ttt',ttt);
      // const genesisPath = `${RNFS.DocumentDirectoryPath}/src/screens/${local_pool_name}.txn`
      // console.log('genesisPath',genesisPath);
      // let pool_config = {genesis_txn:pool};
      // console.log('poolConfig', pool_config);
      // const result = await indy.createPoolLedgerConfig(local_pool_name, pool_config);

      // console.log('result', result);

      var path = RNFS.DocumentDirectoryPath + '/test.txt';

        let ttt = `{"reqSignature":{},"txn":{"data":{"data":{"alias":"Node1","blskey":"4N8aUNHSgjQVgkpm8nhNEfDf6txHznoYREg9kirmJrkivgL4oSEimFF6nsQ6M41QvhM2Z33nves5vfSn9n1UwNFJBYtWVnHYMATn76vLuL3zU88KyeAYcHfsih3He6UHcXDxcaecHVz6jhCYz1P2UZn2bDVruL5wXpehgBfBaLKm3Ba","blskey_pop":"RahHYiCvoNCtPTrVtP7nMC5eTYrsUA8WjXbdhNc8debh1agE9bGiJxWBXYNFbnJXoXhWFMvyqhqhRoq737YQemH5ik9oL7R4NTTCz2LEZhkgLJzB3QRQqJyBNyv7acbdHrAT8nQ9UkLbaVL9NBpnWXBTw4LEMePaSHEw66RzPNdAX1","client_ip":"192.168.0.101","client_port":9702,"node_ip":"192.168.0.101","node_port":9701,"services":["VALIDATOR"]},"dest":"Gw6pDLhcBcoQesN72qfotTgFa7cbuqZpkX3Xo6pLhPhv"},"metadata":{"from":"Th7MpTaRZVRYnPiabds81Y"},"type":"0"},"txnMetadata":{"seqNo":1,"txnId":"fea82e10e894419fe2bea7d96296a6d46f50f93f9eeda954ec461b2ed2950b62"},"ver":"1"}
        {"reqSignature":{},"txn":{"data":{"data":{"alias":"Node2","blskey":"37rAPpXVoxzKhz7d9gkUe52XuXryuLXoM6P6LbWDB7LSbG62Lsb33sfG7zqS8TK1MXwuCHj1FKNzVpsnafmqLG1vXN88rt38mNFs9TENzm4QHdBzsvCuoBnPH7rpYYDo9DZNJePaDvRvqJKByCabubJz3XXKbEeshzpz4Ma5QYpJqjk","blskey_pop":"Qr658mWZ2YC8JXGXwMDQTzuZCWF7NK9EwxphGmcBvCh6ybUuLxbG65nsX4JvD4SPNtkJ2w9ug1yLTj6fgmuDg41TgECXjLCij3RMsV8CwewBVgVN67wsA45DFWvqvLtu4rjNnE9JbdFTc1Z4WCPA3Xan44K1HoHAq9EVeaRYs8zoF5","client_ip":"192.168.0.101","client_port":9704,"node_ip":"192.168.0.101","node_port":9703,"services":["VALIDATOR"]},"dest":"8ECVSk179mjsjKRLWiQtssMLgp6EPhWXtaYyStWPSGAb"},"metadata":{"from":"EbP4aYNeTHL6q385GuVpRV"},"type":"0"},"txnMetadata":{"seqNo":2,"txnId":"1ac8aece2a18ced660fef8694b61aac3af08ba875ce3026a160acbc3a3af35fc"},"ver":"1"}
        {"reqSignature":{},"txn":{"data":{"data":{"alias":"Node3","blskey":"3WFpdbg7C5cnLYZwFZevJqhubkFALBfCBBok15GdrKMUhUjGsk3jV6QKj6MZgEubF7oqCafxNdkm7eswgA4sdKTRc82tLGzZBd6vNqU8dupzup6uYUf32KTHTPQbuUM8Yk4QFXjEf2Usu2TJcNkdgpyeUSX42u5LqdDDpNSWUK5deC5","blskey_pop":"QwDeb2CkNSx6r8QC8vGQK3GRv7Yndn84TGNijX8YXHPiagXajyfTjoR87rXUu4G4QLk2cF8NNyqWiYMus1623dELWwx57rLCFqGh7N4ZRbGDRP4fnVcaKg1BcUxQ866Ven4gw8y4N56S5HzxXNBZtLYmhGHvDtk6PFkFwCvxYrNYjh","client_ip":"192.168.0.101","client_port":9706,"node_ip":"192.168.0.101","node_port":9705,"services":["VALIDATOR"]},"dest":"DKVxG2fXXTU8yT5N7hGEbXB3dfdAnYv1JczDUHpmDxya"},"metadata":{"from":"4cU41vWW82ArfxJxHkzXPG"},"type":"0"},"txnMetadata":{"seqNo":3,"txnId":"7e9f355dffa78ed24668f0e0e369fd8c224076571c51e2ea8be5f26479edebe4"},"ver":"1"}
        {"reqSignature":{},"txn":{"data":{"data":{"alias":"Node4","blskey":"2zN3bHM1m4rLz54MJHYSwvqzPchYp8jkHswveCLAEJVcX6Mm1wHQD1SkPYMzUDTZvWvhuE6VNAkK3KxVeEmsanSmvjVkReDeBEMxeDaayjcZjFGPydyey1qxBHmTvAnBKoPydvuTAqx5f7YNNRAdeLmUi99gERUU7TD8KfAa6MpQ9bw","blskey_pop":"RPLagxaR5xdimFzwmzYnz4ZhWtYQEj8iR5ZU53T2gitPCyCHQneUn2Huc4oeLd2B2HzkGnjAff4hWTJT6C7qHYB1Mv2wU5iHHGFWkhnTX9WsEAbunJCV2qcaXScKj4tTfvdDKfLiVuU2av6hbsMztirRze7LvYBkRHV3tGwyCptsrP","client_ip":"192.168.0.101","client_port":9708,"node_ip":"192.168.0.101","node_port":9707,"services":["VALIDATOR"]},"dest":"4PS3EDQ3dW1tci1Bp6543CfuuebjFrg36kLAUcskGfaA"},"metadata":{"from":"TWwCRQRZ2ZHMJFn9TzLp7W"},"type":"0"},"txnMetadata":{"seqNo":4,"txnId":"aa5e817d7cc626170eca175822029339a444eb0ee8f0bd20d3b0b76e566fb008"},"ver":"1"}`
      // write the file
      RNFS.writeFile(path, ttt, 'utf8')
        .then((success) => {
          console.log('path',path);
          console.log('FILE WRITTEN!');
        })
        .catch((err) => {
          console.log(err.message);
        });
      let pool_config = {genesis_txn:path};

      const result = await indy.createPoolLedgerConfig(local_pool_name, pool_config);
      console.log('result', result);

    } catch(error){
      console.log(error);
    }
  }

  const openPool = async () => {
    try{
      console.log('open pool onPress');
      var path = RNFS.DocumentDirectoryPath + '/test.txt';
      let pool_config = {genesis_txn:path};
      let result = await indy.openPoolLedger(local_pool_name, "");
      console.log('open pool result', result);
    } catch(error){
      console.log(error);
    }
  }

  const onScanPress = () => {
      props.navigation.navigate('Scan');
  }

  const onCredentilaListPress = () => {
    props.navigation.navigate({
      name:'CredentialList',
      params:{
        from:'WalletScreen'
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
        <View style={styles.menu}>
          <TouchableOpacity style={styles.image} onPress={onMenuPress}>
            <Ionicons name='menu' size={50}></Ionicons>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.image} onPress={onScanPress}>
            <Ionicons name='ios-scan-sharp' size={300} ></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity style={styles.image} onPress={onCredentilaListPress}>
            <Ionicons name='wallet-outline' size={300} ></Ionicons>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    fontSize: 25,
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'center'
  },
  menu:{
    position:'absolute',
    top:10,
    left:10
  },
  image:{

  }
});


export default Wallet;