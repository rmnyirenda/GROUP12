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
      <View style={styles.box}>
        <Text style={styles.title}>UPDATE USER ACCOUNT</Text>
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
        <Button
          title="Update account"
          onPress={() => {
            console.log("Button Pressed");
            Alert.alert(
              "Confirmation",
              "ARE YOU SURE ?",
              [
                {
                  text: "CANCEL",
                  style: "cancel",
                },
                {
                  text: "YES",
                  onPress: handleUpdateAccount,
                },
              ],
              { cancelable: true }
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  box: {
    width: "95%",
    height: "90%",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  userItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  userEmail: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    alignContent: "center",
    textAlign: "center",
    fontWeight: "bold",
    color: "grey",
  },
});

export default UpdateUser;
