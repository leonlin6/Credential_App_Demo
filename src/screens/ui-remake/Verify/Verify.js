import React, {useState, useEffect, useRef} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { content, headline, themeColor } from '../../../styles/theme.style';

// Icon
import HistoryBlackIcon from '../../../assets/icons/SVG/HistoryBlack.svg';
import SettingBlackIcon from '../../../assets/icons/SVG/SettingBlack.svg';
import BottomArrowIcon from '../../../assets/icons/SVG/BottomArrow.svg';
import RulesIcon from '../../../assets/icons/SVG/Rules.svg';

import { 
  View, 
  StyleSheet, 
  TouchableOpacity,
  Text,
  ImageBackground,
  ScrollView
} from 'react-native';

// components
import ServerStatusLoadingComponent from '../../../components/common/ServerStatusLoadingComponent';
import AnimLoadingComponent from '../../../components/common/AnimLoadingComponent';

import LinearGradient from 'react-native-linear-gradient';
import { ListItem } from '@rneui/themed';
import {connect} from 'react-redux';
import QRCode from 'react-native-qrcode-svg';
import {Picker} from '@react-native-picker/picker';

//api
import { ENDPOINT_BASE_URL } from '../../../APIs/APIs';
import axios from 'axios';
import indy from 'indy-sdk-react-native';
// actions
import {setProofReq, setVerifyId} from '../../../actions/index'
import AsyncStorage from "@react-native-async-storage/async-storage";

const Verify = (props) => {
  // let qrInfoResponse = {
  //   verifyId:'',
  //   qrId:'',
  // };

  let verifyId = useRef();
  let qrId = useRef();

  let tempList = {};

  const [isSelectRuleShow, setIsSelectRuleShow] = useState(false);
  const [selectedRule, setSelectedRule] = useState();
  const [qrCodeUrl, setQRCodeUrl] = useState('test');

  const [attributesData, setAttributesData] = useState([]);

  let checkStatusIntervalID;
  let verifyResponse = useRef();
  let verifyResultData = useRef({});
  const loadingStatusText = ['正在等待對方選擇憑證', '正在驗證憑證...'];
  const [showLoading, setShowLoading] = useState(false);
  const [ruleLoading, setRuleLoading] = useState(false);
  const [credData, setCredData] = useState();

  const [templates, setTemplates] = useState([]);

  //先setInterval做確認status，但會有非同步的問題，之後再看怎麼改
  useEffect(() => {
    const initializeQRInfo = async () => {

      const configurationObject = {
        method: 'post',
        baseURL: ENDPOINT_BASE_URL,
        url: `api/v1/qrcode`,
        headers:{
          'authorization':`Bearer ${props.loginToken}`,
          'Content-Type':'application/json'
        },
        data:{
          "type": 11,
          "startTime": 1656277728993,
          "endTime": 1656277728993,
          "verifyTemplateId": previousRule.templateId
        }
      };
      await axios(configurationObject)
      .then((response) => {
        console.log('===response===', response.data);
        console.log('===verify===', response.data.verify);
        qrInfoResponse = response.data
        checkStatusIntervalID = setInterval(getCurrentStatus, 2000);
      })
      .catch((error)=>{
        console.log('===error===', error);
      })
    }
    
    initializeQRInfo();
    
  },[])

  //先setInterval做確認status，但會有非同步的問題，之後再看怎麼改
  // useEffect(() => {
  //   checkStatusIntervalID = setInterval(getCurrentStatus, 2000);
  //   return() => {
  //     console.log('---checkStatusIntervalID---',checkStatusIntervalID);

  //     clearInterval(checkStatusIntervalID);
  //   }
  // },[])

  //initializeRuleList
  useEffect(() => {
    const initializeRuleList = async () => {
      const configurationObject = {
        method: 'get',
        baseURL: ENDPOINT_BASE_URL,
        url: `api/v1/verify/template`,
        headers:{
          'authorization':`Bearer ${props.loginToken}`,
          'Content-Type':'application/json'
        }
        
      };

      const previousRule = await AsyncStorage.getItem('@previousRule');
      setSelectedRule(previousRule);
      handleRuleDetail(previousRule);
      console.log('previousRule', previousRule);
      await axios(configurationObject)
      .then((response) => {
        setTemplates(response.data.items);
        
      })
      .catch((error)=>{
        console.log(error);
      })
    }
    initializeRuleList();


  },[])

  //initialize selected rule & detail
  useEffect(() => {
    const initializeDetail = async () => {
      const configurationObject = {
        method: 'get',
        baseURL: ENDPOINT_BASE_URL,
        url: `api/v1/verify/template`,
        headers:{
          'authorization':`Bearer ${props.loginToken}`,
          'Content-Type':'application/json'
        }
        
      };


      await axios(configurationObject)
      .then((response) => {
        setTemplates(response.data.items);
      })
      .catch((error)=>{
        console.log(error);
      })
    }
    initializeDetail();

  },[selectedRule])


  //when screen blur, clear the interval
  useFocusEffect(
    React.useCallback(() => {

      console.log('Screen was focused');
      checkStatusIntervalID = setInterval(getCurrentStatus, 2000);
      console.log('====checkStatusIntervalID===', checkStatusIntervalID);

      return () => {

        console.log('Screen was unfocused');
        // Useful for cleanup functions
        console.log('====checkStatusIntervalID===', checkStatusIntervalID);
        clearInterval(checkStatusIntervalID);

      };
    }, [])
  );


  const doVerifyProof = async (proofReq, proof, schemas, credDefs) => {
    console.log('====doVerifyProof====');
    console.log('====proofReq====',proofReq);
    console.log('====proof====',proof);
    console.log('====proof revealed_attr_groups===',proof.requested_proof.revealed_attr_groups);

    console.log('====schemas====',schemas);
    console.log('====credDefs====',credDefs);

    verifyResponse.current = await indy.verifierVerifyProof(
      proofReq,
      proof,
      schemas,
      credDefs,
      {},
      {}
      
    );

    verifyResultData.current['ruleName'] = proofReq.name;
    verifyResultData.current['revealed_attr_groups'] = proof.requested_proof.revealed_attr_groups;
    verifyResultData.current['verifyResult'] = verifyResponse.current;

    console.log('-----verifyResponse-----' , verifyResponse.current);
    console.log('-----verifyResultData-----' , verifyResultData.current);

  }

  const doUploadProof = async () => {
    console.log('====doUploadProof====');

    const uploadProofConfig = {
      method: 'put',
      baseURL: ENDPOINT_BASE_URL,
      url: `api/v1/verify/${verifyId.current}/upload/valid`,
      headers:{
        'authorization':`Bearer ${props.loginToken}`,
        'Content-Type':'application/json'
      },
      data:{
        valid:verifyResponse.current
      }
    };

    const uploadProofResponse = await axios(uploadProofConfig);
    console.log('-----uploadProofResponse-----' , uploadProofResponse.data);
  }


  // call API to get current proccessing status
  // url param staus: 2 = (查驗者), 4 = (持證者)
  // response status: 
  // 0 = 初始化, 
  // 1 = 已取得 proof_req_json, 
  // 2 = 已上傳 proof_json, 
  // 3 = 已下載 proof_json, 
  // 4 = 已上傳驗證
  // 10 = 已完成
  const getCurrentStatus = async () => {
    console.log('--verifyId---', verifyId.current);
    try{
      const configurationObject = {
        method: 'get',
        baseURL: ENDPOINT_BASE_URL,
        url: `/api/v1/verify/${verifyId.current}/status?status=2`,
        headers:{
          'authorization':`Bearer ${props.loginToken}`,
          'Content-Type':'application/json'
        }
      };

      await axios(configurationObject)
      .then((response) => {
        console.log('====response=====', response.data);
          //持證者掃瞄完收到proof_req後，show Loading
          if(response.data.status === 1){
            console.log('====status1=====');
            setShowLoading(true);
            
            console.log('====before checkStatusIntervalID=====',checkStatusIntervalID);

            clearInterval(checkStatusIntervalID);
            checkStatusIntervalID = setInterval(getCurrentStatus, 2000);
            console.log('====after checkStatusIntervalID=====',checkStatusIntervalID);


          }else if(response.data.status === 3){
            //status:3 第一次response變3的時候，會下載proof相關資料，後續只回status
            console.log('====status3=====');
            console.log('proof', response.data);
            if(response.data.hasOwnProperty('proof_json')){
              const proofReqFromServer = JSON.parse(response.data.proof_req_json);
              const proofFromServer = JSON.parse(response.data.proof_json);
              const schemasFromServer = JSON.parse(response.data.schemas_json);
              const credDefsFromServer = JSON.parse(response.data.credential_defs_json);

              doVerifyProof(proofReqFromServer, proofFromServer, schemasFromServer, credDefsFromServer);
              doUploadProof();
            }else{
              clearInterval(checkStatusIntervalID);
              checkStatusIntervalID = setInterval(getCurrentStatus, 2000);
            }



          }else if(response.data.status === 10){
            //status:10 持證者下載完verify result，查驗完成
            console.log('====status10=====');

            clearInterval(checkStatusIntervalID);
            props.navigation.reset({
              index:1,
              routes: [
                {
                  name:'TabContainer',
                  state:{
                    routes:[
                      { name:'Certificate' }
                    ]
                  }
                },
                { 
                  name:'VerifyResult',
                  params:{
                    verifyResultData:verifyResultData.current
                  }
              }
              ]
            });
          }else{
            //status:2 不用做動作，持證者上傳proof後，server會自動把status改成3
            console.log('====else status====', response.data.status)
          }
      })

    }catch(error){
      console.log('error', error);
    }
  }



  const generateQRUrl = async (ruleValue) => {
    console.log('ruleValue',ruleValue);
    let url = '';
    const configurationObject = {
      method: 'post',
      baseURL: ENDPOINT_BASE_URL,
      url: `api/v1/qrcode`,
      headers:{
        'authorization':`Bearer ${props.loginToken}`,
        'Content-Type':'application/json'
      },
      data:{
        "type": 11,
        "startTime": 1656277728993,
        "endTime": 1656277728993,
        "verifyTemplateId": ruleValue
      }
    };
    await axios(configurationObject)
    .then((response) => {
      url = `${ENDPOINT_BASE_URL}/api/v1/qrcode/${response.data._id}`;
      verifyId.current = response.data.verify;
      qrId.current = response.data._id;


      setRuleLoading(false);

    })
    .catch((error)=>{
      console.log(error);
    })

    //use for test

    console.log('url', url);
    setQRCodeUrl(url);
  }

  const onNavigate = () => {
    props.navigation.reset({
      index:1,
      routes: [
        {
          name:'TabContainer',
          state:{
            routes:[
              { name:'Certificate' }
            ]
          }
        },
        { name:'VerifyResult' }
      ]
    });

    // props.navigation.navigate({
    //   name:'Loading',
    //   params:{
    //     loadingStatusText : loadingStatusText,
    //     from:'QRCertificate',
    //     toPage:'VerifyResult'
    //   }
    // });
  }


  const onClickSetting = () => {

  }

  const onClickHistory = () => {
    props.navigation.navigate('VerifierHistory');

  }

  const onSelectRule = () => {
    setIsSelectRuleShow(true);
  }

  const onQRCode = () => {
    props.navigation.navigate('VerifyResult');
  }

  //處理條件
  const handlePredicates = (predicates) => {
    const pred = predicates.map((item) => {
      return item;
    })
    tempList['predicates'] = pred;
  }
  
  //處理attribute內容
  const handleAttributes = (attributes) => {
    const attr = attributes.map((item)=>{
      return item;
    })
    tempList['attributes'] = attr;
  }

  const mergeAttribute = () => {
    let hashTemp = {};
    tempList.predicates.forEach((item) => {
      hashTemp[item.name] = item;
      console.log('hashTemp',hashTemp);
    })

    let mergedAttribute = tempList.attributes.map((it) => {
      console.log('hashTemp===',hashTemp);
      console.log('it===',it);

      if(hashTemp.hasOwnProperty(it))
        return {
          ...hashTemp[it],
          hasPredicate: true
        };
      else{
        return {
          name:it,
          hasPredicate: false,
        }
      }
    });

    tempList.predicates.forEach((item) => {
      mergedAttribute.push({
        ...item,
        hasPredicate: true
      })
    })


    tempList['mergedAttribute'] = mergedAttribute;
  }

  const handleRuleDetail = async (value) => {
    setRuleLoading(true);

    const configurationObject = {
      method: 'get',
      baseURL: ENDPOINT_BASE_URL,
      url: `api/v1/verify/template/${value}`,
      headers:{
        'authorization':`Bearer ${props.loginToken}`,
        'Content-Type':'application/json'
      }
    };

    const response = await axios(configurationObject);

    console.log('---response.data----',response.data);


    tempList['ruleName'] = response.data.name;
    handleAttributes(response.data.attributes[0].attributes);
    handlePredicates(response.data.predicates);
    mergeAttribute();
    console.log('--tempList---', tempList);
    setAttributesData(tempList.mergedAttribute);
    generateQRUrl(value);

    // set selected rule ui
    AsyncStorage.setItem('@previousRule', value.toString());
    setSelectedRule(value);

  }

  const RuleDropDown = () => {
    const pickers = templates.map((item, index)=>{
      return(
        <Picker.Item key={`template${index}`} color={themeColor.SemanticHighlight} fontFamily='RedHatDisplay-Bold' label={item.name} value={item._id} />
      )
    })

    return(
      <Picker
        style={styles.ruleDropdown}
        selectedValue={selectedRule}
        onValueChange={(itemValue) =>{handleRuleDetail(itemValue)}}
      >
        {pickers}
      </Picker>
    );
  }

  const DetailList = () => {
    const mergedList = attributesData.map((item, index) => {
      return(
        <ListItem 
          key={index}
          containerStyle={styles.listItem}
          linearGradientProps={{
            colors: ['rgba(124,255,255,0.1)', 'rgba(124,255,255,0.2)'],
            start: { x: 0, y: 1 },
            end: { x: 1, y: 1 },
          }}
          ViewComponent={LinearGradient}
        >
          <ListItem.Content>
            <View style={styles.subtitleView}>
              <Text style={[content.Default, styles.key]}>{item.name}</Text>
              {
                item.hasPredicate ? (
                  <Text style={[content.DefaultBold, styles.value]}>{item.type}{item.value}</Text>
                )
                :
                (
                  <Text style={[content.DefaultBold, styles.value]}>Any</Text>
                )
              }
              
            </View>
          </ListItem.Content>
        </ListItem>
      )
    })
    return (
      <LinearGradient  
        colors={['rgba(124,255,255,0.1)', 'rgba(124,255,255,0.2)']} 
        start= {{x: 0, y: 1}}
        end= {{ x: 1, y: 1 }}
        style={styles.detailListArea}>
      {mergedList}
      </LinearGradient>
    );
  }

  const Divider = () => {
    return (
      <View style={styles.dividerArea}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
          <View>
            <Text style={[headline.Headline5, {width: 200, textAlign: 'center', color:themeColor.DarkDark60 }]}>Attributes to be verified</Text>
          </View>
          <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        </View>
      </View>
    );
  }

  // render page
  // 選擇rule先用套件做，樣式稍微不同，之後有空再改 2022.10.27 by Leon
  return (
    <View style={styles.container}>
    {
     showLoading === true ? 
      (
        <ServerStatusLoadingComponent 
          onNavigate={onNavigate} 
          toPage='VerifyResult' 
          loadingStatusText={loadingStatusText} 
          nv={props.navigation}
          verifyId={verifyId.current}
          qrId={qrId.current}
          credData={credData}
        />
      )
      :
      (
        <ImageBackground source={require('../../../assets/background/BG2.png')} resizeMode="cover" style={styles.backgroundImage}>
          <View style={styles.header}>
            <View style={styles.headLineArea}>
              <View style={styles.titleArea}>
                <Text style={[headline.Headline1, styles.titleText]}>VERIFY</Text>
              </View>
              <View style={styles.btnArea}>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={onClickSetting}>
                  <SettingBlackIcon></SettingBlackIcon>
                </TouchableOpacity>          
                <TouchableOpacity
                  style={styles.btn}
                  onPress={onClickHistory}>
                  <HistoryBlackIcon></HistoryBlackIcon>
                </TouchableOpacity>            
              </View>
            </View>
            <View style={styles.ruleDropdownArea}>
              {/* <TouchableOpacity style={styles.ruleDropdown} onPress={onSelectRule}>
                <View style={styles.dropDownIcon}>
                  <RulesIcon></RulesIcon>
                </View>
                <View style={styles.dropdownText}>
                  <Text style={content.DefaultBold}>Snowbridge Inc.</Text>
                </View>
                <View style={styles.dropDownDirectionIcon}>
                  <BottomArrowIcon></BottomArrowIcon>
                </View>
              </TouchableOpacity> */}
              <View style={styles.dropDownIcon}>
                <RulesIcon></RulesIcon>
              </View>
              <RuleDropDown></RuleDropDown>
            </View>
          </View>
          <View style={styles.body}>
          {
            ruleLoading ? (
              <AnimLoadingComponent></AnimLoadingComponent>
            )
            :
            (
              <>
              <ScrollView>
                <View style={styles.QRCodeArea}>
                  <TouchableOpacity onPress={onQRCode}>
                    <QRCode 
                      value={qrCodeUrl}
                      size={225}>
                    </QRCode>
                  </TouchableOpacity>
                </View>
                <Divider></Divider>
                <DetailList></DetailList>
                <View style={styles.spaceArea}></View>
              </ScrollView>
              </>
            )
          }

          </View>
        </ImageBackground>

      )
    }
    </View>
  );
}



const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center"
  },

  header:{
    flex:2,
    alignItems:'center'
  },
  headLineArea:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    marginTop: 24,
    marginBottom: 17
  },
  titleArea:{
    flex:4,
    paddingLeft:16
  },
  titleText:{
    color:'black'
  },
  btnArea:{
    flex:1,
    flexDirection:'row',
    paddingRight:16
  },
  btn:{
    marginRight:12
  },
  ruleDropdownArea:{
    justifyContent:'center',
    alignItems:'center',
    marginBottom: 24,
    paddingLeft:40,
    flexDirection:'row',
    backgroundColor:'rgb(255,255,255)',
    width:345,

  },
  ruleDropdown:{
    width:300,
    height:50,
    paddingHorizontal:16,
    // borderRadius:38,
    backgroundColor:'rgba(255,255,255,0.8)',
    // justifyContent:'flex-end',
    flexDirection:'row',
    alignItems:'center',
  },
  dropDownIcon:{
    position:'absolute',
    zIndex:2,
    left: 10

  },
  dropdownText:{
    flex:8,
  },
  dropDownDirectionIcon:{
    flex:1
  },
  body:{
    flex:8,
    backgroundColor:'white',
    borderRadius:12,
    paddingTop: 24,
    paddingHorizontal:16

  },
  QRCodeArea:{
    alignItems:'center',
    marginBottom:25
  },
  dividerArea:{
    height:30,

  },
 attributesArea:{
    alignItems:'center',
    marginTop:12

  },
  listItem:{
    margin: 12,
    marginBottom: 0,
    padding: 0,
    paddingBottom: 12
  },
  subtitleView: {
    flexDirection: 'row',
    justifyContent:'space-between',
  },
  subtitleViewBtn:{
    flexDirection: 'row',
    justifyContent:'flex-end',
  },
 
  key:{
    flex:1,
    paddingLeft:10,
    textAlign:'left',
    color:'rgb(123,128,139)'
  },
  value:{
    flex:2,
    textAlign:'right',
    color:'rgb(79,85,101)'
  },
  spaceArea:{
    height:110
  }
});

const mapStateToProps = (state) => {  
  return {
    loginToken: state.loginToken,
    walletHandle: state.walletHandle,

    proof: state.proof,
    proofReq: state.proofReq,

    schemas: state.schemas,
    defs: state.defs
  };
}

export default connect(mapStateToProps)(Verify);