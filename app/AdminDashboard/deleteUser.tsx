import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { Firestore_DB } from '@/firebaseConfig';

interface User {
  id: string;
  email: string;
}

const DeleteUser: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delete User Account</Text>
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
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  userItem: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  userEmail: { fontSize: 16 },
});

export default DeleteUser;
