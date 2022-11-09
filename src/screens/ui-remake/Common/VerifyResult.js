import React, {useEffect, useState} from 'react';
import { content, headline, themeColor } from '../../../styles/theme.style';

import { 
  View, 
  StyleSheet, 
  TouchableOpacity,
  Text,
  ScrollView,
  ImageBackground,
  TextInput
} from 'react-native';
import CredListComponent from '../../../components/common/CredListComponent';
import LinearGradient from 'react-native-linear-gradient';
import { ListItem } from '@rneui/themed';
import {connect} from 'react-redux';
import indy from 'indy-sdk-react-native';

// icon
import Success from '../../../assets/icons/SVG/Success.svg';
import Error from '../../../assets/icons/SVG/Error.svg';


const VerifyResult = (props) => {
  const [result, setResult] = useState(false);
  const [attributesData, setAttributesData] = useState([]);


  const onBack = () => {
    props.navigation.reset({
      index:0,
      routes: [
        {
          name:'TabContainer',
          state:{
            routes:[
              {
                name: 'Verify'
              }
            ]
          }
        },
      ]
    });
  }


  const DetailList = () => {
    const revealed_attr_groups = props.route.params.verifyResultData.revealed_attr_groups;
    console.log('---revealed_attr_groups---',revealed_attr_groups);
    const ruleList = Object.keys(revealed_attr_groups).map((item, index) => {
      console.log('---policyValue item----', item)
      if(typeof item !== 'undefined'){

        const policyValue = revealed_attr_groups[item].values;

        const tempList = Object.keys(policyValue).map((ruleKey, ruleIndex) => {
          return (
            <ListItem 
              containerStyle={styles.listItem}
              linearGradientProps={{
                colors: ['rgba(124,255,255,0.1)', 'rgba(124,255,255,0.2)'],
                start: { x: 0, y: 1 },
                end: { x: 1, y: 1 },
              }}
              ViewComponent={LinearGradient}
            >
              <ListItem.Content>
                <View style={styles.subtitleView}>
                  <Text style={[content.Default, styles.key]}>{ruleKey}</Text>
                <Text style={[content.DefaultBold, styles.value]}>{policyValue[ruleKey].raw}</Text>
                </View>
              </ListItem.Content>
            </ListItem>
          )
        })
 
        return tempList;
      }else{
        return null;
      }

    })

    return (
      <LinearGradient  
        colors={['rgba(124,255,255,0.1)', 'rgba(124,255,255,0.2)']} 
        start= {{x: 0, y: 1}}
        end= {{ x: 1, y: 1 }}
        style={styles.detailListArea}>
      {ruleList}
      </LinearGradient>
    );
  }

  const Divider = () => {
    return (
      <View style={styles.dividerArea}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
          <View>
            <Text style={[headline.Headline5, {width: 200, textAlign: 'center', color:themeColor.DarkDark60 }]}>Attributes to be verified</Text>
          </View>
          <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        </View>
      </View>
    );
  }

  const SuccessResult = () => {
    return (
      <ImageBackground source={require('../../../assets/background/BG3.png')} style={styles.container}>
        <ImageBackground source={require('../../../assets/background/BG3.png')} resizeMode="stretch" style={styles.header}>
          <View style={styles.titleArea}>
            <Success></Success>
            <Text style={[headline.Headline1, styles.successText]}>SUCCESS</Text>
          </View>
        </ImageBackground>

        <View style={styles.body}>
          <ScrollView>
            <ListItem containerStyle={styles.listItem}>
              <ListItem.Content>
                <View style={styles.subtitleView}>
                  <Text style={[content.Default, styles.key]}>Title</Text>
                  <Text style={[content.DefaultBold, styles.value]}>Snowbridge Door License</Text>
                </View>
              </ListItem.Content>
            </ListItem>
            <ListItem containerStyle={styles.listItem}>
              <ListItem.Content>
                <View style={styles.subtitleView}>
                  <Text style={[content.Default, styles.key]}>Verified Date</Text>
                  <Text style={[content.DefaultBold, styles.value]}>2022/06/06 16:04:46</Text>
                </View>
              </ListItem.Content>
            </ListItem>
            <ListItem containerStyle={styles.listItem}>
              <ListItem.Content>
                <View style={styles.subtitleView}>
                  <Text style={[content.Default, styles.key]}>Verified By</Text>
                  <Text style={[content.DefaultBold, styles.value]}>Snowbridge Inc.</Text>
                </View>
              </ListItem.Content>
            </ListItem>

            <Divider/>
            <DetailList></DetailList>
          </ScrollView>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.btn} onPress={onBack}>
            <LinearGradient  
              colors={['rgb(130,255,150)', 'rgb(124,255,255)']} 
              start= {{x: 0, y: 1}}
              end= {{ x: 1, y: 1 }}
              style={styles.btn} 
            >
              <Text style={[headline.Headline4, {color:'black'}]}>Back to Home</Text>
            </LinearGradient>
          </TouchableOpacity>     
        </View>
      </ImageBackground>
    )
  }


  const FailResult = () => {
    return (
      <ImageBackground source={require('../../../assets/background/BG4.png')} resizeMode="cover"  style={styles.container}>
        <ImageBackground source={require('../../../assets/background/BG4.png')} resizeMode="cover" style={styles.header}>
          <View style={styles.titleArea}>
            <Error></Error>
            <Text style={[headline.Headline1, styles.failText]}>FAILED</Text>
          </View>
        </ImageBackground>

        <View style={styles.body}>
          <ScrollView>
            <ListItem containerStyle={styles.listItem}>
              <ListItem.Content>
                <View style={styles.subtitleView}>
                  <Text style={[content.Default, styles.key]}>Title</Text>
                  <Text style={[content.DefaultBold, styles.value]}>Snowbridge Door License</Text>
                </View>
              </ListItem.Content>
            </ListItem>
            <ListItem containerStyle={styles.listItem}>
              <ListItem.Content>
                <View style={styles.subtitleView}>
                  <Text style={[content.Default, styles.key]}>Verified Date</Text>
                  <Text style={[content.DefaultBold, styles.value]}>2022/06/06 16:04:46</Text>
                </View>
              </ListItem.Content>
            </ListItem>
            <ListItem containerStyle={styles.listItem}>
              <ListItem.Content>
                <View style={styles.subtitleView}>
                  <Text style={[content.Default, styles.key]}>Verified By</Text>
                  <Text style={[content.DefaultBold, styles.value]}>Snowbridge Inc.</Text>
                </View>
              </ListItem.Content>
            </ListItem>

            <Divider/>
            <DetailList></DetailList>
          </ScrollView>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.btn} onPress={onBack}>
            <LinearGradient  
              colors={['rgb(130,255,150)', 'rgb(124,255,255)']} 
              start= {{x: 0, y: 1}}
              end= {{ x: 1, y: 1 }}
              style={styles.btn} 
            >
              <Text style={[headline.Headline4, {color:'black'}]}>Back to Home</Text>
            </LinearGradient>
          </TouchableOpacity>     
        </View>
      </ImageBackground>
    )
  }

  // render page
    if(props.route.params.verifyResultData.verifyResult){
      return <SuccessResult></SuccessResult>;
    }else{
      return <FailResult></FailResult>;
    }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  backgroundImage: {
    flex: 1,
  },
  header:{
    flex:1,
    alignItems:'center',
    justifyContent: "center",
    backgroundColor:'rgb(242,250,250)',
  },
  titleArea:{
    alignItems:'center',
    justifyContent: "center",
  },
  successText:{
    color: themeColor.DarkDark,
  },
  failText:{
    color: themeColor.SemanticWarningRed,
  },
  body:{
    flex:2,
    backgroundColor:'white',
    paddingTop: 24,
    paddingHorizontal:16,
    borderTopLeftRadius:12,
    borderTopRightRadius:12,
    
  },
  listItem:{
    margin: 12,
    padding: 0,
  },
  infoArea:{
    width:345,
    padding:16,
    borderRadius:6,
    marginBottom:24
  },
  infoText:{

  },
  attributesArea:{
    alignItems:'center',
    marginTop:12

  },

  subtitleView: {
    justifyContent:'space-between',
    flexDirection: 'row',
  },  
  contentView: {
    flexDirection: 'row',
  },
  subtitleViewBtn:{
    flexDirection: 'row',
    justifyContent:'flex-end',
  },
  key:{
    flex:1,
    textAlign:'left',
    color:'rgb(123,128,139)'
  },
  value:{
    flex:2,
    textAlign:'right',
    color:'rgb(79,85,101)'
  },
  dividerArea:{
    height:30,
    marginTop:24,
    marginBottom:12
  },
  footer:{
    backgroundColor:'rgb(255,255,255)',
    height:90,
    justifyContent:'space-evenly',
    flexDirection:'row',
    alignItems:'center',
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.56,
    shadowOffset: { width: -4, height: -4},
    shadowRadius: 13,
    elevation: 15,
  },
  btn:{
    width:345,
    height:50,
    borderRadius:8,
    alignItems:'center',
    justifyContent:'center'
  },

});

const mapStateToProps = (state) => {  
  return {
      walletHandle: state.walletHandle,
  };
}

export default connect(mapStateToProps)(VerifyResult);