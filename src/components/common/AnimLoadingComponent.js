import React, {useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Animated,
  Easing
} from "react-native";
import { Colors } from './Colors';


const AnimLoadingComponent = (props) => {
  var spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
    Animated.timing(spinAnim,{
      duration: 1000,
      toValue: 1,
      useNativeDriver: true,
      easing: Easing.linear,
    })).start();
  },[]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  // const animatedText = loadingStatusText.map((item, index) => {
  //   return(
  //     <Animated.View key={item} style={[styles.textArea, {opacity:array[index]}]}>
  //       <Text style={styles.text}>{item}</Text>
  //     </Animated.View>
  //   )
  // });
  
  return(
    <View style={styles.loadingWrap}>
      <Animated.Image 
        style={[styles.logo, {transform:[{rotate: spin}]}]}
        source={require('../../assets/icons/PNG/Loading.png')}
        resizeMode="stretch"
      ></Animated.Image>
    </View>
  );
}


const styles = StyleSheet.create({
  loadingWrap:{
    flex:1,
    padding:20,
    justifyContent:'center',
    alignItems:'center',
  },
  logo:{
    height:48,
    width:48,
    marginBottom:12
  },

});



export default AnimLoadingComponent;
