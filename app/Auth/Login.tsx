
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Firebase_Auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';


const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = Firebase_Auth;

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

   
       if (email === 'letcom311@gmail.com' && password === 'le7654321'||
        email === 'letcom312@gmail.com' && password === 'let12345' ||
        email === 'letcom313@gmail.com' && password === 'le123456' ||
        email === 'letcom314@gmail.com' && password === 'le1234567' ||
        email === 'letcom315@gmail.com' && password === 'le123456789'
       ) {
        navigation.navigate('LecturerDashboard');
      }
      else if ( email === 'stud@gmail.com' && password === '12359' ){
        navigation.navigate('StudentDashboard');
      }
      else if ( email === 'Admin@gmail.com' && password === '12359' ){
          navigation.navigate('AdminDashboard');
    }
      else if(email === 'admin@gmail.com' && password === '1234560' ){
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
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* Login Button or Loading Indicator */}
      {loading ? (
        <ActivityIndicator color="red" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={signIn}>
          <Text style={styles.buttonText}>LOG IN</Text>
        </TouchableOpacity>
      )}
    </KeyboardAvoidingView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1c1cf0",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1c1cf0",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 15,
    width: "100%",
  },
  input: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 5,
  },

  button: {
    backgroundColor: "#1c1cf0",
    paddingVertical: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Login;
