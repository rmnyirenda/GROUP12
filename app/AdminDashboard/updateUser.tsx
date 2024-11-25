import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Text,
} from "react-native";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { Firestore_DB } from "@/firebaseConfig";

interface User {
  id: string;
  email: string;
}

const UpdateUser: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      const usersSnapshot = await getDocs(collection(Firestore_DB, "users"));
      const usersList = usersSnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as User)
      );
      setUsers(usersList);
    };

    fetchUsers();
  }, []);

  const handleUpdateAccount = async () => {
    if (selectedUser) {
      try {
        const userDoc = doc(Firestore_DB, "users", selectedUser.id);
        await updateDoc(userDoc, { email });
        Alert.alert("Success", "User account updated successfully");
        setSelectedUser(null);
        setEmail("");
      } catch (error) {
        Alert.alert("Error", (error as Error).message);
      }
    } else {
      Alert.alert("Error", "No user selected for update");
    }
  };

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setEmail(user.email);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update User Account</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelectUser(item)}>
            <View style={styles.userItem}>
              <Text style={styles.userEmail}>{item.email}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <TextInput
        style={styles.input}
        placeholder="New Email"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Update Account" onPress={handleUpdateAccount} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  userItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: "#ccc" },
  userEmail: { fontSize: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});

export default UpdateUser;
