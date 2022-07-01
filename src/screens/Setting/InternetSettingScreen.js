import React, {useEffect, useState} from 'react';
import { 
  View, 
  StyleSheet
} from 'react-native';
import { ListItem, CheckBox} from '@rneui/themed'
const InternetSettingScreen = (props) => {
  const [check0, setCheck0] = useState(true);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const checkArray = [check0, check1, check2];

  const [checked, setChecked] = useState(0);

  const list = [
    {
      name: '正式',
    },
    {
      name: '測試',
    },
    {
      name: '開發',
    }
  ]

  const onCheck = (num) => {
    switch(num){
      case 0:
        setCheck0(true);
        setCheck1(false);
        setCheck2(false);
        return;
      case 1:
        setCheck0(false);
        setCheck1(true);
        setCheck2(false);
        return;

      case 2:
        setCheck0(false);
        setCheck1(false);
        setCheck2(true);
        return;
      default:
        return

    }
  }

  // render page
  return (
    <View style={styles.container}>
      <View>
        {
          list.map((l, i) => (
            <ListItem containerStyle={{padding:0}} key={i} bottomDivider>
              <CheckBox
                center
                title={l.name}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={checkArray[i]}
                onPress={() => {onCheck(i)}}
              />

            </ListItem>
          ))
        }
      </View>
    </View>
  );
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
    flex:8,
    borderRadius:30,
    flexDirection:'row',
    borderWidth:1,
    marginHorizontal:15,
    paddingLeft:5,
    paddingTop:3,
    height:40
  },
  searchIcon:{
    flex:2
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
    justifyContent:'center',
    paddingBottom: 10,
    marginHorizontal:10,
    flex:6
  },
  schemaContainer:{
    marginBottom:10,
    shadowColor: '#171717',
    shadowColor: 'black',
    shadowOpacity: 0.56,
    shadowOffset: { width: 2, height: 2},
    shadowRadius: 10,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius:5,
  }
});

export default InternetSettingScreen;