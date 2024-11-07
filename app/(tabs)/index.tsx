import CustomButton from '@/components/customButton'
import { StyleSheet,View,Text, TextInput, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';



export default function Login() {
  const[email,setEmail] = useState('');
const[password,setPassword] = useState('');
const[error,Seterror] = useState('');
const router = useRouter();

const handleLogin = ()=>{
  
}
  
  return (
  <SafeAreaView>
  <View style={styles.logo}>
  <FontAwesome5 name="school" size={54} color="black" />
  <Text style={styles.head}>EXAM ATTENDACE</Text>
  </View>  
<View style={styles.container}>
  
    <View style= {styles.style3}>
    <Text style={styles.label}>Email:</Text>
  <TextInput
  placeholder='enter email'
  style= {styles.style}
  value={email}
  onChangeText={setEmail}
  />
    </View>
    <View style={styles.style4}>
    <Text style={styles.label}>Password:</Text>
  <TextInput
  placeholder='enter password'
  style= {styles.style2}
  value={password}
  onChangeText={setPassword}
  />
    </View>
<View style={styles.heading}>
<CustomButton onPress={()=> console.log("tap")} 
title ="LOG IN"
/>
<Text style={styles.reset}>
  Reset password?
</Text>
</View>
    <StatusBar style="light" />
  
  
  
</View>

</SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop:135,
    textAlign: "center",
    marginBottom:2,
    justifyContent:"space-between"
  },
  style: {
    alignItems:"center",
    fontSize: 14,
    color: "black",
    lineHeight: 21,
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 22,
    marginRight:7,
    marginLeft:23,
    flex: 1,
    borderWidth: 1,
 
  },
  heading: {
    marginTop:2,
    flexBasis:'auto',
    flexDirection:'column',
    marginBottom:5


  },
  reset:{
    flexWrap:'wrap',
    flexDirection:'column',
    textAlign:"center",
    fontSize: 12,
    marginTop:1
  
  },
  style2: {
    alignItems:"center",
    fontSize: 14,
    color: "black",
    lineHeight: 21,
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 12,
    flex: 1,
    borderWidth: 1,
    marginRight:7
  },
  style3: {
    alignItems:"center",
    marginBottom:10 ,
    marginTop:0,
    flexDirection: 'row',
    
  },
  label:{
    marginRight:10
  },
  style4: {
    alignItems:"center",
    flexDirection:'row',
    marginBottom:70,
    marginTop:10,
    
  },
  logo:{
    justifyContent:'center',
    alignItems:'center'

  },
  head:{
    fontSize: 32,
    textDecorationColor:"#060202",
    textShadowRadius:7
  }
  
});

