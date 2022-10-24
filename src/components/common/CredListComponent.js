import React, {useEffect, useState} from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import { ListItem } from '@rneui/themed'
import { headline } from '../../styles/theme.style';

const CredListComponent = (props) => {
  const [list , setList] = useState([]);

  //現在收陣列資料
  useEffect(() => {
    setList(props.data);
  },[props.data]);


  // toPage: DefinitionDetail、CredentialDetail
  const onPressItem = (itemData) => {

    props.navigation.navigate({
      name:props.toPage,
      params:{
        from:props.from,
        credData:itemData
      }
    })
  }

const listContent = (
    <ScrollView style={styles.scrollView}>
    {
      list.length === 0 ? null : (
        list.map((item, index) => (
          <TouchableOpacity key={index} style={styles.card} onPress={()=>{onPressItem(item)}}>
            <ImageBackground source={require('../../assets/background/CredentailCardBG01.png')} resizeMode="stretch" style={styles.backgroundImage}>
              <View style={styles.header}>
                <View style={styles.nameArea}>
                    <Text style={styles.dateText}>Snowbridge Inc.</Text>
                </View>  
                <View style={styles.dateArea}>
                    <Text style={styles.dateText}>Sep 4, 2022</Text>
                </View>           
              </View>
              <View style={styles.body}>
                <Text style={headline.Headline3}>employee ID card</Text>
              </View>
              <View style={styles.footer}>
                <Text style={styles.dateText}>A12345678</Text>
              
              </View>
            </ImageBackground>
          </TouchableOpacity>     
      ))
    )
  }                     
  </ScrollView>
  )
   
  return listContent;
}


const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  card:{
    height:150,
    marginBottom:16,
    marginTop:24,
    borderRadius:6,
    backgroundColor:'white'
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    padding:16
  },
  header:{
    flex:1,
    justifyContent: "flex-start",
    flexDirection:'row',
  },
  nameArea:{
    flex:1,

  },  
  dateArea:{
    flex:1,
  },
  issuerName:{

  },
  dateText:{
    height:20,
    color:'black',
    textAlign:'right',
    paddingRight:5

  },
  body:{
    flex:3,

  },
  footer:{
    flex:1,

  },

  credentialName:{
    color:'black',
  }
});
  

export default CredListComponent;