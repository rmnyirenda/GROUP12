import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, KeyboardAvoidingView } from 'react-native';
import {  FontAwesome } from '@expo/vector-icons';
import {Firebase_Auth} from '../../firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth';


const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[loading,setLoading] = useState(false);
  const auth = Firebase_Auth;


  const signIn =async () => {
    setLoading(true);
    try{
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    }
    catch(error){
      console.log(error);
    }finally{
      setLoading(false);
    }
    if (email === 'stud001@gmail.com' && password === 'stu1234567') {
        navigation.navigate('StudentDashboard');
      } 
      else if (email === 'letcom311@gmail.com' && password === 'le7654321') {
        navigation.navigate('LecturerDashboard');
      }
       else if (email === 'admin1@gmail.com' && password === 'ad001122') 
        {
        navigation.navigate('AdminDashboard');
      }
    else {
      Alert.alert('Error', 'Invalid credentials. Please try again.');
    }
  }
 
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView >
      {/* Logo */}
      <Image 
        source={{ uri: 'https://png.pngtree.com/png-clipart/20211017/original/pngtree-school-logo-png-image_6851480.png' }}
        style={styles.logo}
      />

      {/* Header */}
      <Text style={styles.header}>SIGN IN</Text>

      {/* Username Input */}
      <View style={styles.inputContainer}>
        <FontAwesome name="user" size={20} color="#000" />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <FontAwesome name="key" size={20} color="#000" />
        <TextInput
          style={styles.input}
          placeholder="PASSWORD"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>

        {loading }
      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={signIn}>
        <Text style={styles.buttonText}>LOG IN</Text>
      </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1c1cf0',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1c1cf0',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 15,
    width: '100%',
  },
  input: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 5,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1c1cf0',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: '100%',
  },
  pickerLabel: {
    fontSize: 16,
    color: '#333',
    marginRight: 10,
  },
  picker: {
    flex: 1,
    height: 40,
  },
  button: {
    backgroundColor: '#1c1cf0',
    paddingVertical: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Login;
