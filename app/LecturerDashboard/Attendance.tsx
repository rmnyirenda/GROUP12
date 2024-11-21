import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image, SafeAreaView, TextInput } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define a type for your screen parameters
type RootStackParamList = {
  Attendance: undefined;
  Report: { students: { name: string; status: string; }[] };
  LecturerDashboard: undefined;  // Add this line to define LecturerDashboard
};

const SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit';
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz62E1v1KKYh4HLmop3056saTAdR_-3Pp7a3VESgxqMp8raw33eLWyaroUr_ivA4BuO5Q/exec';

type ReportScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Report'>;

const Attendance = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const [data, setData] = useState<string>('');
  const [inputRegNumber, setInputRegNumber] = useState<string>('');
  const [students, setStudents] = useState<{ name: string; status: string }[]>([]);
  const navigation = useNavigation<ReportScreenNavigationProp>();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }: { type: string, data: string }) => {
    setScanned(true);
    setData(data);
    Alert.alert('Scanned!', `Reg. Number: ${data}`);
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
        const student = { name: result.name, regNumber: regNumber, status: 'Attended' };
        setStudents(prevStudents => [...prevStudents, student]);
        Alert.alert('Success', `Student Name: ${result.name}`);
      } else {
        Alert.alert('Error', 'Student not found');
      }
    } catch (error) {
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
    navigation.navigate('Report', { students });
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

      {/* Barcode Scanner */}
      {!scanned && (
        <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={StyleSheet.absoluteFillObject} />
      )}
      {scanned && (
        <View style={styles.buttonContainer}>
          <Text>Scanned Data: {data}</Text>
          <TouchableOpacity onPress={() => setScanned(false)} style={styles.button}>
            <Text style={styles.buttonText}>Scan Again</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Manual Input */}
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

      {/* Spacer to push the View Report button to the bottom */}
      <View style={{ flex: 1 }} />

      {/* View Report Button */}
      <TouchableOpacity onPress={handleViewReport} style={styles.bottomButton}>
        <Text style={styles.buttonText}>View Report</Text>
      </TouchableOpacity>
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
  buttonContainer: { alignItems: 'center', marginTop: 50 },
  button: { backgroundColor: '#4285F4', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 30, alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  inputContainer: { alignItems: 'center', marginTop: 20 },
  input: { width: '80%', padding: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, marginBottom: 10 },
  bottomButton: { backgroundColor: '#4285F4', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 30, alignItems: 'center', marginBottom: 20 },
});

export default Attendance;
