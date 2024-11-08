import React from "react";
import { View,Text, TouchableOpacity, Button ,StyleSheet} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const StudentDashboard= ()=>{
    
    return(
      <>
      <View style={style.logo}>
    <FontAwesome5 name="school" size={54} color="black" />
    <Text style={style.head}>EXAM ATTENDACE</Text>
    </View>
   <SafeAreaView>
    
    <View style={style.view}>
    <View style={style.menu}>
    <Feather name="menu" size={24} color="black" />
    </View>
    <View style={style.user}>
    <FontAwesome name="user-circle-o" size={24} color="black" />
    </View>
    </View>
    <View >
    <View style={style.box}>
            <TouchableOpacity style={style.container1}>
              <Text>EVENTS</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.container2}>
              <Text>ATTENDANCE</Text>
            </TouchableOpacity>
            </View>
            <View style={style.box2}>
            <TouchableOpacity style={style.container3}>
            <Text style={style.text}>Report</Text>
            </TouchableOpacity>
            </View>
            
            </View>
   </SafeAreaView> 
   </>
    );
};
export default StudentDashboard;

const style = StyleSheet.create({
  container1:{
    alignItems:'flex-start',
    right:15,
    paddingHorizontal:50,
    paddingVertical:45,
    borderRadius:1,
    borderWidth:1,
    marginRight:1,
    marginLeft:32,
    
  },
  container2:{
    alignItems:'flex-end',
    paddingHorizontal:30,
    paddingVertical:45,
    left:10,
    borderRadius:1,
    borderWidth:1,
    marginRight:32,
    marginLeft:2,
  
  },
  container3:{
    alignItems:'center',
    textAlign:'center',
    paddingHorizontal:10,
    paddingVertical:43,
    borderRadius:1,
    borderWidth:1,
    marginRight:62,
    marginLeft:62,
    top:10,
    
  },
  box:{
    flexDirection: 'row', 
    marginTop:150,
    marginBottom:10,
  
  },
  box2:{
    marginTop:3,
    marginBottom:10,
  },
  text:{
    color:"#060202",
    borderBlockColor:"#060209"
  },
  head:{
    fontSize: 32,
    textDecorationColor:"#060202",
    textShadowRadius:7
  },
  logo:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: "#1A43BF",
    paddingVertical:12

  },
  menu:{
    right:1,
    
  },
  user:{
    left:303,
    
  },
  view:{
    flexDirection:'row',
    marginTop:15
    
  }
})