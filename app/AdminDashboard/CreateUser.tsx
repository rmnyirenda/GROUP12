
import React, { useState } from 'react';
import {View, ScrollView,ActivityIndicator, KeyboardAvoidingView, Modal, Alert, TouchableOpacity, Text, StyleSheet, Image, Platform} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Ionicons} from '@expo/vector-icons';
import { Firebase_Auth } from '../../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signOut, getAuth } from 'firebase/auth';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  AdminDashboard: undefined;
  Login: undefined;
};
type AdminDashboardScreenProp = StackNavigationProp<RootStackParamList, 'AdminDashboard'>;

export default function CreateUser ({}: any){
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const auth = Firebase_Auth;
  const navigation = useNavigation<AdminDashboardScreenProp>();
  
const handleRegistration = async () => {
    console.log('Starting registration...'); 
    setIsLoading(true);
    try{
      const response = await createUserWithEmailAndPassword(auth, userEmail, password);
      console.log(response);
    }
    catch(error){
      console.log(error);
    }finally{
      setIsLoading(false);
    }
};
  
  const handleLogoutPrompt = () => {
    Alert.alert(
      "Logout",
      "Do you want to log out?",
      [
        { 
          text: "Cancel", 
          style: "cancel" 
        },
        {
          text: "Logout",
          onPress: async () => {
            try {
              const auth = getAuth();
              await signOut(auth);
              navigation.reset({
                index: 0,
                routes: [{ name: 'AdminDashboard' }]});
              setMenuVisible(false);
              
        
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert('Logout Failed', 'Failed to logout. Please try again.');
            }
          }
        }
      ]
    );
  };
  const handleMenuOption = (option: string) => {
    setMenuVisible(false);
    switch (option) {
      case 'Change Password':
        console.log("Navigate to Change Password");
        break;
      case 'Personal Details':
        console.log("Navigate to Personal Details");
        break;
      case 'Logout':
        handleLogoutPrompt();
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View style={styles.header}>
            <Image 
              source={{ uri: 'https://png.pngtree.com/png-clipart/20211017/original/pngtree-school-logo-png-image_6851480.png' }} 
              style={styles.logo} 
            />
            <Text style={styles.headerText}>EXAMINATION ATTENDANCE</Text>
          </View>

          <View style={styles.navbar}>
            <TouchableOpacity onPress={() => setMenuVisible(true)}>
              <Ionicons name="menu" size={24} color="black" style={styles.menuIcon} />
            </TouchableOpacity>
            <Text style={styles.welcomeText}>WELCOME</Text>
            <TouchableOpacity onPress={handleLogoutPrompt}>
              <Ionicons name="person-circle" size={24} color="black" style={styles.profileIcon} />
            </TouchableOpacity>
          </View>

          <View style={styles.formContainer}>
            <TextInput
              placeholder="New User Password"
              onChangeText={setPassword}
              secureTextEntry
              value={password}
              maxLength={50}
              style={styles.inputContainer}
            />
            
            <TextInput
              placeholder="Enter Email"
              onChangeText={setUserEmail}
              value={userEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              maxLength={100}
              style={styles.inputContainer}
            />
          {isLoading ? (
        <ActivityIndicator color="red" />
      ) : (
            <TouchableOpacity
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={handleRegistration}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>
                {isLoading ? 'Creating...' : 'Create User'}
              </Text>
            </TouchableOpacity>
      )}
          </View>

          <Modal visible={isMenuVisible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TouchableOpacity onPress={() => handleMenuOption('Change Password')}>
                  <Text style={styles.menuText}>Change Password</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleMenuOption('Personal Details')}>
                  <Text style={styles.menuText}>Personal Details</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleMenuOption('Logout')}>
                  <Text style={styles.menuText}>Logout</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setMenuVisible(false)}>
                  <Text style={styles.closeText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    color: '#0000FF',
  },
  profileIcon: {
    flex: 1,
    textAlign: 'right',
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