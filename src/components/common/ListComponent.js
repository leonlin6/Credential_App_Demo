import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity,
  Dimensions,
  Linking,
  Button
} from 'react-native';
import { ListItem, Avatar } from '@rneui/themed'
import AsyncStorage from "@react-native-async-storage/async-storage";



const ListComponent = (props) => {
      const [list , setList] = useState([]);
      useEffect(() => {
       
        const getData = async () => {
          const data = await AsyncStorage.getItem('detailData');
          const itemParse = JSON.parse(data);

          setList([itemParse]);
        }

        getData();


      },[]);

    // const list = [
    //     {
    //       name: 'Customized Credential Name by Individual',
    //       avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    //       subtitle: 'Vice President',
    //       issued_date: '2022/04/06'
    //     },
    //     {
    //       name: 'Customized Credential Name by Individual',
    //       avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    //       subtitle: 'Vice Chairman',
    //       issued_date: '2023/03/03'

    //     },
    //     {
    //       name: 'Customized Credential Name by Individual',
    //       avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    //       subtitle: 'Vice Chairman',
    //       issued_date: '2023/03/03'

    //     },
    //     {
    //       name: 'Customized Credential Name by Individual',
    //       avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    //       subtitle: 'Vice Chairman',
    //       issued_date: '2023/03/03'

    //     },
    //     {
    //       name: 'Customized Credential Name by Individual',
    //       avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    //       subtitle: 'Vice Chairman',
    //       issued_date: '2023/03/03'

    //     },
    //     {
    //       name: 'Customized Credential Name by Individual',
    //       avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    //       subtitle: 'Vice Chairman',
    //       issued_date: '2023/03/03'

    //     },
    //     {
    //       name: 'Customized Credential Name by Individual',
    //       avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    //       subtitle: 'Vice Chairman',
    //       issued_date: '2023/03/03'

    //     },
    //     {
    //       name: 'Customized Credential Name by Individual',
    //       avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    //       subtitle: 'Vice Chairman',
    //       issued_date: '2023/03/03'

    //     },
    //     {
    //       name: 'Customized Credential Name by Individual',
    //       avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    //       subtitle: 'Vice Chairman',
    //       issued_date: '2023/03/03'

    //     },
    //     {
    //       name: 'Customized Credential Name by Individual',
    //       avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    //       subtitle: 'Vice Chairman',
    //       issued_date: '2023/03/03'

    //     },
    //     {
    //       name: 'Customized Credential Name by Individual',
    //       avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    //       subtitle: 'Vice Chairman',
    //       issued_date: '2023/03/03'

    //     }
    //   ] 

    // pageType: DefinitionDetail、CredentialDetail
    const onPressItem = () => {
      props.navigation.navigate({
        name:props.toPageType,
        params:{
          from:props.from
        }
      })
    }

    const listContent = props.displayType === 'card' ? (
      <ScrollView style={styles.scrollView}>
        {
          list[0] === null ? 
          (
            null
          )
          :
          (
            list.map((l, i) => (
              <TouchableOpacity style={styles.card} onPress={onPressItem}>
                <View style={styles.dateArea}>
                    <Text style={styles.dateText}>{l.發證時間}</Text>
                </View>
                <View style={styles.nameArea}>
                    <Text style={styles.credentialName}>{l.憑證名稱}</Text>
                </View>                    
              </TouchableOpacity>     
            ))
          )
        }                     
      </ScrollView>
    )  
    :
    (
      <View>
        {
          list[0] === null ? 
          (
            null
          )
          :
          (
            list.map((l, i) => (
              <TouchableOpacity key={i} onPress={onPressItem} >      
                <ListItem topDivider bottomDivider>
                  {/* <Avatar source={{uri: l.avatar_url}} /> */}
                  <ListItem.Content>
                      <ListItem.Title>
                      {l.憑證名稱}
                      </ListItem.Title>
                      <ListItem.Subtitle>{l.發證時間}</ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Chevron 
                  />
                </ListItem>
              </TouchableOpacity>      
            ))
          )
        }
      </View>
    )

  return listContent;
}

const styles = StyleSheet.create({
    container:{
      flex:1,
    },
    searchArea:{
      flex:1,
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
    },
    inputWrap:{
      flex:9,
      borderRadius:30,
      flexDirection:'row',
      borderWidth:1,
      marginHorizontal:15,
      paddingLeft:5,
      paddingTop:3,
      height:40
    },
    searchIcon:{
      flex:1
    },
    searchInput:{
      paddingVertical: 0 ,
      height:30,
      fontSize:18
  
    },
    displayBtn:{
      flex:1
    },
    listArea:{
      flex:5,
  
    },
    card:{
        height:150,
        margin:20,
        marginTop:0,
        backgroundColor:'#215cf3',
        paddingTop: 20,
        borderRadius:20,
        
  
    },
    dateArea:{
      backgroundColor:'#2196f3',
  
    },
    dateText:{
      height:20,
  
      color:'white',
      textAlign:'right',
      paddingRight:5
  
    },
    nameArea:{
      flex:1,
      width:200,
      justifyContent:'flex-end',
      paddingLeft:10,
      paddingBottom: 10
    },
    credentialName:{
      color:'white',
    }
    
  
  });
  

export default ListComponent;