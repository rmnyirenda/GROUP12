
import React, { useState } from 'react';
import {View, ScrollView, KeyboardAvoidingView, Modal, Alert, TouchableOpacity, Text, StyleSheet, Image, Platform} from 'react-native';
import { collection, getFirestore, Timestamp, addDoc, getDoc,DocumentReference } from "firebase/firestore";
import { TextInput } from 'react-native-gesture-handler';
import Firebase_app from "../../firebaseConfig";
import { Ionicons} from '@expo/vector-icons';

interface UserItem {
  userName: string;
  userEmail: string;
  createdAt: Timestamp;
  completedAt: string | null;
  status: 'active' | 'inactive';
  lastUpdated: Timestamp;
}

export default function CreateUser ({ navigation }: any){
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const db = getFirestore(Firebase_app);
  const userCollection = collection(db, "users");

  // Validate email format
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate user input
  const validateInput = (): boolean => {
    if (!userName.trim()) {
      Alert.alert('Error', 'Please enter a name');
      return false;
    }
    if (!userEmail.trim()) {
      Alert.alert('Error', 'Please enter an email');
      return false;
    }
    if (!isValidEmail(userEmail.trim())) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }
    return true;
  };

  const createUser = async (data: Omit<UserItem, 'createdAt' | 'completedAt' | 'status' | 'lastUpdated'>) => {
    console.log('Starting createUser with data:', data); // Debug log
    
    const dbData = {
      createdAt: Timestamp.now(),
      completedAt: null,
      status: 'active' as const,
      lastUpdated: Timestamp.now(),
      ...data
    };
    
    console.log('Prepared dbData:', dbData); // Debug log
    
    try {
      console.log('Attempting to write to collection:', userCollection); // Debug log
      const docRef = await addDoc(userCollection, dbData);
      console.log("Document written with ID: ", docRef.id);
      return docRef;
    } catch (error) {
      console.error("Detailed error adding document: ", error);
      throw error;
    }
};

const handleRegistration = async () => {
    console.log('Starting registration...'); // Debug log
  
    if (!validateInput()) {
      console.log('Validation failed'); // Debug log
      Alert.alert('Validation Error', 'Please check your input fields');
      return;
    }

    console.log('Validation passed with:', { userName, userEmail }); // Debug log
    setIsLoading(true);

    try {
      const userRef = await createUser({
        userName: userName.trim(),
        userEmail: userEmail.trim().toLowerCase(),
      });
      console.log('User created with ref:', userRef); // Debug log
      
      Alert.alert(
        'Success',
        'User registered successfully',
        [
          {
            text: 'OK',
            onPress: () => {
              setUserName('');
              setUserEmail('');
            }
          }
        ]
      );
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert(
        'Registration Failed',
        error instanceof Error 
          ? error.message 
          : 'An error occurred during registration. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
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
              setMenuVisible(false);
              
              navigation.navigate('Login'); 
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
              placeholder="Enter Name"
              onChangeText={setUserName}
              value={userName}
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

            <TouchableOpacity
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={handleRegistration}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>
                {isLoading ? 'Creating...' : 'Create User'}
              </Text>
            </TouchableOpacity>
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