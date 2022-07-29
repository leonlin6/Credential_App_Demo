/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Button } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
// import indy from 'rn-indy-sdk';
// import indy from 'indy-sdk-react-native';

import React,{useState, useEffect} from 'react';

// import { AuthContext } from './components/context';
import {connect} from 'react-redux';
import indy from 'indy-sdk-react-native';
import anoncreds from 'indy-sdk-react-native';
import RNFS from 'react-native-fs';
import { NavigationContainer, TabActions, useFocusEffect } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
// Login Page
import RootStackScreen from './src/navigators/RootStackScreen';

// import {indy, pool, ledger, wallet, did, anoncreds} from 'indy-sdk-react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

// API
import axios from 'axios';
import { ENDPOINT_BASE_URL } from '../../APIs/APIs';

const App = (props) => {

  // const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();

  const walletName = {id: 'wallet-123'};
  const walletCredentials = {key: 'key'};
  const local_pool_name = 'genesis';
  

  // 「prover_create_credential_req」需要params
  // prover_wallet_handle,
  // prover_did,
  // cred_offer_json,
  // cred_def_json,
  // prover_link_secret_name


  let poolHandle;
  let walletHandle;
  let prover_did = 'VsKV7grR1BUE29mG2Fm2kX';
  let cred_def_id;
  let cred_offer_json;
  let cred_def_json;
  let prover_link_secret_name = 'link_secret234';

  let cred_req_json;
  let cred_metadata;

  let cred_id;
  let cred_json;

//   useEffect(() => {

//     const getDefinition = async () => {
//     cred_def_json = await indy.buildGetCredDefRequest('VsKV7grR1BUE29mG2Fm2kX','E4BDfu4km5x7ni8P8gzbn2:3:CL:9:fwfweew');
//   }

//   getDefinition().then(
//     (response)=>{
//       console.log('response',response);
//     }
//   );
// },[]);

  // wallet 測試用資訊
  const steward = {
    name: "Sovrin Steward",
    wallet_config: {
      id: 'sovrin_steward_wallet'
    },
    wallet_credentials: {
      key: 'steward_wallet_key'
    },
    seed: '000000000000000000000000Steward9'
  }
  



  const getCredentialInfo = async () => {
    try{

      const configurationObject = {
        method: 'get',
        baseURL: ENDPOINT_BASE_URL,
        url: 'api/v1/qrcode/62bc34898f48d5f246cf5979',
        headers:{
          'authorization':`Bearer ${props.loginToken}`,
          'Content-Type':'application/json'
        }
      };

       await axios(configurationObject)
       .then((response) => {
          const credentialInfo = response.data;
          console.log('------credentialInfo-----',credentialInfo);
          cred_offer_json = JSON.parse(credentialInfo.cred_offer);
          cred_id = credentialInfo.credential;
          cred_def_id = credentialInfo.credentialTemplate.credentialDefinition.cred_def_id;
       })
    }catch(error){
      console.log('error', error);
    }
  };

  // async function getWH() {
  //   try{
  //     console.log('get WH onPress');
  //     // const result = await indy.createWallet(walletName, walletCredentials);
  //    const result = await AsyncStorage.getItem('@WalletHandle');
  //     console.log('result', result);
  //   } catch(error){
  //     console.log(error);
  //   }
  // }

  async function createWallet() {
    try{
      console.log('createWallet onPress');
      const result = await indy.createWallet(walletName, walletCredentials);
      
      console.log('result', result);
    } catch(error){
      console.log(error);
    }
  }
  
  async function openWallet() {
    try{
      console.log('openWallet onPress')
      const result = await indy.openWallet(walletName, walletCredentials);
      await AsyncStorage.setItem('@WalletHandle', result.toString());

      console.log(result);
      walletHandle = result;
      // AsyncStorage.setItem('walletHandle', result);



      console.log('result', result)
      let did = await indy.createAndStoreMyDid(result,{})
      console.log('did --- ', did)
    } catch(error){
      console.log(error);
    }
  }
  
  async function closeWallet() {
    try{
      console.log('closeWallet onPress');
      
      // walletHandle = await AsyncStorage.getItem('@WalletHandle');

      const result = await indy.closeWallet(walletHandle)
      console.log('result', result)
    } catch(error){
      console.log(error);
    }
  }
  
  async function deleteWallet() {
    try{
      console.log('deleteWallet onPress')
      const result = await indy.deleteWallet(walletName, walletCredentials)
      console.log('result', result)
    } catch(error){
      console.log(error);
    }
  }

  async function createPool() {
    try{
        var path = RNFS.DocumentDirectoryPath + '/test.txt';

        let ttt = `{"reqSignature":{},"txn":{"data":{"data":{"alias":"Node1","blskey":"4N8aUNHSgjQVgkpm8nhNEfDf6txHznoYREg9kirmJrkivgL4oSEimFF6nsQ6M41QvhM2Z33nves5vfSn9n1UwNFJBYtWVnHYMATn76vLuL3zU88KyeAYcHfsih3He6UHcXDxcaecHVz6jhCYz1P2UZn2bDVruL5wXpehgBfBaLKm3Ba","blskey_pop":"RahHYiCvoNCtPTrVtP7nMC5eTYrsUA8WjXbdhNc8debh1agE9bGiJxWBXYNFbnJXoXhWFMvyqhqhRoq737YQemH5ik9oL7R4NTTCz2LEZhkgLJzB3QRQqJyBNyv7acbdHrAT8nQ9UkLbaVL9NBpnWXBTw4LEMePaSHEw66RzPNdAX1","client_ip":"192.168.50.169","client_port":9702,"node_ip":"192.168.50.169","node_port":9701,"services":["VALIDATOR"]},"dest":"Gw6pDLhcBcoQesN72qfotTgFa7cbuqZpkX3Xo6pLhPhv"},"metadata":{"from":"Th7MpTaRZVRYnPiabds81Y"},"type":"0"},"txnMetadata":{"seqNo":1,"txnId":"fea82e10e894419fe2bea7d96296a6d46f50f93f9eeda954ec461b2ed2950b62"},"ver":"1"}
        {"reqSignature":{},"txn":{"data":{"data":{"alias":"Node2","blskey":"37rAPpXVoxzKhz7d9gkUe52XuXryuLXoM6P6LbWDB7LSbG62Lsb33sfG7zqS8TK1MXwuCHj1FKNzVpsnafmqLG1vXN88rt38mNFs9TENzm4QHdBzsvCuoBnPH7rpYYDo9DZNJePaDvRvqJKByCabubJz3XXKbEeshzpz4Ma5QYpJqjk","blskey_pop":"Qr658mWZ2YC8JXGXwMDQTzuZCWF7NK9EwxphGmcBvCh6ybUuLxbG65nsX4JvD4SPNtkJ2w9ug1yLTj6fgmuDg41TgECXjLCij3RMsV8CwewBVgVN67wsA45DFWvqvLtu4rjNnE9JbdFTc1Z4WCPA3Xan44K1HoHAq9EVeaRYs8zoF5","client_ip":"192.168.50.169","client_port":9704,"node_ip":"192.168.50.169","node_port":9703,"services":["VALIDATOR"]},"dest":"8ECVSk179mjsjKRLWiQtssMLgp6EPhWXtaYyStWPSGAb"},"metadata":{"from":"EbP4aYNeTHL6q385GuVpRV"},"type":"0"},"txnMetadata":{"seqNo":2,"txnId":"1ac8aece2a18ced660fef8694b61aac3af08ba875ce3026a160acbc3a3af35fc"},"ver":"1"}
        {"reqSignature":{},"txn":{"data":{"data":{"alias":"Node3","blskey":"3WFpdbg7C5cnLYZwFZevJqhubkFALBfCBBok15GdrKMUhUjGsk3jV6QKj6MZgEubF7oqCafxNdkm7eswgA4sdKTRc82tLGzZBd6vNqU8dupzup6uYUf32KTHTPQbuUM8Yk4QFXjEf2Usu2TJcNkdgpyeUSX42u5LqdDDpNSWUK5deC5","blskey_pop":"QwDeb2CkNSx6r8QC8vGQK3GRv7Yndn84TGNijX8YXHPiagXajyfTjoR87rXUu4G4QLk2cF8NNyqWiYMus1623dELWwx57rLCFqGh7N4ZRbGDRP4fnVcaKg1BcUxQ866Ven4gw8y4N56S5HzxXNBZtLYmhGHvDtk6PFkFwCvxYrNYjh","client_ip":"192.168.50.169","client_port":9706,"node_ip":"192.168.50.169","node_port":9705,"services":["VALIDATOR"]},"dest":"DKVxG2fXXTU8yT5N7hGEbXB3dfdAnYv1JczDUHpmDxya"},"metadata":{"from":"4cU41vWW82ArfxJxHkzXPG"},"type":"0"},"txnMetadata":{"seqNo":3,"txnId":"7e9f355dffa78ed24668f0e0e369fd8c224076571c51e2ea8be5f26479edebe4"},"ver":"1"}
        {"reqSignature":{},"txn":{"data":{"data":{"alias":"Node4","blskey":"2zN3bHM1m4rLz54MJHYSwvqzPchYp8jkHswveCLAEJVcX6Mm1wHQD1SkPYMzUDTZvWvhuE6VNAkK3KxVeEmsanSmvjVkReDeBEMxeDaayjcZjFGPydyey1qxBHmTvAnBKoPydvuTAqx5f7YNNRAdeLmUi99gERUU7TD8KfAa6MpQ9bw","blskey_pop":"RPLagxaR5xdimFzwmzYnz4ZhWtYQEj8iR5ZU53T2gitPCyCHQneUn2Huc4oeLd2B2HzkGnjAff4hWTJT6C7qHYB1Mv2wU5iHHGFWkhnTX9WsEAbunJCV2qcaXScKj4tTfvdDKfLiVuU2av6hbsMztirRze7LvYBkRHV3tGwyCptsrP","client_ip":"192.168.50.169","client_port":9708,"node_ip":"192.168.50.169","node_port":9707,"services":["VALIDATOR"]},"dest":"4PS3EDQ3dW1tci1Bp6543CfuuebjFrg36kLAUcskGfaA"},"metadata":{"from":"TWwCRQRZ2ZHMJFn9TzLp7W"},"type":"0"},"txnMetadata":{"seqNo":4,"txnId":"aa5e817d7cc626170eca175822029339a444eb0ee8f0bd20d3b0b76e566fb008"},"ver":"1"}`

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

  async function openPool() {
    try{
      console.log('open pool onPress');
      var path = RNFS.DocumentDirectoryPath + '/test.txt';

      let pool_config = {genesis_txn:path};

      let result = await indy.openPoolLedger(local_pool_name);
      poolHandle = result;
      console.log('open pool result', result);
    } catch(error){
      console.log(error);
    }
  }
  
  async function closePool() {
    try{
      console.log('close pool onPress');

      let result = await indy.closePoolLedger(poolHandle);

      console.log('close result', result);
    } catch(error){
      console.log(error);
    }
  }



  const createDID = async () => {
    try{
      console.log('createDidonPress');

      const did_json = {'seed': steward.seed};
      let [steward_did, steward_verkey] = await indy.create_and_store_my_did(issuer_wallet_handle, did_json)

      console.log('Steward DID: ', steward_did);
      //2vzWtXVnoYgS4Pae9s1ZUj


      console.log('Steward Verkey: ', steward_verkey);

      console.log('create_and_store_my_did result', result);
    } catch(error){
      console.log(error);
    }
  }

  const createMasterSecret = async () => {
    try{
      console.log('-----walletHandle------',walletHandle);
      console.log('-----type------',typeof walletHandle);

      console.log('-----prover_link_secret_name------',prover_link_secret_name);
      console.log('-----type------',typeof prover_link_secret_name);

      let secret_id = await indy.proverCreateMasterSecret(walletHandle, prover_link_secret_name);
      console.log('-----secret_id------',secret_id);

    } catch(error){
      console.log(error);
    }
  }

  
  const getDefinition = async () => {
    try{
      console.log('-----getDefinition----')
      let parsedData;
      console.log('cred_def_id',cred_def_id);

      //(prover_did, cred_def_id)
      let response = await indy.buildGetCredDefRequest('VsKV7grR1BUE29mG2Fm2kX', cred_def_id);

      console.log('response',response);
      console.log('poolHandle',poolHandle);

      let definitionResponse = await indy.submitRequest(poolHandle,response);
      console.log('definitionResponse',definitionResponse);
      
      parsedData = await indy.parseGetCredDefResponse(definitionResponse);
      cred_def_json = parsedData[1];
      //[definitionID, definitionJSON]
      console.log('DefinitionID',parsedData[0]);
      console.log('Definition',parsedData[1]);

    } catch(error){
      console.log(error);
    }
  }


  const CreateCredentialReq = async () => {
    console.log('walletHandle', walletHandle);
    console.log('prover_did', prover_did);
    console.log('cred_offer_json', cred_offer_json);
    console.log('cred_def_json', cred_def_json);
    console.log('prover_link_secret_name', prover_link_secret_name);
    const reqResponse = await indy.proverCreateCredentialReq(walletHandle, prover_did, cred_offer_json, cred_def_json, prover_link_secret_name);

    // console.log('walletHandle', walletHandle);
    // console.log('prover_did', prover_did);
    // console.log('cred_offer_json', cred_offer_json);
    // console.log('cred_def_json', cred_def_json);
    // console.log('prover_link_secret_name', prover_link_secret_name);
    cred_req_json = reqResponse[0];
    cred_metadata= reqResponse[1];

    console.log('-------cred_req_json--------', cred_req_json);
    console.log('-------cred_metadata--------', cred_metadata);
  
  }

  const submit = async () => {
    try{
      const configurationObject = {
        method: 'put',
        baseURL: ENDPOINT_BASE_URL,
        url: `api/v1/credential/${cred_id}/download`,
        headers:{
          'authorization':`Bearer ${props.loginToken}`,
          'Content-Type':'application/json'
        },
        data:{
          value:[{
            "key": "name",
            "type": 0,
            "value": "male"
        }],
          cred_req_json:JSON.stringify(cred_req_json)
        }
      };


     let response =  await axios(configurationObject);
     cred_json = response.data.cred_json;
      console.log('-----cred_json-----',cred_json);

    }catch(error){
      console.log('error', error);
    }
  }


  async function saveCredential() {
    try{
      console.log('saveCredential onPress');

      
      //proverStoreCredential(wh, credId, credReqMetadata, cred, credDef, revRegDef) {
      console.log('----wh----',walletHandle);
      console.log('----cred_id----',cred_id);
      console.log('----cred_metadata----',cred_metadata);
      console.log('----cred_json----',cred_json);
      console.log('----cred_def_json----',cred_def_json);

      let parsedCredJson = JSON.parse(cred_json);
      console.log('---parsedCredJson--', parsedCredJson); 

      const result = await indy.proverStoreCredential(
        walletHandle, 
        cred_id,
        cred_metadata,
        parsedCredJson,
        cred_def_json
      );
  
      console.log('save credential result', result);
    } catch(error){
      console.log(error);
    }
  
  }

  const getCredFromWallet = async () => {
    let response = await indy.proverGetCredentials(walletHandle);
    console.log(response);
  }

  const initial = async () => {
    await getCredentialInfo();
    await openWallet();
    await openPool();
  }

  const handleRequest = async () => {
    await getDefinition();
    await CreateCredentialReq();
    await submit();
    await saveCredential();
  }

  const getWalletCredentials = async () => {
    await getCredFromWallet();

  }

  const ButtonArea = () => {
    return(
      <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
        <View style={styles.body}>
          <Text style={styles.sectionDescription}>Check console.log for test results</Text>
          {/* <View style={styles.sectionContainer}>
            <Button title="Get Wallet Handle from AsyncStorage" onPress={getWH} />
          </View>
          <View style={styles.sectionContainer}>
            <Button title="Create wallet" onPress={createWallet} />
          </View>
          <View style={styles.sectionContainer}>
            <Button title="getCredentialInfo" onPress={getCredentialInfo} />
          </View>  
          <View style={styles.sectionContainer}>
            <Button title="Open wallet" onPress={openWallet} />
          </View>
          <View style={styles.sectionContainer}>
            <Button title="Close wallet" onPress={closeWallet} />
          </View>
          <View style={styles.sectionContainer}>
            <Button title="Delete wallet" onPress={deleteWallet} />
          </View>
          <View style={styles.sectionContainer}>
            <Button title="Save Credential" onPress={saveCredentian} />
          </View>
          <View style={styles.sectionContainer}>
            <Button title="Get Credential" onPress={getCredentian} />
          </View>
          <View style={styles.sectionContainer}>
            <Button title="createPool" onPress={createPool} />
          </View>
          <View style={styles.sectionContainer}>
            <Button title="openPool" onPress={openPool} />
          </View>
          <View style={styles.sectionContainer}>
            <Button title="closePool" onPress={closePool} />
          </View>
          <View style={styles.sectionContainer}>
            <Button title="createDid" onPress={createDID} />
          </View>
          <View style={styles.sectionContainer}>
            <Button title="createMasterSecret" onPress={createMasterSecret} />
          </View>
          <View style={styles.sectionContainer}>
            <Button title="getDefinition" onPress={getDefinition} />
          </View>
          <View style={styles.sectionContainer}>
            <Button title="CreateCredentialReq" onPress={CreateCredentialReq} />
          </View>  

          <View style={styles.sectionContainer}>
            <Button title="submit" onPress={submit} />
          </View>  
          <View style={styles.sectionContainer}>
            <Button title="saveCredential" onPress={saveCredential} />
          </View>  
          <View style={styles.sectionContainer}>
            <Button title="getCredFromWallet" onPress={getCredFromWallet} />
          </View>   */}
          <View style={styles.sectionContainer}>
            <Button title="Open wallet" onPress={openWallet} />
          </View>
          <View style={styles.sectionContainer}>
            <Button title="initial" onPress={initial} />
          </View>  
          <View style={styles.sectionContainer}>
            <Button title="handleRequest" onPress={handleRequest} />
          </View>  
          <View style={styles.sectionContainer}>
            <Button title="getWalletCredentials" onPress={getWalletCredentials} />
          </View>  

          <View style={styles.sectionContainer}>
            <Button title="Create wallet" onPress={createWallet} />
          </View>

          <View style={styles.sectionContainer}>
            <Button title="createPool" onPress={createPool} />
          </View>
          <View style={styles.sectionContainer}>
            <Button title="createMasterSecret" onPress={createMasterSecret} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
    )
  }

  return (
    <>
      <NavigationContainer>  
        <Stack.Navigator>
        <Stack.Screen name='ButtonArea' component={ButtonArea} options={{headerShown: false}}></Stack.Screen>
          {/* {props.loginToken !== null ? 
            (<Stack.Screen name='ButtonArea' component={ButtonArea} options={{headerShown: false}}></Stack.Screen>)
            : 
            (<Stack.Screen name='RootStackScreen' component={RootStackScreen} options={{headerShown: false}}></Stack.Screen>)
          }  */}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}



const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
})

const mapStateToProps = (state) => {  
  return {
      loginToken: state.loginToken
  };
}  


export default connect(mapStateToProps)(App);