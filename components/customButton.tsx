import { View,TouchableOpacity,Text ,StyleSheet} from "react-native";
import React from "react";

interface CustomButtonProps{
    onPress: ()=> void;
    title: string;
    textStyles?: string;
    containerStyles?: string;
   
}

const customButton =({
    onPress,
    title,
    textStyles = "",
    containerStyles= "",
}:CustomButtonProps)=>{

    return(
        <TouchableOpacity 
        activeOpacity={0.7}
        onPress={onPress}
        style={styles.container}
        
        >
            <Text >{title}</Text>
        </TouchableOpacity>
    )
}

export default customButton;

const styles = StyleSheet.create({
    container: {
     flexDirection:'row',
      marginBottom:2,
      borderWidth:1,
      borderRadius:4,
      paddingVertical:12,
      marginRight:100,
      marginLeft:105,
      backgroundColor: "#1A43BF",
      fontWeight: "bold",
      justifyContent:'center'
      
      
    },
})