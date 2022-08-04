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
// redux
import {connect} from 'react-redux';


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
      navigateToVerifyResult();
    } else if(toPage === 'Wallet'){
      navigateToWallet();
    }else if(toPage === 'CredentialDetail'){
      navigateToCredentailDetail();
    }else if(toPage === 'VerifyResult'){
      navigateToVerifyResult();
    }else{
      navigateToWallet();
    }
  }

  const navigateToVerifyResult = () => {
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
        { name:'VerifyResult' }
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
      // fadeout現在這個
      fadeOut(array[loadingStatus]);

      // fadein 下一個
      if(loadingStatus < 2)
        fadeIn(array[loadingStatus+1]);

      //leave page
      if(loadingStatus === loadingStatusText.length - 1){
        leavePage();
      }

    }, 3000);
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

const mapStateToProps = (state) => {  
  return {
      loginToken: state.loginToken,
  };
}

export default connect(mapStateToProps)(LoadingComponent);
