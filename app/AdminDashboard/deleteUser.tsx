
import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { Button, TextInput, Alert } from 'react-native';
//import axios from 'axios'; Optional if you're using axios



const DeleteUserScreen = () => {
  const [userId, setUserId] = useState('');

  // Function to delete user by making an HTTP request to Firebase function
  const deleteUser = async () => {
    if (!userId) {
      Alert.alert('Error', 'Please enter a user ID');
      return;
    }

    try {
      // Replace this with the URL of your Firebase Function
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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Delete User</Text>
      <TextInput
        style={{ width: 200, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        placeholder="Enter User ID"
        value={userId}
        onChangeText={setUserId}
      />
      <Button title="Delete User" onPress={deleteUser} />
    </View>
  );
};

export default DeleteUserScreen;

  

