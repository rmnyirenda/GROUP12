import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text,Image,Modal,TouchableOpacity, } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { Firebase_Auth } from '../../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signOut, getAuth } from 'firebase/auth';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  UpdateAttendance: undefined;
  create: { students: { name: string; status: string; }[] };
  AdminDashboard: undefined;
  Login: undefined; // Added Login here
};

type UpdateAttendanceScreenNavigationProp = StackNavigationProp<RootStackParamList, 'UpdateAttendance'>;

const AddStudent: React.FC = () => {
  const [regNumber, setRegNumber] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [sex, setSex] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [isMenuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation<UpdateAttendanceScreenNavigationProp>();

  const handleAddStudent = async () => {
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbzeUuZEIig668NFnAAaApQWpXl49sphDBz_RslYApfLPbS_w6YhlMiA38XOdJX35rUH/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ regNumber, fullName, title, sex, type }),
      });
      const result = await response.json();
      if (result.status === 'success') {
        Alert.alert('Success', 'Student details added successfully');
        setRegNumber('');
        setFullName('');
        setTitle('');
        setSex('');
        setType('');
      } else {
        Alert.alert('Error', 'Failed to add student details');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred');
    }
  };
   
  const handleLogoutPrompt = async() => {
    try{
      const auth = getAuth();
       await signOut(auth);
      navigation.reset({
        index: 0,
        routes: [{name :'Login'}]
      });
    }catch(error){
      Alert.alert(
        "Logout",
        "Do you want to log out?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Logout", onPress: () => console.log("Logged out") }
        ]
      );
    }
  };

  return (
    <View style={style.container2}>
            <View style={style.header}>
        <Image source={{ uri: 'https://png.pngtree.com/png-clipart/20211017/original/pngtree-school-logo-png-image_6851480.png' }} style={style.logo} />
                <Text style={style.headerText}>EXAMAMINATION ATTENDANCE</Text>      
      </View>

      {/* Navbar */}
      <View style={style.navbar}>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <Ionicons name="menu" size={24} color="black" style={style.menuIcon} />
        </TouchableOpacity>
        <Text style={style.welcomeText}>Add Student Details</Text>
        <TouchableOpacity onPress={handleLogoutPrompt}>
          <Ionicons name="person-circle" size={24} color="black" style={style.profileIcon} />
        </TouchableOpacity>
      </View>

    
      <TextInput
        style={style.input}
        placeholder="Reg. Number"
        value={regNumber}
        onChangeText={setRegNumber}
      />
      <TextInput
        style={style.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={style.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={style.input}
        placeholder="Sex"
        value={sex}
        onChangeText={setSex}
      />
      <TextInput
        style={style.input}
        placeholder="Type"
        value={type}
        onChangeText={setType}
      />
      <Button title="Add Student" onPress={handleAddStudent} />

      <Modal visible={isMenuVisible} transparent={true} animationType="slide">
        <View style={style.modalContainer}>
          <View style={style.modalContent}>
            <TouchableOpacity onPress={() => setMenuVisible(false)}>
              <Text style={style.menuText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const style = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 10, borderRadius: 5 },
  container2:{
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  formContainer: {
    padding: 20,
  },
  header: {
    backgroundColor: '#1c1cf0',
    alignItems: 'center',
    padding: 10,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  menuIcon: {
    flex: 1,
  },
  welcomeText: {
    flex: 3,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000000',
  },
  profileIcon: {
    flex: 1,
    textAlign: 'right',
  },
  bannerImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    marginVertical: 10,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#1c1cf0',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
  },
  button: {
    backgroundColor: '#1c1cf0',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#999',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  menuText: {
    fontSize: 18,
    marginVertical: 10,
  },
  closeText: {
    color: 'blue',
    marginTop: 20,
    fontSize: 16,
  },
});
export default AddStudent;

