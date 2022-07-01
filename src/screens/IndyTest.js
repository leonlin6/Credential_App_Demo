
//  import React from 'react';
//  import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Button } from 'react-native';
//  import AsyncStorage from "@react-native-async-storage/async-storage";

 
//  import indy from 'indy-sdk-react-native';
//  import anoncreds from 'indy-sdk-react-native';
 
 
//  // import {indy, pool, ledger, wallet, did, anoncreds} from 'indy-sdk-react-native';
 
//  import { Colors } from 'react-native/Libraries/NewAppScreen';
 
//  const IndyTest = () => {
//    const walletName = {id: 'wallet-123'};
//    const walletCredentials = {key: 'key'};
//    let walletHandle;
 
//    const pool_ = {
//      name: 'pool1'
//    }
//      // logger.info("Open Pool Ledger: {}".format(pool_['name']))
//      // pool_['genesis_txn_path'] = get_pool_genesis_txn_path(pool_['name'])
//      // pool_['config'] = {
//      //   genesis_txn: str(pool_['genesis_txn_path'])
//      // }
 
//    // wallet 測試用資訊
//    const steward = {
//      name: "Sovrin Steward",
//      wallet_config: {
//        id: 'sovrin_steward_wallet'
//      },
//      wallet_credentials: {
//        key: 'steward_wallet_key'
//      },
//      pool: pool_['handle'],
//      seed: '000000000000000000000000Steward1'
//    }
   
//    // cred_req_metadata_json 測試用資訊
//    const cred_req_metadata_json = {
//      master_secret_blinding_data:{
//          v_prime:"33784739190424736058829825780910412933977036954119051444532435900377304151693833028014859106576250819582322203870678001271258717861296671196984516312404521159937722747369509036232734832181305872821168698341622972834598800714318067294256147421495950824288866986667545868259107208290361071499666166165948093730577063338992960850829092125882807542315897606631660833703590958014409126554344839066587346859570172462485976948819338858870065658567268623930650139469259819409627426057725038910839585744644805367256476000996145151601466616281785867046134861633659983520137033011161475084147737220789187908041121924806564249344972150417544181671367144",
//          vr_prime:"1A0C0131EE01314E5BC5C903B93D10803E5611EEB32300DD660AA1167E01B639"
//      },
//      nonce:"778940210194489888978503",
//      master_secret_name:"123456789"
//    }
 
//    // cred_json 測試用資訊
//    const cred_json = {
//      schema_id:"F2GAtxHHkNSoTK66w5YuCS:2:andrewTest001:0.0.1",
//      cred_def_id:"F2GAtxHHkNSoTK66w5YuCS:3:CL:8:andrew-cred_def-test-001",
//      rev_reg_id:"F2GAtxHHkNSoTK66w5YuCS:4:F2GAtxHHkNSoTK66w5YuCS:3:CL:8:andrew-cred_def-test-001:CL_ACCUM:REVOC_REG_DEF",
//      values:{
//        name:{
//            raw:"我的名字name",
//            encoded:"5oiR55qE5ZCN5a2XbmFtZQ=="
//        },
//        day:{
//            raw:"2020",
//            encoded:"2020"
//        },
//        times:{
//            raw:"20200420",
//            encoded:"20200420"
//        }  
//      }
//    }
 
//    async function getCredentian() {
//      try{
//        //console.log('getCredential onPress');
//       // await anoncreds.proverGetCredential(walletHandle, steward.wallet_config.id);
      
      
//       console.log('searchCredential onPress');
 
//        await anoncreds.proverSearchCredentialsForProofReq(walletHandle);
 
       
   
//      } catch(error){
//        console.log(error);
//      }
   
//    }
 
//    async function saveCredentian() {
//      try{
//        console.log('saveCredential onPress');
//        /* proverStoreCredential(
//          wh,v 
//          credId, v
//          credReqMetadata, v
//          cred, 
//          credDef, 
//          revRegDef)*/
 
//        /* await anoncreds.prover_store_credential(
//          alice['wallet'], 
//          None, 
//          faber['transcript_cred_request'], 
//          faber['transcript_cred_request_metadata'],
//          alice['transcript_cred'], 
//          alice['transcript_cred_def'], 
//          None)*/
 
//        await anoncreds.proverStoreCredential(
//          walletHandle, 
//          steward.wallet_config.id,
//          cred_req_metadata_json, 
//          cred_json,
//          cred_json.cred_def_id, 
//          'None'
//        );
   
//        console.log('save credential result', result);
//      } catch(error){
//        console.log(error);
//      }
   
//    }
 
//    // proverStoreCredential(wh, credId, credReqMetadata, cred, credDef, revRegDef) {
//    //   wh: Handle (Number) - wallet handle (created by openWallet)
//    //   credId: String - (optional, default is a random one) identifier by which credential will be stored in the wallet
//    //   credReqMetadata: Json - a credential request metadata created by proverCreateCredentialReq
//    //   cred: Json - credential json received from issuer
//    //   credDef: Json - credential definition json related to <cred_def_id> in <cred_json>
//    //   revRegDef: Json - revocation registry definition json related to <rev_reg_def_id> in <cred_json>
//    //   -> outCredId: String - out_cred_id: identifier by which credential is stored in the wallet
 
 
//    //  proverGetCredential(wh, credId)
 
   
//    async function createWallet() {
//      try{
//        console.log('createWallet onPress');
//        const result = await indy.createWallet(walletName, walletCredentials);
//        console.log('result', result);
//      } catch(error){
//        console.log(error);
//      }
//    }
   
//    async function openWallet() {
//      try{
//        console.log('openWallet onPress')
//        const result = await indy.openWallet(walletName, walletCredentials)
//        walletHandle = result;
//        AsyncStorage.setItem('walletHandle', result);
 
 
 
//        console.log('result', result)
//        let did = await indy.createAndStoreMyDid(result,{})
//        console.log('did --- ', did)
//      } catch(error){
//        console.log(error);
//      }
//    }
   
//    async function closeWallet() {
//      try{
//        console.log('closeWallet onPress');
       
//        walletHandle = await AsyncStorage.getItem('walletHandle');
 
//        const result = await indy.closeWallet(walletHandle)
//        console.log('result', result)
//      } catch(error){
//        console.log(error);
//      }
//    }
   
//    async function deleteWallet() {
//      try{
//        console.log('deleteWallet onPress')
//        const result = await indy.deleteWallet(walletName, walletCredentials)
//        console.log('result', result)
//      } catch(error){
//        console.log(error);
//      }
//    }
 
//    return (
//      <>
//        <StatusBar barStyle="dark-content" />
//        <SafeAreaView>
//          <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
//            <View style={styles.body}>
//              <Text style={styles.sectionDescription}>Check console.log for test results</Text>
//              <View style={styles.sectionContainer}>
//                <Button title="Create wallet" onPress={createWallet} />
//              </View>
//              <View style={styles.sectionContainer}>
//                <Button title="Open wallet" onPress={openWallet} />
//              </View>
//              <View style={styles.sectionContainer}>
//                <Button title="Close wallet" onPress={closeWallet} />
//              </View>
//              <View style={styles.sectionContainer}>
//                <Button title="Delete wallet" onPress={deleteWallet} />
//              </View>
//              <View style={styles.sectionContainer}>
//                <Button title="Save Credential" onPress={saveCredentian} />
//              </View>
//              <View style={styles.sectionContainer}>
//                <Button title="Get Credential" onPress={getCredentian} />
//              </View>
//            </View>
//          </ScrollView>
//        </SafeAreaView>
//      </>
//    )
//  }
 
 
 
//  const styles = StyleSheet.create({
//    scrollView: {
//      backgroundColor: Colors.lighter,
//    },
//    body: {
//      backgroundColor: Colors.white,
//    },
//    sectionContainer: {
//      marginTop: 32,
//      paddingHorizontal: 24,
//    },
//    sectionDescription: {
//      marginTop: 8,
//      fontSize: 18,
//      fontWeight: '400',
//      color: Colors.dark,
//    },
//  })
 
//  export default IndyTest;
 