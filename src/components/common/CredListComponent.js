import React, {useEffect, useState} from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import { ListItem } from '@rneui/themed'
import { headline } from '../../styles/theme.style';

const CredListComponent = (props) => {
  const [list , setList] = useState([]);

  //現在收陣列資料
  useEffect(() => {
    setList(props.data);
  },[props.data]);


  // toPage: DefinitionDetail、CredentialDetail
  const onPressItem = (itemData) => {
    console.log('list', list);
    console.log('list.length', list.length);
    console.log('itemData', itemData);
    
    props.navigation.navigate({
      name:props.toPage,
      params:{
        from:props.from,
        credData:itemData,
        navigation:props.navigation
      }
    })
  }

  const CardTypeA = ({index, item}) => {
    return (
      <TouchableOpacity key={`cred${index}`} style={styles.card} onPress={()=>{onPressItem(item)}}>
        <ImageBackground source={require(`../../assets/background/CredentailCardBG01.png`)} resizeMode="stretch" style={styles.backgroundImage}>
          <View style={styles.header}>
            <View style={styles.nameArea}>
                <Text style={styles.dateText}>Snowbridge Inc.</Text>
            </View>  
            <View style={styles.dateArea}>
                <Text style={styles.dateText}>Sep 4, 2022</Text>
            </View>           
          </View>
          <View style={styles.body}>
            <Text style={headline.Headline3}>{item.schema_id}</Text>
          </View>
          <View style={styles.footer}>
            <Text style={styles.dateText}>A12345678</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>  
    )
  }

  const CardTypeB = ({index, item}) => {
    return (
      <TouchableOpacity key={`cred${index}`} style={styles.card} onPress={()=>{onPressItem(item)}}>
        <ImageBackground source={require(`../../assets/background/CredentailCardBG02.png`)} resizeMode="stretch" style={styles.backgroundImage}>
          <View style={styles.header}>
            <View style={styles.nameArea}>
                <Text style={styles.dateText}>Snowbridge Inc.</Text>
            </View>  
            <View style={styles.dateArea}>
                <Text style={styles.dateText}>Sep 4, 2022</Text>
            </View>           
          </View>
          <View style={styles.body}>
            <Text style={headline.Headline3}>employee ID card</Text>
          </View>
          <View style={styles.footer}>
            <Text style={styles.dateText}>A12345678</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>  
    )
  }

  const CardTypeC = ({index, item}) => {
    return (
      <TouchableOpacity key={`cred${index}`} style={styles.card} onPress={()=>{onPressItem(item)}}>
        <ImageBackground source={require(`../../assets/background/CredentailCardBG03.png`)} resizeMode="stretch" style={styles.backgroundImage}>
          <View style={styles.header}>
            <View style={styles.nameArea}>
                <Text style={styles.dateText}>Snowbridge Inc.</Text>
            </View>  
            <View style={styles.dateArea}>
                <Text style={styles.dateText}>Sep 4, 2022</Text>
            </View>           
          </View>
          <View style={styles.body}>
            <Text style={headline.Headline3}>employee ID card</Text>
          </View>
          <View style={styles.footer}>
            <Text style={styles.dateText}>A12345678</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>  
    )
  }

  //因為require('')不能用dynamic的作法，所以用這種判斷方式寫死src來return JSX
  const listContent = (
    <ScrollView style={styles.scrollView}>
    {
      list.length === 0 ? null : (
        list.map((item, index) => {
          const card = index%3 === 0 ? <CardTypeA key={`card${index}`} item={item} index={index}/>
                      : index%3 === 1 ? <CardTypeB key={`card${index}`} item={item} index={index}/>
                      : index%3 === 2 ? <CardTypeC key={`card${index}`} item={item} index={index}/>
                      : <CardTypeA item={item} index={index}/>;

          return card;
        })
      )
    }  
    {/* <View style={styles.bottomSpace}></View> */}
  </ScrollView>
  )


  return listContent;
}


const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  card:{
    height:150,
    marginBottom:16,
    marginTop:12,
    borderRadius:6,
    backgroundColor:'white'
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    padding:16
  },
  header:{
    flex:1,
    justifyContent: "flex-start",
    flexDirection:'row',
  },
  nameArea:{
  },  
  dateArea:{
    flex:1,
  },
  issuerName:{
  },
  dateText:{
    height:20,
    color:'black',
    textAlign:'right',
    paddingRight:5
  },
  body:{
    flex:3,
  },
  footer:{
    flex:1,
  },
  credentialName:{
    color:'black',
  },
  bottomSpace:{
    height:80
  }
});
  

export default CredListComponent;