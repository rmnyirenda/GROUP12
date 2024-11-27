import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, Modal } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { signOut, getAuth } from 'firebase/auth';

type RootStackParamList = {
  AdminDashboard: undefined;
  CreateUser: undefined;
  deleteUser: undefined;
  updateUser: undefined;
  UpdateAttendance: undefined;
  Login: undefined;
};

type AdminDashboardScreenProp = StackNavigationProp<RootStackParamList, 'AdminDashboard'>;

export default function AdminDashboard() {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation<AdminDashboardScreenProp>();

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
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: 'https://png.pngtree.com/png-clipart/20211017/original/pngtree-school-logo-png-image_6851480.png' }} style={styles.logo} />
        <Text style={styles.headerText}>ADMIN DASHBOARD</Text>
      </View>

      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <Ionicons name="menu" size={24} color="black" style={styles.menuIcon} />
        </TouchableOpacity>
        <Text style={styles.welcomeText}>ADMIN PANEL</Text>
        <TouchableOpacity onPress={handleLogoutPrompt}>
          <Ionicons name="person-circle" size={24} color="black" style={styles.profileIcon} />
        </TouchableOpacity>
      </View>

      {/* Banner Image */}
      <Image
        source={{ uri: 'https://th.bing.com/th/id/OIP.JChicOlbhmqJi2hBifBPEQHaDP?rs=1&pid=ImgDetMain' }}
        style={styles.bannerImage}
      />

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateUser')}>
          <FontAwesome5 name="user-plus" size={24} color="black" />
          <Text style={styles.buttonText}>CREATE USER ACCOUNT</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.attendanceButton]} onPress={() => navigation.navigate('deleteUser')}>
          <FontAwesome5 name="user-times" size={24} color="black" />
          <Text style={styles.buttonText}>DELETE ACCOUNT</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('updateUser')}>
          <FontAwesome5 name="user-edit" size={24} color="black" />
          <Text style={styles.buttonText}>UPDATE USER ACCOUNT</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.updateButton]} onPress={() => navigation.navigate('UpdateAttendance')}>
          <FontAwesome5 name="edit" size={24} color="black" />
          <Text style={styles.buttonText}>ADD STUDENTS</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <Text style={styles.footerText}>© 2024 Admin Dashboard. All rights reserved</Text>

      {/* Menu Modal */}
      <Modal visible={isMenuVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => setMenuVisible(false)}>
              <Text style={styles.menuText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
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
  bannerImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    marginVertical: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
  },
  button: {
    backgroundColor: '#B0E0E6',
    width: '40%',
    margin: 10,
    padding: 20,
    alignItems: 'center',
    borderRadius: 10,
  },
  attendanceButton: {
    backgroundColor: '#98FB98',
  },
  updateButton: {
    backgroundColor: '#FFD700',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  footerText: {
    textAlign: 'center',
    color: '#000000',
    fontSize: 12,
    marginVertical: 10,
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
});
