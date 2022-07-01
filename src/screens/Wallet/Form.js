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


const Form = (props) => {

    const [mailValue, setMailValue] = useState('');
    const [phoneValue, setPhoneValue] = useState('');

    const onSubmit = () => {

        props.navigation.navigate('CredentialDetailCheck', {
            '電子信箱': mailValue,
            '電話號碼': phoneValue
          });
    }


    
    return (
        <View style={styles.container}>
            <View style={styles.titleArea}>  
                <Text style={styles.title}>請輸入個人資料</Text>
            </View>
            <View style={styles.formArea}>
                <View style={styles.section}>
                    <View style={styles.questionTitleArea}>
                        <Text style={styles.questionTitle}>電子信箱</Text>
                    </View>
                    <TextInput onChangeText={(e)=>setMailValue(e)} style={styles.input} placeholder='請輸入電子信箱'></TextInput>
                </View>
                <View style={styles.section}>
                    <View style={styles.questionTitleArea}>
                        <Text onChange={setPhoneValue} style={styles.questionTitle}>電話號碼</Text>
                    </View>
                    <TextInput keyboardType="numeric" onChangeText={(e)=>setPhoneValue(e)} style={styles.input} placeholder='請輸入電話號碼'></TextInput>
                </View>
            </View>
            <View style={styles.btnArea}>
                <TouchableOpacity onPress={onSubmit} style={styles.btn}>
                    <Text style={styles.btnText}>送出</Text>
                </TouchableOpacity>
            </View>
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

export default Form;