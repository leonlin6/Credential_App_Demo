import React, {useEffect, useState, useRef} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { 
  View, 
  Text,  
  StyleSheet, 
  TouchableOpacity,
  ScrollView
} from 'react-native';


const MyRule = (props) => {

  const [showDrawerMenu, setShowDrawerMenu] = useState(false);
  const onMenuPress = () => {
    if(showDrawerMenu === true)
      props.navigation.closeDrawer();
    else
      props.navigation.openDrawer();
  }

  const onSelectRule = (templateId, templateName) => {
    props.navigation.navigate({
      name:'RuleDetail',
      params:{
        templateId:templateId,
        templateName: templateName
      }
    })
  }

  const Templates = () => {

    const templates = props.route.params.templates.map((item, index)=>{
      console.log('item', item);
      return(
        <TouchableOpacity key={`template${index}`} onPress={() => {onSelectRule(item._id, item.name)}}>
          <View style={styles.blockBtn}>
            <Text style={styles.btnText}>{item.name}</Text>
            <Ionicons name='ios-chevron-forward-outline' size={30} ></Ionicons>
          </View>
        </TouchableOpacity>
      )
    })

    return templates;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>請選擇查驗規則</Text>
      <ScrollView persistentScrollbar={true}>
        <Templates></Templates>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    fontSize: 25,
    justifyContent:'center',
  },

  title:{
    fontSize:30,
    textAlign:'left',
    marginVertical:20,
    marginLeft:10
  },
  blockBtn:{
    justifyContent:'space-between',
    flexDirection:'row',
    marginHorizontal:20,
    padding:25,
    borderWidth:1,
    borderColor:'white',
    borderRadius:5,
    shadowColor: '#171717',
    shadowOpacity: 0.56,
    shadowOffset: { width: 0, height: 2},
    shadowRadius: 20,
    elevation: 5,
    backgroundColor: 'white',
    marginBottom:15
  },
  btnText:{
    fontSize:20,

  }
});


export default MyRule;