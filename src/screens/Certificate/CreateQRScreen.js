import React, {useState, useEffect, useRef} from 'react';
import { 
  View, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity,
  Text,
  ScrollView,
  Animated
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

import {Colors} from '../../components/common/Colors';

import * as Animatable from 'react-native-animatable';


const CreateQRScreen = (props) => {
  const [data, setData] = useState([{
    key_name:'',
    rule_toggle:true,
    format:'number',
    condition:'equal',
    condition_value:0,
    isFocus:false,
  }]);

  const scrollViewRef = useRef();
  const [canlendarShow, setCanlendarShow]=useState(false);

  const onGenerate = () => {
    props.navigation.navigate('QRCode');
  }
  
  const onAddCard = () => {
    scrollViewRef.current.scrollToEnd({ animated: true });

    setData([...data, {
      key_name:'',
      rule_toggle:true,
      format:'number',
      condition:'equal',
      condition_value:0,
      isFocus:false
    }]);
  }

  const Cards = data.map((element, index) => {
    return(
      <View>
        <Text>TEST</Text>
      </View>
    );
  });

  const calendarArea = (
    <View style={styles.container}>
      <Animatable.View 
        animation="fadeInUpBig"
        style={styles.calendar}>
        <Calendar
          // Initially visible month. Default = now
          current={'2022-05-19'}
          onDatPress={(response) => {console.log(response)}}
          onDayPress={day => {
            setCanlendarShow(!canlendarShow)
          }}
        />  
      </Animatable.View>
    </View>
  )

  const ruleArea = (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleArea}>
          <Text style={styles.title}>建立查驗規則</Text>
          <Ionicons  style={{lineHeight:30}}  name={'help-circle'} size={30} color={'black'} />
        </View>
        <View style={styles.plusArea}>
          <TouchableOpacity onPress={()=>{onAddCard()}} >
            <Ionicons style={styles.plusIcon} name='add-outline' size={30} color='white' ></Ionicons>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView ref={scrollViewRef} style={styles.cardScrollView}>
        {Cards}
      </ScrollView>
      <View style={styles.btnArea}>
        <TouchableOpacity onPress={onGenerate} style={styles.btn}>
          <Text style={styles.btnText}>產出 QR Code</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  return (
    <View style={{flex:1}}>
      {
        canlendarShow === true ? calendarArea : ruleArea
      }
    </View>
  );
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20,

  },

  header:{
    flexDirection:'row',
    justifyContent:'space-between'    ,
    marginBottom:5
  },
  titleArea:{
    flexDirection:'row',
    justifyContent:'flex-start'

  },
  title:{
    fontSize:20,
    fontWeight:'bold',
    color:'black',
    marginBottom:10,
    lineHeight:30
  },
  input:{
    height: 30,
    borderBottomWidth: 1,
    paddingVertical:0,
    paddingLeft:10
  },
  cardScrollView:{
    marginBottom:50
  },
  plusArea:{
  },
  plusIcon:{
    borderRadius:10, 
    backgroundColor:Colors.buttonBlue,
  },
  btnArea:{
    alignItems:'center',
    position:'absolute',
    bottom:20,
    left:50
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
  calendar:{
    flex:1,
    
  }
});

export default CreateQRScreen;