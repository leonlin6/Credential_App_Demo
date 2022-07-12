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

    const [writeAttributes, setWriteAttributes] = useState([]);
    const [onlyDisplayAttributes, setOnlyDisplayAttributes] = useState([]);
    const [mergedWriteAttributes, setMergedWriteAttributes] = useState({});

    useEffect(() => {
        try{

            let credFormat = props.route.params.credentialInfo.credentialTemplate.credentialDefinition.format;
            let credValue = props.route.params.credentialInfo.credentialTemplate.value;

            let writeArray = [];
            let displayArray = [];

            //get user write attributes
            credFormat.forEach((item) => {
                if(item.user_write === true){
                    writeArray.push(item);
                }
            });

            // get display only attribute and merge its value
            credValue.forEach((it) => {
                displayArray.push(it);
            });

            setWriteAttributes(writeArray);
            setOnlyDisplayAttributes(displayArray);

        }catch(error){
            console.log(error);
        }
    },[])

    const handleInputChange = (text, item, index) => {
        let arr = [...writeAttributes];
        arr[index].value = text
        setMergedWriteAttributes(arr);
      };


    const onSubmit = () => {
        props.navigation.navigate({
            name:'CredentialDetailCheck',
            params:{
                mergedWriteAttributes: mergedWriteAttributes,
                onlyDisplayAttributes:onlyDisplayAttributes,
                credentialInfo: props.route.params.credentialInfo,
                cred_offer_json: props.route.params.cred_offer_json,
                cred_id: props.route.params.cred_id,
                cred_def_id: props.route.params.cred_def_id
            }
        });
    }
    
    const AttributesInput = () => {
        let temp = null;
        if(writeAttributes.length !== 0){
            temp = writeAttributes.map((item, index)=>{
                if(item.user_write === true){
                    return(
                    <View key={item.key} style={styles.section}>
                        <View style={styles.questionTitleArea}>
                            <Text style={styles.questionTitle}>{item.key}</Text>
                        </View>
                        <TextInput value={mergedWriteAttributes[item.key]} onChangeText={(text)=>{handleInputChange(text, item, index)}} style={styles.input} placeholder={`請輸入${item.key}`}></TextInput>
                    </View>
                    )
                }else{
                    return null;
                }
            })
        }
        
        return temp;
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleArea}>  
                <Text style={styles.title}>請輸入Attribute資料</Text>
            </View>
            <View style={styles.formArea}>
                {AttributesInput()}
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