import React, {useEffect, useState} from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity,
} from 'react-native';
import { ListItem } from '@rneui/themed'

const ListComponent = (props) => {
  const [list , setList] = useState([]);

  useEffect(() => {
    setList(props.data);
  },[props.data]);


  // pageType: DefinitionDetail、CredentialDetail
  const onPressItem = (item) => {
    props.navigation.navigate({
      name:props.toPageType,
      params:{
        from:props.from,
        credData:item
      }
    })
  }

const listContent = props.displayType === 'card' ? (
    <ScrollView style={styles.scrollView}>
      {
        list.length === 0 ? 
        (
          null
        )
        :
        (
          list.map((item, index) => (
            <TouchableOpacity key={index} style={styles.card} onPress={()=>{onPressItem(item)}}>
              <View style={styles.dateArea}>
                  <Text style={styles.dateText}>2022/06/06</Text>
              </View>
              <View style={styles.nameArea}>
                  <Text style={styles.credentialName}>{item.cred_def_id}</Text>
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
          list.map((item, index) => (
            <TouchableOpacity key={index} onPress={()=>{onPressItem(item)}} >      
              <ListItem topDivider bottomDivider>
                <ListItem.Content>
                    <ListItem.Title>
                      {item.cred_def_id}
                    </ListItem.Title>
                    <ListItem.Subtitle>2022/06/06</ListItem.Subtitle>
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