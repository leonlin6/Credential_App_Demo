import React, {useEffect, useState} from 'react';
import { content, headline, themeColor } from '../../../styles/theme.style';

import { 
  View, 
  StyleSheet, 
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput
} from 'react-native';
import CredListComponent from '../../../components/common/CredListComponent';
import LinearGradient from 'react-native-linear-gradient';
import { ListItem } from '@rneui/themed';
import {connect} from 'react-redux';
import DateListComponent from '../../../components/common/DateListComponent';
// Icon
import SearchIcon from '../../../assets/icons/SVG/Search.svg';

const CredentialHistory = (props) => {

  const handleInputChange = (text, item, index) => {

  };


  // render page
  return (
    <View style={styles.container}>
      <View style={[{overflow:'hidden'}]}>
        <View style={[styles.header]}>
          <View style={[styles.searchArea]}>
            <SearchIcon style={styles.searchIcon}></SearchIcon>
            <TextInput placeholder='Search by name' style={[styles.input, content.Default]}></TextInput>
          </View>
        </View>
      </View>
      <View style={styles.body}>
        <DateListComponent navigation={props.navigation}></DateListComponent>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'rgb(242,250,250)',

  },
  header:{
    alignItems:'center',
    justifyContent: "center",
    backgroundColor:'rgb(255,255,255)',
    height:85,
    elevation:5
  },
  searchArea:{
    height:50,

    backgroundColor:'#F6F7F7',
    paddingLeft:16,
    borderRadius:8,
    flexDirection:'row',
    alignItems:'center'

  },
  searchIcon:{
    marginRight:12
  },
  input: {
    height: 25,
    width:275,
    backgroundColor:'rgb(246,247,247)',
    padding:0,
    margin:0,
  },
  body:{
    backgroundColor:'rgb(242,250,250)',
    paddingTop: 24,
  },
  listItem:{
    padding: 0,
    backgroundColor:'white',
    marginBottom:24
  },
  subtitleView: {
    flexDirection: 'row',
  },  

});

const mapStateToProps = (state) => {  
  return {
      walletHandle: state.walletHandle,
  };
}

export default connect(mapStateToProps)(CredentialHistory);