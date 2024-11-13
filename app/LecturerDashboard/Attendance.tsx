
import React, { useState, useEffect } from 'react';
import { View, Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner'; // Use expo-barcode-scanner for scanning

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz62E1v1KKYh4HLmop3056saTAdR_-3Pp7a3VESgxqMp8raw33eLWyaroUr_ivA4BuO5Q/exec';

const Attendance = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const [inputRegNumber, setInputRegNumber] = useState<string>('');
  const [studentName, setStudentName] = useState<string | null>(null);
  const [attendanceList, setAttendanceList] = useState<{ regNumber: string, name: string, status: string }[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync(); // Request camera permissions
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    Alert.alert('Scanned!', `Data: ${data}`);
    sendDataToGoogleSheet(data);
  };

  const sendDataToGoogleSheet = async (regNumber: string) => {
    try {
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: regNumber })
      });
      const result = await response.json();
      if (result.status === 'success') {
        setStudentName(result.name);
        Alert.alert('Success', `Student Name: ${result.name}`);
        setAttendanceList(prevList => [...prevList, { regNumber, name: result.name, status: 'Attended' }]);
      } else {
        setStudentName(null);
        Alert.alert('Error', 'Student not found');
      }
    } catch (error) {
      setStudentName(null);
      Alert.alert('Error', 'An error occurred while sending data to Google Sheets');
    }
  };

  const handleManualSubmit = () => {
    if (inputRegNumber.trim() === '') {
      Alert.alert('Error', 'Please enter a registration number');
      return;
    }
    sendDataToGoogleSheet(inputRegNumber);
  };

  const handleViewReport = () => {
    navigation.navigate('Report', { attendanceList });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: 'https://png.pngtree.com/png-clipart/20211017/original/pngtree-school-logo-png-image_6851480.png' }} style={styles.logo} />
        <Text style={styles.headerText}>EXAMINATION ATTENDANCE</Text>
      </View>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.navigate('LecturerDashboard')}>
          <Ionicons name="home" size={30} color="black" style={styles.iconLeft} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert('Profile menu: Log out')}>
          <Ionicons name="person-circle" size={30} color="black" style={styles.iconRight} />
        </TouchableOpacity>
      </View>

      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && (
        <TouchableOpacity onPress={() => setScanned(false)} style={styles.button}>
          <Text style={styles.buttonText}>Tap to Scan Again</Text>
        </TouchableOpacity>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Reg. Number"
          value={inputRegNumber}
          onChangeText={setInputRegNumber}
        />
        <TouchableOpacity onPress={handleManualSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleViewReport} style={styles.button}>
          <Text style={styles.buttonText}>View Report</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8' },
  header: { backgroundColor: '#1c1cf0', alignItems: 'center', justifyContent: 'center', paddingVertical: 20, width: '100%' },
  logo: { width: 60, height: 60, resizeMode: 'contain' },
  headerText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', marginTop: 5 },
  navbar: { justifyContent: 'space-between', width: '100%', flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', paddingHorizontal: 15, paddingVertical: 10 },
  iconLeft: { position: 'absolute', left: 0 },
  iconRight: { position: 'absolute', right: 0 },
  inputContainer: { alignItems: 'center', marginTop: 20 },
  input: { width: '80%', padding: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, marginBottom: 10 },
  button: { backgroundColor: '#4285F4', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 30, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  buttonContainer: { alignItems: 'center', marginTop: 50 },
});

export default Attendance;
