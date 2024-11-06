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
      flex:1,
      justifyContent:"center",
      alignItems: "center",
      paddingVertical: 12,
      paddingHorizontal: 22,
      lineHeight: 21,
      borderRadius: 4, 
      borderWidth:1,
      backgroundColor: "#1A43BF",
      fontWeight: "bold",
      margin: 25
      
    },
})