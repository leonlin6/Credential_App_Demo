import React, {useEffect, useState, useRef, useReducer} from 'react';
import { 
  ActivityIndicator, 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity,
  Animated
} from "react-native";
import { Colors } from './Colors';
import { CommonActions } from '@react-navigation/native';

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
  const array = [fadeAnim1, fadeAnim2 , fadeAnim3]
  const [loadingStatusText, setLoadingStatusText] = useState([]);
  const [loadingStatus, dispatch] = useReducer(reducer, 0);
  
  let timeoutLoadingStatusID = null;

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
  const pageChange = () => {
    console.log('props from', props.from);
    if(props.from === 'VerifyCredential')
      navigateToSuccess();
    else
      navigateToCredentailDetail();
  }


  const navigateToSuccess = () => {
    clearTimeout(timeoutLoadingStatusID);

    props.nv.navigate('Success', {from:'VerifyCredential'})
   


  }

  const navigateToCredentailDetail = (data) => {
    clearTimeout(timeoutLoadingStatusID);

    // props.nv.reset({
    //   routes: [{name: "Home"}]
    // });
    props.nv.navigate('CredentialDetail', {from:'getCredential'})
    // props.nv.navigate('Home')


    props.nv.reset({
      index:1,
      routes: [
        {name:'DrawerContainer'},
        {
        name: "CredentialDetail",
        params:{from:'getCredential'}
        }
      ]
    });

    // props.nv.dispatch(
    //   CommonActions.reset({
    //     index: 0,
    //     routes: [
    //       { name: 'Home' }
    //     ],
    //   })
    // );


  }


  const timeoutLoadingStatus = () => {
    timeoutLoadingStatusID = setTimeout(() => {
      dispatch({ type: "increment" });
      // fadeout現在這個
      fadeOut(array[loadingStatus]);

      // fadein 下一個
      if(loadingStatus < 2)
        fadeIn(array[loadingStatus+1]);

      if(loadingStatus === loadingStatusText.length - 1){
        pageChange();
      }

    }, 3000);
  }

  useEffect(() => {
    if(loadingStatus <= loadingStatusText.length - 1){
      timeoutLoadingStatus();
    }
  });

  useEffect(() => {
    // console.log('status', props.loadingStatusText);
    setLoadingStatusText(props.loadingStatusText);
  },[])

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
  container: {
    flex:1,
    justifyContent: "center",
  },
  text:{
    color:Colors.loadingTextLightBlue,
    textAlign:'center'
  },
  textArea: {
    position: 'absolute', top: 100, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'
  }
  });
  

export default LoadingComponent;