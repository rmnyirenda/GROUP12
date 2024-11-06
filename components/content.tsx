import React from "react";
import { View,Text } from "react-native";
import {LinearGradient} from 'expo-linear-gradient'
import { SafeAreaView } from "react-native-safe-area-context";

const Content= ({children}: any)=>{
   
    return(
       <SafeAreaView>
        {children}
       </SafeAreaView> 
    );
};
export default Content;