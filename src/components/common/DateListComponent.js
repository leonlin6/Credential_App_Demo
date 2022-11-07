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
import { headline, themeColor, hint, content } from '../../styles/theme.style';
import { color } from 'react-native-reanimated';
// Icon
import RightArrowIcon from '../../assets/icons/SVG/RightArrow.svg';


const DateListComponent = (props) => {
  const [list , setList] = useState([]);
  const [searchText , setSearchText] = useState();

  console.log('list',list);
  const testData = [
    {
      date:'2022/1/5',
      credName:'Silver Membership',
      verifier:'Snowbridge Inc.',
      result:'Success'
    },
    {
      date:'2022/2/28',
      credName:'Employee ID card',
      verifier:'Snowbridge Inc.',
      result:'Fail'
    },    
    {
      date:'2021/12/5',
      credName:'Employee ID card',
      verifier:'Snowbridge Inc.',
      result:'Success'
    },    
    {
      date:'2020/7/5',
      credName:'Employee ID card',
      verifier:'Snowbridge Inc.',
      result:'Fail'
    },
    {
      date:'2021/3/1',
      credName:'Employee ID card',
      verifier:'Snowbridge Inc.',
      result:'Fail'
    },    
    {
      date:'2020/11/19',
      credName:'Employee ID card',
      verifier:'Snowbridge Inc.',
      result:'Success'
    },
  ]

  //現在收陣列資料
  useEffect(() => {
    // setList(props.data);

    //use for test
    setList(handleDate(testData));
  },[props.data]);


  // do search filter
  useEffect(() => {

    setList(handleDate(testData));
  },[searchText]);

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

    data.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    })
    console.log('---data---',data);

    const temp = data.map((item)=>{
      const d = item.date.split('/');
      return {
        credName:item.credName,
        year: d[0],
        month: getMonthText(d[1]),
        day: d[2],
        credName:item.credName,
        verifier:item.verifier,
        result:item.result
      }
    })
    console.log('---temp---',temp);
    return temp;
  }



  // pageType: DefinitionDetail、CredentialDetail
  const onPressItem = (item) => {
    console.log('===slectCredentialData', item);
    props.navigation.navigate({
      name:'HistoryResult',
      params:{
        credData:item
      }
    })
  }

  const handleCurrentYear = () => {
    return 'Sep 2022';
  }

  const listContent = 
  (
    <>
      <Text style={[styles.dateTitle, headline.Headline5]}>Sep 2022</Text>

      {
        list === undefined ? null : (
          list.map((item, index) => (
            <TouchableOpacity key={index} onPress={()=>{onPressItem(item)}} >      
              <ListItem  >
              <View style={styles.dateIcon}>
                <Text style={[headline.Headline3, styles.day]}>{item.day}</Text>
                <Text style={[hint.Default, styles.month]}>{item.month}</Text>
              </View>
                <ListItem.Content>
                  <ListItem.Title style={[styles.itemTitle ,headline.Headline4]}>
                  {item.credName}
                  </ListItem.Title>
                  <ListItem.Subtitle style={[styles.itemSubtitle ,content.Small]}>
                  {item.credName}
                  </ListItem.Subtitle>
                </ListItem.Content>
                <RightArrowIcon></RightArrowIcon>
              </ListItem>
            </TouchableOpacity>      
          ))
        )
      }
    </>
  )

  return listContent;
}


const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  dateIcon:{
    borderRadius:10,
    width:50,
    height:50,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
  },
  day:{
    color:themeColor.SemanticHighlight,

  },
  month:{
    color:themeColor.SemanticHighlight,

  },
  dateTitle:{
    color:themeColor.SemanticHighlight,
    marginLeft:16,
    marginBottom:8
  },
});
  

export default DateListComponent;