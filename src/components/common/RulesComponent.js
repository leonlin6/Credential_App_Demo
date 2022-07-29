import React, {useEffect, useState} from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity,
} from 'react-native';
import { ListItem } from '@rneui/themed'

const RulesComponent = (props) => {
  if(typeof(props.list) !== 'undefined'){
    return (
      <View>
        {
          props.list.mergedAttribute.map((item, index)=>{
            if(index === 0){
              return(
                <ListItem key={index} containerStyle={{backgroundColor:'#F4F4F4'}}>
                  <ListItem.Content>
                    <View style={styles.subtitleView}>
                      <Text style={styles.key}>查驗規則</Text>
                      {
                        item.hasPredicate ? (
                          <Text style={styles.value}>{`${item.name} ${item.type} ${item.value}`}</Text>
                        )
                        :
                        (
                          <Text style={styles.value}>{item.name}</Text>
                        )
                      }
                    </View>
                  </ListItem.Content>
                </ListItem>
              )
            }else{
              return(
              <ListItem key={index} containerStyle={{backgroundColor:'#F4F4F4'}}>
                <ListItem.Content>
                  <View style={styles.subtitleView}>
                    {
                      item.hasPredicate ? (
                        <Text style={styles.value}>{`${item.name} ${item.type} ${item.value}`}</Text>
                      )
                      :
                      (
                        <Text style={styles.value}>{item.name}</Text>
                      )
                    }
                  </View>
                </ListItem.Content>
              </ListItem>
              )
            }
          })
        }
      </View>
    )
  }else{
    return(
      null
    )
  }
}


const styles = StyleSheet.create({
  container:{
    padding:20,
    flex:1
  },
  imageArea:{
    flex:2,
    justifyContent:'center',
    alignItems:'center'
  },

  image:{
    height:150,
    width:200,
    margin:20,
    marginTop:0,
    paddingTop: 20,
  },
  credentialName:{
    color:'white',
  },
  detailArea:{
    flex:4,
  },
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5,
    justifyContent:'space-between',
    borderBottomWidth:1,
  },
  ratingImage: {
    height: 19.21,
    width: 100
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey'
  },
  key:{
    flex:1,
    textAlign:'left',
  },
  value:{
    flex:1,
    textAlign:'right'
  },
  buttonArea:{
    flex:1,
    marginTop: 30,
    paddingTop:20,
    borderTopWidth:1,
    borderTopColor:'gray',

    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row'
  },


});
  

export default RulesComponent;