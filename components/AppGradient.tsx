import React from "react";
import {LinearGradient} from 'expo-linear-gradient'
import Content from "./content";

const AppGradient= ({
    children,
    colors,
}: {
    children: any;
    colors: string[];
})=> {
    return(
        <LinearGradient colors={colors}>
            <Content>{children}</Content>
        </LinearGradient>
    );
};
export default AppGradient;