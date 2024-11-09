// LecturerDashboard.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
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
  // Use the typed navigation hook
  const navigation = useNavigation<LecturerDashboardScreenProp>();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: 'https://png.pngtree.com/png-clipart/20211017/original/pngtree-school-logo-png-image_6851480.png' }} style={styles.logo} />
        <Text style={styles.headerText}>EXAMINATION ATTENDANCE</Text>
      </View>

      {/* Navbar */}
      <View style={styles.navbar}>
        <Ionicons name="menu" size={24} color="black" style={styles.menuIcon} />
        <Text style={styles.welcomeText}>WELCOME</Text>
        <Ionicons name="person-circle" size={24} color="black" style={styles.profileIcon} />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  header: {
    backgroundColor: '#1c1cf0', // Dark blue color
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
    color: '#0000FF', // Blue color
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
    backgroundColor: '#B0E0E6', // Light blue color for Events button
    width: '40%',
    margin: 10,
    padding: 20,
    alignItems: 'center',
    borderRadius: 10,
  },
  attendanceButton: {
    backgroundColor: '#98FB98', // Light green color for Attendance button
  },
  reportButton: {
    backgroundColor: '#ADD8E6', // Light blue color for Report button
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
});
