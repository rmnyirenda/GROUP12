import { View,TouchableOpacity,Text } from "react-native";
import React from "react";

interface CustomButtonProps{
    onPress: ()=> void;
    title: string;
    textStyles?: string;
    containerStyles?: string;
}

export default function customButton({
    onPress,
    title,
    textStyles = "",
    containerStyles= "",
}:CustomButtonProps){

    return(
        <TouchableOpacity 
        activeOpacity={0.7}
        onPress={onPress}
        >
            <Text>{title}</Text>
        </TouchableOpacity>
    )
}

