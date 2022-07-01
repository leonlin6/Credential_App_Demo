import React, {useState, useEffect} from 'react';
import { 
  View, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity,
  Text,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {LocaleConfig} from 'react-native-calendars';


const Setting = (props) => {

    const onSubmit = () => {
        props.navigation.navigate('CredentialDetailCheck');
    }

    return (
        <View style={styles.container}>
            <Text>TEST</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'white',
    },
    titleArea:{
        padding:20,
        flex:1
    },
    title:{
        fontSize:25
    },
    formArea:{
        flex:8,
        paddingHorizontal:15,
        backgroundColor: 'white',
        marginBottom:15
    },
    section:{
        marginBottom:20
    },
    questionTitleArea:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    questionTitle:{
        fontSize:20
    },
    input:{
        height: 30,
        borderBottomWidth: 1,
        paddingVertical:0,
        paddingLeft:10
    },
    btnArea:{
        alignItems:'center',

        flex:1,
      },
    btn:{
        width:300,
        height:40,
        backgroundColor:'#2196f3',
        borderRadius:10,
        justifyContent:'center',
        shadowColor: '#171717',
        shadowColor: 'black',
        shadowOpacity: 0.56,
        shadowOffset: { width: 0, height: 2},
        shadowRadius: 20,
        elevation: 5,
    },
    btnText:{
        color:'white',
        fontSize:20,
        textAlign:'center'
    },
});

export default Setting;