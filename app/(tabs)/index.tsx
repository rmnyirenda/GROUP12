import CustomButton from '@/components/customButton'
import { StyleSheet,View,Text, TextInput} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import AppGradient from '@/components/AppGradient';
import { useRouter } from 'expo-router';

const[email,setEmail] = useState('');
const[password,setPassword] = useState('');
const[error,Seterror] = useState('');
const router = useRouter();

const handleLogin = ()=>{
  
}


export default function Login() {
  
  return (
<View style={styles.container}>
  <AppGradient
  colors={["rgba(0,0,0.4)"]}
  >
  <SafeAreaView>
    <Text style={styles.heading}>Email:</Text>
  <TextInput
  placeholder='enter email'
  style= {styles.style}
  value={email}
  onChangeText={setEmail}
  />
    <Text style={styles.heading} >Password:</Text>
  <TextInput
  placeholder='enter password'
  style= {styles.style}
  value={password}
  onChangeText={setPassword}
  />
<View>
<CustomButton onPress={()=> console.log("tap")} 
title ="LOG IN"
/>
<Text style={styles.reset}>
  Reset password?
</Text>
</View>
    <StatusBar style="light" />
  </SafeAreaView>
  </AppGradient>
  
</View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:"center",
    alignItems: "center",
    padding:5,
    margin: 5
  },
  style: {
    alignItems:"center",
    fontSize: 14,
    color: "black",
    lineHeight: 21,
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 22,
    flex: 1,
    borderWidth: 1
  },
  heading: {
    flex: 1,
    fontSize:20,
  },
  reset:{
    alignItems:"center",
    justifyContent:"center",
    flex: 1,
    fontSize: 12,
    margin:1,
    paddingVertical: 1,
    paddingHorizontal: 22
  }
});

