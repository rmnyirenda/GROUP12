import React from 'react';
import { getAuth,signOut} from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import {Text,View,TouchableOpacity} from 'react-native';

export default function signOutInput(){
    const navigation = useNavigation();
    const auth = getAuth();

    const handleSignOut = async() =>{
      
    }
    return(
        <View>

        </View>
    )
};