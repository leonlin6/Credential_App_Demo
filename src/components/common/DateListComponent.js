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
  const [currentYear , setCurrentYear] = useState();

  console.log('list',list);
  const testData = [
    {
      date:'2022/1/5',
      credName:'雪喬股份有限公司門禁'
    },
    {
      date:'2022/2/28',
      credName:'雪喬股份有限公司門禁'
    },    
    {
      date:'2021/12/5',
      credName:'雪喬股份有限公司門禁'
    },    
    {
      date:'2020/7/5',
      credName:'雪喬股份有限公司門禁'
    },
    {
      date:'2021/3/1',
      credName:'雪喬股份有限公司門禁'
    },    
    {
      date:'2020/11/19',
      credName:'雪喬股份有限公司門禁'
    },
  ]

  //現在收陣列資料
  useEffect(() => {
    // setList(props.data);

    //use for test
    setList(handleDate(testData));
  },[props.data]);

  const getMonthText = (month) => {
    switch(month){
      case '1':
        return 'JAN';
      case '2':
        return 'FEB';
      case '3':
        return 'MAR';
      case '4':
        return 'APR';
      case '5':
        return 'MAY';       
      case '6':
        return 'JUN';       
      case '7':
        return 'JUL';       
      case '8':
        return 'AUG';       
      case '9':
        return 'SEP';   
      case '10':
        return 'OCT';  
      case '11':
        return 'NOV';  
      case '12':
        return 'DEC';                                          
    }
  }

  const handleDate = (data) => {
    const ttt = data.map((item)=>{
      const d = item.date.split('/');
      return {
        credName:item.credName,
        year: d[0],
        month: getMonthText(d[1]),
        day: d[2]
      }
    })

    ttt.sort((a, b) => {
      return parseInt(b.year) - parseInt(a.year);
    })
    console.log('---ttt---',ttt);
    return ttt;
  }



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

  const handleCurrentYear = () => {
    return '2022';
  }

  const listContent = 
  (
    <View style={{paddingHorizontal:20}}>
      <Text style={{fontSize:30}}> {handleCurrentYear()}</Text>

      {
        list === undefined ? 
        (
          null
        )
        :
        (
          list.map((item, index) => (
            <TouchableOpacity key={index} onPress={()=>{onPressItem(item)}} >      
              <ListItem topDivider bottomDivider>
              <View style={styles.dateIcon}>
                <Text style={styles.day}>{item.day}</Text>
                <Text style={styles.month}>{item.month}</Text>
              </View>
                <ListItem.Content>
                    <ListItem.Title>
                    {item.credName}
                    </ListItem.Title>
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
  dateIcon:{
    borderWidth:1,
    borderRadius:10,
    width:50,
    height:50,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
  },

});
  

export default DateListComponent;