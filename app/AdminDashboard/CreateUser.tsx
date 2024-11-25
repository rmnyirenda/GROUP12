
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
    <View>
      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default Events;