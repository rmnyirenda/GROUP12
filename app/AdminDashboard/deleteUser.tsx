import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { Button, TextInput, Alert } from 'react-native';
import { signOut, getAuth } from 'firebase/auth';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const DeleteUserScreen = () => {
  const [userId, setUserId] = useState('');
  const navigation = useNavigation();

  const handleLogoutPrompt = async () => {
    Alert.alert(
      "Logout",
      "Do you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          onPress: async () => {
            try {
              const auth = getAuth();
              await signOut(auth);
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }]
              });
            } catch (error) {
              Alert.alert('Error', 'An error occurred during logout');
            }
          }
        }
      ]
    );
  };

  const deleteUser = async () => {
    if (!userId) {
      Alert.alert('Error', 'Please enter a user ID');
      return;
    }

    try {
      
      const functionUrl = `https://us-central1-your-project-id.cloudfunctions.net/deleteUser?userId=${userId}`;

      // Making DELETE request to Firebase function (using fetch)
      const response = await fetch(functionUrl, {
        method: 'DELETE',
      });

      if (response.ok) {
        Alert.alert('Success', 'User deleted successfully');
      } else {
        const errorMessage = await response.text();
        Alert.alert('Error', errorMessage);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: 'https://png.pngtree.com/png-clipart/20211017/original/pngtree-school-logo-png-image_6851480.png' }} style={styles.logo} />
        <Text style={styles.headerText}>EXAMINATION ATTENDANCE</Text>
      </View>

      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="menu" size={24} color="black" style={styles.menuIcon} />
        </TouchableOpacity>
        <Text style={styles.welcomeText}>WELCOME</Text>
        <TouchableOpacity onPress={handleLogoutPrompt}>
          <Ionicons name="person-circle" size={24} color="black" style={styles.profileIcon} />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Delete User</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter User ID"
          value={userId}
          onChangeText={setUserId}
        />
        <Button title="Delete User" onPress={deleteUser} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F0F0' },
  header: { backgroundColor: '#1c1cf0', alignItems: 'center', padding: 10 },
  logo: { width: 60, height: 60, resizeMode: 'contain' },
  headerText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
  navbar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 10 },
  menuIcon: { position: 'absolute', left: 0 },
  welcomeText: { fontSize: 20, fontWeight: 'bold' },
  profileIcon: { position: 'absolute', right: 0 },
  input: { width: 200, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }
});

export default DeleteUserScreen;
