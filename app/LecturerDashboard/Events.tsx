import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, StyleSheet, Alert, Image, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signOut } from 'firebase/auth';

interface ExamDetails {
  name: string;
  date: string;
  venue: string;
  time: string;
}

interface Student {
  id: string;
  email: string;
}

const sendExamNotification = async (examDetails: ExamDetails, studentList: string[]) => {
  try {
    const students: Student[] = studentList.map(email => ({ id: email.split('@')[0], email }));
    const response = await fetch('https://script.google.com/macros/s/AKfycbyf-JsWdSOwIEq0ebnKEU-pw8xcslz9dWsv4m1Im-QH_yl0XsIKHu0Iej53FEtFOZDa/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        examDetails: examDetails,
        students: students,
      }),
    });

    if (response.ok) {
      Alert.alert('Success', 'Exam notifications sent successfully!');
    } else {
      Alert.alert('Error', 'Failed to send notifications.');
    }
  } catch (error) {
    console.error(error);
    Alert.alert('Error', 'An error occurred while sending notifications.');
  }
};

export default function ExamDetailsScreen() {
  const [examName, setExamName] = useState('');
  const [examDate, setExamDate] = useState('');
  const [examVenue, setExamVenue] = useState('');
  const [examTime, setExamTime] = useState('');
  const [studentList, setStudentList] = useState('');
  const navigation = useNavigation();

  const uploadExamDetails = () => {
    if (examName && examDate && examVenue && examTime && studentList) {
      const examDetails: ExamDetails = {
        name: examName,
        date: examDate,
        venue: examVenue,
        time: examTime,
      };
      const students = studentList.split(',').map(student => student.trim());
      sendExamNotification(examDetails, students);
    } else {
      Alert.alert('Error', 'Please fill in all the details and specify the students.');
    }
  };

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }]
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to log out.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: 'https://png.pngtree.com/png-clipart/20211017/original/pngtree-school-logo-png-image_6851480.png' }} style={styles.logo} />
        <Text style={styles.headerText}>Exam Details</Text>
      </View>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.navigate('LecturerDashboard')}>
          <Ionicons name="home" size={30} color="black" style={styles.iconLeft} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={styles.iconContainer}>
          <Ionicons name="person-circle" size={30} color="black" style={styles.iconRight} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.label}>Name of Exam</Text>
      <TextInput
        style={styles.input}
        value={examName}
        onChangeText={setExamName}
        placeholder="Enter exam name"
      />
      <Text style={styles.label}>Date of Exam</Text>
      <TextInput
        style={styles.input}
        value={examDate}
        onChangeText={setExamDate}
        placeholder="Enter exam date"
      />
      <Text style={styles.label}>Venue of Exam</Text>
      <TextInput
        style={styles.input}
        value={examVenue}
        onChangeText={setExamVenue}
        placeholder="Enter exam venue"
      />
      <Text style={styles.label}>Time of Exam</Text>
      <TextInput
        style={styles.input}
        value={examTime}
        onChangeText={setExamTime}
        placeholder="Enter exam time"
      />
      <Text style={styles.label}>Students (comma-separated)</Text>
      <TextInput
        style={styles.input}
        value={studentList}
        onChangeText={setStudentList}
        placeholder="Enter student emails or IDs"
      />
      <Button title="Upload Details" onPress={uploadExamDetails} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8' },
  header: { backgroundColor: '#1c1cf0', alignItems: 'center', justifyContent: 'center', paddingVertical: 20, width: '100%' },
  logo: { width: 60, height: 60, resizeMode: 'contain' },
  headerText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', marginTop: 5 },
  navbar: { justifyContent: 'space-between', width: '100%', flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', paddingHorizontal: 15, paddingVertical: 10 },
  iconContainer: { alignItems: 'center' },
  iconLeft: { position: 'absolute', left: 0 },
  iconRight: { position: 'absolute', right: 0 },
  logoutText: { fontSize: 12, color: '#000' },
  label: { fontSize: 16, marginVertical: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 16, borderRadius: 4 },
});
