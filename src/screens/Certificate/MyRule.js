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

  const onSelectRule = (rule) => {
    console.log('rule', rule);
    props.navigation.navigate({
      name:'RuleDetail',
      params:{
        selectedRule:rule
      }
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>請選擇查驗規則</Text>
      <ScrollView persistentScrollbar={true}>
        <TouchableOpacity onPress={() => {onSelectRule('幻武小學學生會')}}>
          <View style={styles.blockBtn}>
              <Text style={styles.btnText}>幻武小學學生會</Text>
              <Ionicons name='ios-chevron-forward-outline' size={30} ></Ionicons>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {onSelectRule('Combuy喝到飽優惠活動')}}>
          <View style={styles.blockBtn}>
            <Text style={styles.btnText}>Combuy喝到飽優惠活動</Text>
            <Ionicons name='ios-chevron-forward-outline' size={30} ></Ionicons>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {onSelectRule('雪喬股份有限公司職員')}}>
            <View style={styles.blockBtn}>
                <Text style={styles.btnText}>雪喬股份有限公司職員</Text>
                <Ionicons name='ios-chevron-forward-outline' size={30} ></Ionicons>
            </View>
        </TouchableOpacity>
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