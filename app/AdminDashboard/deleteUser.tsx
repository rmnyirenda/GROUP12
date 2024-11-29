import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { Firestore_DB } from '@/firebaseConfig';
import { signOut, getAuth } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'; 

interface User {
  id: string;
  email: string;
}

const DeleteUser: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigation = useNavigation(); 

  useEffect(() => {
    const fetchUsers = async () => {
      const usersSnapshot = await getDocs(collection(Firestore_DB, 'users'));
      const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
      setUsers(usersList);
    };

    fetchUsers();
  }, []);

  const handleDeleteAccount = async (userId: string) => {
    try {
      await deleteDoc(doc(Firestore_DB, 'users', userId));
      Alert.alert('Success', 'User account deleted successfully');
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };

  const handleLogoutPrompt = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Logout error: ', error);
      Alert.alert(
        "Logout",
        "An error occurred during logout. Please try again.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Retry", onPress: handleLogoutPrompt }
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: 'https://png.pngtree.com/png-clipart/20211017/original/pngtree-school-logo-png-image_6851480.png' }} style={styles.logo} />
        <Text style={styles.headerText}>EXAMINATION ATTENDANCE</Text>
      </View>
      <View style={styles.titleRow}>
        <Text style={[styles.title, styles.centerTitle]}>Delete User Account</Text>
        <TouchableOpacity onPress={handleLogoutPrompt} style={styles.logoutButton}>
          <Ionicons name="person-circle" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text style={styles.userEmail}>{item.email}</Text>
            <Button title="Delete" onPress={() => handleDeleteAccount(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  centerTitle: { textAlign: 'center', flex: 1 }, 
  userItem: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  userEmail: { fontSize: 16 },
  
  header: {
    backgroundColor: '#1c1cf0',
    alignItems: 'center',
    padding: 10,
    width: '100%', // Ensure the header covers the full width
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
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutButton: {
    marginLeft: 'auto', 
  },
});

export default DeleteUser;
