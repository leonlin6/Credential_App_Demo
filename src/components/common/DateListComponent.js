import React, {useEffect, useState} from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity,
} from 'react-native';
import { ListItem } from '@rneui/themed'
import Ionicons from 'react-native-vector-icons/Ionicons';

const DateListComponent = (props) => {
  const [list , setList] = useState([]);

  //現在收陣列資料
  useEffect(() => {
    setList(props.data);
  },[props.data]);


  // pageType: DefinitionDetail、CredentialDetail
  const onPressItem = (item) => {
    console.log('===slectCredentialData', item);
    props.navigation.navigate({
      name:props.toPage,
      params:{
        from:props.from,
        credData:item
      }
    })
  }

  const listContent = 
  (
    <View style={{paddingHorizontal:20}}>
      <Text style={{fontSize:30}}> 2022</Text>

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
                <Ionicons name="search" size={30} color='black'></Ionicons>
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
    flex:8,

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
  

export default DateListComponent;