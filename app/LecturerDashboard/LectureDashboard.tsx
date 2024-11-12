import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, Modal } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

// Define types for your stack navigator
type RootStackParamList = {
  LecturerDashboard: undefined;
  Events: undefined;
  Attendance: undefined;
  Report: undefined;
};

// Define the prop type for navigation
type LecturerDashboardScreenProp = StackNavigationProp<RootStackParamList, 'LecturerDashboard'>;

export default function LecturerDashboard() {
  // State for menu modal
  const [isMenuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation<LecturerDashboardScreenProp>();

  // Function to handle logout prompt
  const handleLogoutPrompt = () => {
    Alert.alert(
      "Logout",
      "Do you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", onPress: () => console.log("Logged out") }
      ]
    );
  };

  // Function to handle menu option selection
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
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: 'https://png.pngtree.com/png-clipart/20211017/original/pngtree-school-logo-png-image_6851480.png' }} style={styles.logo} />
        <Text style={styles.headerText}>EXAMINATION ATTENDANCE</Text>
      </View>

      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <Ionicons name="menu" size={24} color="black" style={styles.menuIcon} />
        </TouchableOpacity>
        <Text style={styles.welcomeText}>WELCOME</Text>
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
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Events')}>
          <FontAwesome5 name="calendar-alt" size={24} color="black" />
          <Text style={styles.buttonText}>EVENTS</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.attendanceButton]} onPress={() => navigation.navigate('Attendance')}>
          <FontAwesome5 name="user-check" size={24} color="black" />
          <Text style={styles.buttonText}>ATTENDANCE</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.reportButton} onPress={() => navigation.navigate('Report')}>
          <FontAwesome5 name="file-alt" size={24} color="black" />
          <Text style={styles.buttonText}>REPORT</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <Text style={styles.footerText}>© 2024 Student Attendance. All rights reserved</Text>

      {/* Menu Modal */}
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
  reportButton: {
    backgroundColor: '#ADD8E6',
    width: '80%',
    margin: 10,
    padding: 20,
    alignItems: 'center',
    borderRadius: 10,
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
  closeText: {
    color: 'blue',
    marginTop: 20,
    fontSize: 16,
  },
});
