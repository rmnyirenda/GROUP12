import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const Login = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student');

  const handleLogin = () => {
    if (username === 'admin' && password === 'password') {
      if (userType === 'lecturer') {
        navigation.navigate('LecturerDashboard');
      } else if (userType === 'student') {
        navigation.navigate('StudentDashboard');
      } else if (userType === 'admin') {
        navigation.navigate('AdminDashboard');
      }
    } else {
      Alert.alert('Error', 'Invalid credentials. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
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
          placeholder="USERNAME"
          value={username}
          onChangeText={setUsername}
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

      {/* User Type Picker */}
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Signin as</Text>
        <Picker
          selectedValue={userType}
          style={styles.picker}
          onValueChange={(itemValue: string) => setUserType(itemValue)}
        >
          <Picker.Item label="Student" value="student" />
          <Picker.Item label="Lecturer" value="lecturer" />
          <Picker.Item label="Admin" value="admin" />
        </Picker>
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>LOG IN</Text>
      </TouchableOpacity>
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
