import React, {useEffect, useState} from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity,
  ImageBackground,
  Image
} from 'react-native';
import { ListItem } from '@rneui/themed'
import { headline } from '../../styles/theme.style';

const CredListComponent = (props) => {
  const [list , setList] = useState([]);
  const titleIcon = [
    require('../../assets/icons/JPG/CardLogo01.jpg'),
    require('../../assets/icons/JPG/CardLogo02.jpg'),
    require('../../assets/icons/JPG/CardLogo03.jpg'),
    require('../../assets/icons/JPG/CardLogo04.jpg'),
    require('../../assets/icons/JPG/CardLogo05.jpg'),
    require('../../assets/icons/JPG/CardLogo06.jpg'),


  ]
  //現在收陣列資料
  useEffect(() => {
    console.log('=====props.data',props.data);
    if(props.data.length !== 1){
      props.data.sort(function(a, b) {
        return parseInt(b.attrs.TimeStamp) - parseInt(a.attrs.TimeStamp);
      });
    }

    setList(props.data);

  },[props.data]);


  // toPage: DefinitionDetail、CredentialDetail
  const onPressItem = (itemData) => {
    console.log('list', list);
    console.log('list.length', list.length);
    console.log('itemData', itemData);
    
    if(typeof props.mergedAttribute !== 'undefined'){
      console.log('props mergedAttribute undefined', props.mergedAttribute);

      props.navigation.navigate({
        name:props.toPage,
        params:{
          from:props.from,
          credData:itemData,
          navigation:props.navigation,
          mergedAttribute:props.mergedAttribute
        }
      })
    }else{
      console.log('props mergedAttribute ', props.mergedAttribute);

      props.navigation.navigate({
        name:props.toPage,
        params:{
          from:props.from,
          credData:itemData,
          navigation:props.navigation
        }
      })
    }

  }

  const getParsedTimeStamp = (text) => {
    const year = text.slice(0,4);
    const month = text.slice(4,6);
    const day = text.slice(6,8);

    return `${year}/${month}/${day}`;
  }

  const CardBody = (props) => {
    return (
      <>
        <View style={styles.header}>
          <View style={styles.titleArea}>
            <Image style={styles.titleIcon} source={titleIcon[props.index%6]}></Image>
            <Text style={styles.titleText}>Snowbridge Inc.</Text>
          </View>  
          <View style={styles.dateArea}>
              <Text style={styles.dateText}>{getParsedTimeStamp(props.item.attrs.TimeStamp)}</Text>
          </View>           
        </View>
        <View style={styles.body}>
          <Text style={headline.Headline3}>{props.item.attrs.Title}</Text>
        </View>
      </>
    )
  }

  const CardTypeA = ({item, index}) => {
    return (
      <TouchableOpacity key={`cred${index}`} style={styles.card} onPress={()=>{onPressItem(item)}}>
        <ImageBackground source={require(`../../assets/background/CredentailCardBG01.png`)} resizeMode="stretch" style={styles.backgroundImage}>
          <CardBody item={item} index={index}></CardBody>
        </ImageBackground>
      </TouchableOpacity>  
    )
  }

  const CardTypeB = ({item, index}) => {
    return (
      <TouchableOpacity key={`cred${index}`} style={styles.card} onPress={()=>{onPressItem(item)}}>
        <ImageBackground source={require(`../../assets/background/CredentailCardBG02.png`)} resizeMode="stretch" style={styles.backgroundImage}>
          <CardBody item={item} index={index}></CardBody>
        </ImageBackground>
      </TouchableOpacity>  
    )
  }

  const CardTypeC = ({item, index}) => {
    return (
      <TouchableOpacity key={`cred${index}`} style={styles.card} onPress={()=>{onPressItem(item)}}>
        <ImageBackground source={require(`../../assets/background/CredentailCardBG03.png`)} resizeMode="stretch" style={styles.backgroundImage}>
          <CardBody item={item} index={index}></CardBody>
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
  titleArea:{    
    justifyContent: "flex-start",
    flexDirection:'row',
    alignItems:'center'
  },  
  titleIcon:{
    width: 25,
    height: 25,
    resizeMode: 'contain',
    marginRight:5
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
    flex:2,
  },

  credentialName:{
    color:'black',
  },
  bottomSpace:{
    height:80
  }
});
  

export default CredListComponent;