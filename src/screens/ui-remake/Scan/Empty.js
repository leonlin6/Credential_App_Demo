
import React, {useState, useEffect, useLocation} from 'react';
import { 
  View, 
  StyleSheet, 
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Text
} from 'react-native';

// 用於替代TabBottomMenu的Tab.Screen增加底下按鈕數量用的，實際會透過Customize操作Scan Button的onPress跳轉到Scan Stack，永遠不會跳到這頁。
// 為避免Scan設成Tab.Screen時一定會出現Tab Bar的狀況
const Empty = (props) => {
  return (
    <View style={{flex:1}}>
    
    </View>
  );
}


const styles = StyleSheet.create({
 
});


export default Empty;
