import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { content, headline, themeColor } from '../../../styles/theme.style';

// Icon
import HistoryBlackIcon from '../../../assets/icons/SVG/HistoryBlack.svg';
import SettingBlackIcon from '../../../assets/icons/SVG/SettingBlack.svg';
import BottomArrowIcon from '../../../assets/icons/SVG/BottomArrow.svg';
import RulesIcon from '../../../assets/icons/SVG/Rules.svg';

import { 
  View, 
  StyleSheet, 
  TouchableOpacity,
  Text,
  ImageBackground,
  ScrollView
} from 'react-native';
import CredListComponent from '../../../components/common/CredListComponent';
import LinearGradient from 'react-native-linear-gradient';
import { ListItem } from '@rneui/themed';
import {connect} from 'react-redux';
import indy from 'indy-sdk-react-native';
import { themeSpacing } from '@rneui/themed/dist/config/ThemeProvider';
import QRCode from 'react-native-qrcode-svg';
import {Picker} from '@react-native-picker/picker';

const Verify = (props) => {
  const [isSelectRuleShow, setIsSelectRuleShow] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState();

  const [attributesData, setAttributesData] = useState([{
    key:'Age',
    value:'20'
  },
  {
    key:'Gender',
    value:'MALE'
  },
  {
    key:'ID',
    value:'A123456789'
  },
  {
    key:'test1111',
    value:'1111'
  },
  {
    key:'test1111',
    value:'1111'
  },
  {
    key:'test1111',
    value:'1111'
  },
  {
    key:'test1111',
    value:'1111'
  },
  {
    key:'test1111',
    value:'1111'
  },
  {
    key:'test1111',
    value:'1111'
  },
  {
    key:'test1111',
    value:'1111'
  },
  {
    key:'test1111',
    value:'1111'
  },
  {
    key:'test1111',
    value:'1111'
  }
]);
  const [credData, setCredData] = useState([{
    cred_def_id:'test1111'
  },
  {
    cred_def_id:'test22222'
  },
  {
    cred_def_id:'test3333'
  },
]);

  useEffect(() => {
    const getCredFromWallet = async () => {
      console.log('====getCredFromWallet====');
      console.log('---props.walletHandle---',props.walletHandle);

      let response = await indy.proverGetCredentials(props.walletHandle);
      setCredData(response);
      console.log('----setCredData----' , response);
    }

    // getCredFromWallet();

  },[])

  const onClickSetting = () => {

  }

  const onClickHistory = () => {

  }
  const onSelectRule = () => {
    setIsSelectRuleShow(true);
  }

  const DetailList = () => {
    const mergedList = attributesData.map((item) => {
      return(
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
              <Text style={[content.Default, styles.key]}>{item.key}</Text>
              <Text style={[content.DefaultBold, styles.value]}>{item.value}</Text>
            </View>
          </ListItem.Content>
        </ListItem>
      )
    })
    return (
      <LinearGradient  
        colors={['rgba(124,255,255,0.1)', 'rgba(124,255,255,0.2)']} 
        start= {{x: 0, y: 1}}
        end= {{ x: 1, y: 1 }}
        style={styles.detailListArea}>
      {mergedList}
      </LinearGradient>
    );
  }

  const Divider = () => {
    return (
      <View style={styles.dividerArea}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
          <View>
            <Text style={[headline.Headline5, {width: 200, textAlign: 'center', color:themeColor.Dark60 }]}>Attributes to be verified</Text>
          </View>
          <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        </View>
      </View>
    );
  }

  // render page
  // 選擇rule先用套件做，樣式稍微不同，之後有空再改 2022.10.27 by Leon
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../../assets/background/BG2.png')} resizeMode="cover" style={styles.backgroundImage}>
        <View style={styles.header}>
          <View style={styles.headLineArea}>
            <View style={styles.titleArea}>
              <Text style={[headline.Headline1, styles.titleText]}>VERIFY</Text>
            </View>
            <View style={styles.btnArea}>
              <TouchableOpacity
                style={styles.btn}
                onPress={onClickSetting}>
                <SettingBlackIcon></SettingBlackIcon>
              </TouchableOpacity>          
              <TouchableOpacity
                style={styles.btn}
                onPress={onClickHistory}>
                <HistoryBlackIcon></HistoryBlackIcon>
              </TouchableOpacity>            
            </View>
          </View>
          <View style={styles.ruleDropdownArea}>
            {/* <TouchableOpacity style={styles.ruleDropdown} onPress={onSelectRule}>
              <View style={styles.dropDownIcon}>
                <RulesIcon></RulesIcon>
              </View>
              <View style={styles.dropdownText}>
                <Text style={content.DefaultBold}>Snowbridge Inc.</Text>
              </View>
              <View style={styles.dropDownDirectionIcon}>
                <BottomArrowIcon></BottomArrowIcon>
              </View>
            </TouchableOpacity> */}
            <View style={styles.dropDownIcon}>
              <RulesIcon></RulesIcon>
            </View>
            <Picker
              style={styles.ruleDropdown}
              selectedValue={selectedLanguage}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedLanguage(itemValue)
              }>

              <Picker.Item color={themeColor.SemanticHighlight} fontFamily='RedHatDisplay-Bold' label="Snowbridge Inc." value="Snowbridge Inc." />
              <Picker.Item color='black' fontFamily='Tahoma' label="Adidas Membership" value="Adidas Membership" />
              <Picker.Item color='black' style={{padding:30,fontFamily:'Helvetica'}} label="Startbucks membership" value="Startbucks membership" />
            </Picker>
          </View>
        </View>
        <View style={styles.body}>
          <ScrollView>
           <View style={styles.QRCodeArea}>
              <QRCode 
                value='1234'
                size={225}>
                
              </QRCode>
            </View>
            <Divider></Divider>
            <DetailList></DetailList>
            <View style={styles.spaceArea}></View>
          </ScrollView>
        </View>
      </ImageBackground>
      {
        isSelectRuleShow ? <SelectRuleComponent/> : null 
      }
    </View>
  );
}



const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center"
  },

  header:{
    flex:2,
    alignItems:'center'
  },
  headLineArea:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    marginTop: 24,
    marginBottom: 17
  },
  titleArea:{
    flex:4,
    paddingLeft:16
  },
  titleText:{
    color:'black'
  },
  btnArea:{
    flex:1,
    flexDirection:'row',
    paddingRight:16
  },
  btn:{
    marginRight:12
  },
  ruleDropdownArea:{
    justifyContent:'center',
    alignItems:'center',
    marginBottom: 24,
    flexDirection:'row',
    backgroundColor:'rgb(255,255,255)',
    width:345,

  },
  ruleDropdown:{
    width:300,
    height:50,
    paddingHorizontal:16,
    // borderRadius:38,
    backgroundColor:'rgba(255,255,255,0.8)',
    // justifyContent:'flex-end',
    flexDirection:'row',
    alignItems:'center',
  },
  dropDownIcon:{
    position:'absolute',
    zIndex:2,
    left: 10

  },
  dropdownText:{
    flex:8,
  },
  dropDownDirectionIcon:{
    flex:1
  },
  body:{
    flex:8,
    backgroundColor:'white',
    borderRadius:12,
    paddingTop: 50,
    paddingHorizontal:16

  },
  QRCodeArea:{
    alignItems:'center',
    marginBottom:25
  },
  dividerArea:{
    height:30,

  },
 attributesArea:{
    alignItems:'center',
    marginTop:12

  },
  listItem:{
    margin: 12,
    marginBottom: 0,
    padding: 0,
    paddingBottom: 12
  },
  subtitleView: {
    flexDirection: 'row',
    justifyContent:'space-between',
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
  spaceArea:{
    height:110
  }
});

const mapStateToProps = (state) => {  
  return {
      walletHandle: state.walletHandle,
  };
}

export default connect(mapStateToProps)(Verify);