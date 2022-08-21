import {
    Alert,
    BackHandler,
    ImageBackground,
    Keyboard,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import React, { useEffect, useState } from "react";

import { Button } from "react-native-elements";
import { Input } from "react-native-elements";
import { StatusBar } from "expo-status-bar";

export default function Dash(props) {
    //state section
    const [data,setData]=useState({ });
   
    const getMovies = async () => {
      
        try {
          const response = await fetch(
            `https://jor-pipeline-6a736-default-rtdb.firebaseio.com/users.json`,
            
          );
          const repData = await response.json();
          console.log( repData.SDdutJZJLGW88B58pL7IwHHxUcc2)
          setData( repData)
        } catch (error) {
          console.error(error);
        } finally {
           
        }
      
    };
  
    
   useEffect(()=>{
       getMovies();
   },[])
  
    return (
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <Text>{}</Text>
        <Text>{data.user_full_name}</Text>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    
  });
  