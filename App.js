/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Button } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
// import indy from 'rn-indy-sdk';
// import indy from 'indy-sdk-react-native';

import indy from 'indy-sdk-react-native';
import anoncreds from 'indy-sdk-react-native';
import RNFS from 'react-native-fs';


// import {indy, pool, ledger, wallet, did, anoncreds} from 'indy-sdk-react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

const App = () => {
  let walletHandle;
  let poolHandle;
  let prover_link_secret_name = 'link_secret234';
  const walletName = {id: 'wallet-123'};
  const walletCredentials = {key: 'key'};
  const local_pool_name = 'genesis';

  // wallet 測試用資訊
  const steward = {
    name: "Sovrin Steward",
    wallet_config: {
      id: 'sovrin_steward_wallet'
    },
    wallet_credentials: {
      key: 'steward_wallet_key'
    },
    seed: '000000000000000000000000Steward8'
  }
  
  // cred_req_metadata_json 測試用資訊
  const cred_req_metadata_json = {
    master_secret_blinding_data:{
        v_prime:"33784739190424736058829825780910412933977036954119051444532435900377304151693833028014859106576250819582322203870678001271258717861296671196984516312404521159937722747369509036232734832181305872821168698341622972834598800714318067294256147421495950824288866986667545868259107208290361071499666166165948093730577063338992960850829092125882807542315897606631660833703590958014409126554344839066587346859570172462485976948819338858870065658567268623930650139469259819409627426057725038910839585744644805367256476000996145151601466616281785867046134861633659983520137033011161475084147737220789187908041121924806564249344972150417544181671367144",
        vr_prime:"1A0C0131EE01314E5BC5C903B93D10803E5611EEB32300DD660AA1167E01B639"
    },
    nonce:"778940210194489888978503",
    master_secret_name:"123456789"
  }

  // cred_json 測試用資訊
  const cred_json = {
    schema_id:"F2GAtxHHkNSoTK66w5YuCS:2:andrewTest001:0.0.1",
    cred_def_id:"F2GAtxHHkNSoTK66w5YuCS:3:CL:8:andrew-cred_def-test-001",
    rev_reg_id:"F2GAtxHHkNSoTK66w5YuCS:4:F2GAtxHHkNSoTK66w5YuCS:3:CL:8:andrew-cred_def-test-001:CL_ACCUM:REVOC_REG_DEF",
    values:{
      name:{
          raw:"我的名字name",
          encoded:"5oiR55qE5ZCN5a2XbmFtZQ=="
      },
      day:{
          raw:"2020",
          encoded:"2020"
      },
      times:{
          raw:"20200420",
          encoded:"20200420"
      }  
    }
  }

  async function getCredentian() {
    try{
      //console.log('getCredential onPress');
     // await anoncreds.proverGetCredential(walletHandle, steward.wallet_config.id);
     console.log('searchCredential onPress');
      await anoncreds.proverSearchCredentialsForProofReq(walletHandle);
    } catch(error){
      console.log(error);
    }
  }

  async function saveCredentian() {
    try{
      console.log('saveCredential onPress');
      /* proverStoreCredential(
        wh,v 
        credId, v
        credReqMetadata, v
        cred, 
        credDef, 
        revRegDef)*/

      /* await anoncreds.prover_store_credential(
        alice['wallet'], 
        None, 
        faber['transcript_cred_request'], 
        faber['transcript_cred_request_metadata'],
        alice['transcript_cred'], 
        alice['transcript_cred_def'], 
        None)*/

      await anoncreds.proverStoreCredential(
        walletHandle, 
        steward.wallet_config.id,
        cred_req_metadata_json, 
        cred_json,
        cred_json.cred_def_id, 
        'None'
      );
  
      console.log('save credential result', result);
    } catch(error){
      console.log(error);
    }
  
  }

  // proverStoreCredential(wh, credId, credReqMetadata, cred, credDef, revRegDef) {
  //   wh: Handle (Number) - wallet handle (created by openWallet)
  //   credId: String - (optional, default is a random one) identifier by which credential will be stored in the wallet
  //   credReqMetadata: Json - a credential request metadata created by proverCreateCredentialReq
  //   cred: Json - credential json received from issuer
  //   credDef: Json - credential definition json related to <cred_def_id> in <cred_json>
  //   revRegDef: Json - revocation registry definition json related to <rev_reg_def_id> in <cred_json>
  //   -> outCredId: String - out_cred_id: identifier by which credential is stored in the wallet


  //  proverGetCredential(wh, credId)
  
  
  async function getWH() {
    try{
      console.log('get WH onPress');
      // const result = await indy.createWallet(walletName, walletCredentials);
     const result = await AsyncStorage.getItem('@WalletHandle');
      console.log('result', result);
    } catch(error){
      console.log(error);
    }
  }

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
      console.log('Steward Verkey: ', steward_verkey);

      console.log('create_and_store_my_did result', result);
    } catch(error){
      console.log(error);
    }
  }

  const createMasterSecret = async () => {
    try{
      console.log('createMasterSecret Press');
      console.log('walletHandle', walletHandle);
      console.log('prover_link_secret_name', prover_link_secret_name);
      
      let secret_id = await indy.proverCreateMasterSecret(walletHandle, prover_link_secret_name)

      console.log('secret_id: ', secret_id);

    } catch(error){
      console.log(error);
    }
  }
  
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
          <View style={styles.body}>
            <Text style={styles.sectionDescription}>Check console.log for test results</Text>
            <View style={styles.sectionContainer}>
              <Button title="Get Wallet Handle from AsyncStorage" onPress={getWH} />
            </View>
            <View style={styles.sectionContainer}>
              <Button title="Create wallet" onPress={createWallet} />
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
          </View>
        </ScrollView>
      </SafeAreaView>
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

export default App
