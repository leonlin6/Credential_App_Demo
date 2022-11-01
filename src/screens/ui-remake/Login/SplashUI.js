import React from 'react'
import { 
  StyleSheet, 
  ImageBackground,
  Image 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'

// icon
import NameMark from '../../../assets/icons/SVG/NameMark.svg';


const SplashUI = () => {
  return(
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../../../assets/background/BG1.png')} resizeMode={'stretch'} style={styles.background}>
        <Image style={styles.logo} source={require('../../../assets/icons/PNG/Logo.png')}></Image>
        <NameMark></NameMark>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  background:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  logo:{
    width:257,
    height:257,
    marginBottom:24
  },
  linearRectA:{
    position:'absolute',
    width:187,
    height:187,
    top:0
  },
  linearRectB:{
    position:'absolute',
    width:187,
    height:187
  }

});
export default SplashUI;