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
  Image,
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
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://png.pngtree.com/png-clipart/20211017/original/pngtree-school-logo-png-image_6851480.png",
          }}
          style={styles.logo}
        />
        <Text style={styles.headerText}>EXAMINATION ATTENDANCE</Text>
      </View>
      <Text style={styles.title}>UPDATE USER ACCOUNT</Text>
      <View style={styles.box}>
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
        <Button title="Update account" onPress={handleUpdateAccount} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#1c1cf0",
    alignItems: "center",
    paddingVertical: 20,
    width: "100%",
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  box: {
    flex: 1,
    marginHorizontal: 10,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  userEmail: {
    fontSize: 16,
    color: "black",
  },
  input: {
    borderWidth: 2,
    borderColor: "black",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    textAlign: "center",
    fontWeight: "bold",
    color: "grey",
  },
});

export default UpdateUser;
