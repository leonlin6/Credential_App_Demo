import React, {useEffect, useState, useRef, useReducer} from 'react';
import { 
  ActivityIndicator, 
  StyleSheet, 
  Text, 
  View, 
  Animated
} from "react-native";
import { Colors } from './Colors';
import { ENDPOINT_BASE_URL } from '../../APIs/APIs';
import { CommonActions } from '@react-navigation/native';
import axios from 'axios';

const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return state + 1 ;
    case "decrement":
      return state - 1 ;
    case "reset":
      return state= 0;
    default:
      return state;
  }
}

const LoadingComponent = (props) => {
  const fadeAnim1 = useRef(new Animated.Value(1)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;
  const fadeAnim3 = useRef(new Animated.Value(0)).current;
  const array = [fadeAnim1, fadeAnim2 , fadeAnim3];
  const [loadingStatusText, setLoadingStatusText] = useState([]);
  const [loadingStatus, dispatch] = useReducer(reducer, 0);
  
  let timeoutLoadingStatusID = null;

  useEffect(() => {
    if(loadingStatus <= loadingStatusText.length - 1){
      timeoutLoadingStatus();
    }
  });

  useEffect(() => {
    setLoadingStatusText(props.loadingStatusText);
  },[])

  // Animated
  const fadeIn = (fadeAnim) => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  };

  const fadeOut = (fadeAnim) => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start();
  };

  // page change
  // params (onNavigate, toPage, loadingStatusText, nv)
  const leavePage = () => {
    let toPage = props.toPage;

    if(toPage === 'VerifyCredential'){
      navigateToSuccess();
    } else if(toPage === 'Wallet'){
      navigateToWallet();
    }else if(toPage === 'CredentialDetail'){
      navigateToCredentailDetail();
    }else if(toPage === 'Success'){
      navigateToSuccess();
    }else{
      navigateToWallet();
    }
  }

  const navigateToSuccess = () => {
    clearTimeout(timeoutLoadingStatusID);
    props.nv.reset({
      index:1,
      routes: [
        {
          name:'DrawerContainer',
          state:{
            routes:[
              { name: 'Certificate' }
            ]
          }
        },
        { name:'Success' }
      ]
    });
  }

  const navigateToCredentailDetail = (data) => {
    console.log('props', props);
    clearTimeout(timeoutLoadingStatusID);
    props.nv.reset({
      index:1,
      routes: [
        {name:'DrawerContainer'},
        {
          name: "CredentialDetail",
          params:{
            from:'GetCredential',
            mergedDetailData: props.mergedDetailData
          }
        }
      ]
    });
  }

  const navigateToWallet = (data) => {
    clearTimeout(timeoutLoadingStatusID);
    props.nv.reset({
      index:1,
      routes: [
        {
          name:'DrawerContainer',
          state:{
            routes:[
              {
                name: 'Wallet'
              }
            ]
          }
        },
      ]
    });
  }

  const timeoutLoadingStatus = () => {
    timeoutLoadingStatusID = setTimeout(() => {
      dispatch({ type: "increment" });
      // fadeout????????????
      fadeOut(array[loadingStatus]);

      // fadein ?????????
      if(loadingStatus < 2)
        fadeIn(array[loadingStatus+1]);

      if(loadingStatus === loadingStatusText.length - 1){
        leavePage();
      }

    }, 3000);
  }

  //call API to get current proccessing status
  const getCurrentStatus = async () => {
    try{
      const configurationObject = {
        method: 'put',
        baseURL: ENDPOINT_BASE_URL,
        url: `api/v1/credential/${INITIAL_STATE.cred_id}/download`,
        headers:{
          'authorization':`Bearer ${props.loginToken}`,
          'Content-Type':'application/json'
        },
        data:{
          value: mergedDetailData,
          cred_req_json:JSON.stringify(INITIAL_STATE.cred_req_json)
        }
      };


      await axios(configurationObject)
      .then((response) => {
        console.log('download credential', response.data.cred_json);
        INITIAL_STATE.cred_json = response.data.cred_json;
      })

    }catch(error){
      console.log('error', error);
    }
  }

  const animatedText = loadingStatusText.map((item, index) => {
    return(
      <Animated.View key={item} style={[styles.textArea, {opacity:array[index]}]}>
        <Text style={styles.text}>{item}</Text>
      </Animated.View>
    )
  });
  
  return(
    <View style={styles.container}>
      <View>
        <ActivityIndicator size="large" />
      </View>
      {animatedText}
    </View>
  );
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20,
    justifyContent: "center",

  },
  text:{
    color:Colors.loadingTextLightBlue,
    textAlign:'center',
    fontSize:20
  },
  textArea: {
    position: 'absolute', top: 100, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'
  }

});

export default LoadingComponent;