import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity, Image, SafeAreaView, TextInput, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signOut } from 'firebase/auth';

interface ExamNotification {
  id: string;
  name: string;
  date: string;
  venue: string;
  time: string;
}

const fetchExamNotifications = async (regNumber: string): Promise<ExamNotification[]> => {
  try {
    const response = await fetch(`https://script.google.com/macros/s/AKfycbz-dg4vlTxS9BllFLB8insPlyuUzWwNS_xwFvsn8AJ2o9tlll2YmgJvxSOT6f_q5H3y/exec?regNumber=${regNumber}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const notifications: ExamNotification[] = await response.json();
      return notifications;
    } else {
      throw new Error('Failed to fetch notifications');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const UploadedExamScreen: React.FC = () => {
  const [notifications, setNotifications] = useState<ExamNotification[]>([]);
  const [regNumber, setRegNumber] = useState<string>('');
  const [hasFetched, setHasFetched] = useState<boolean>(false);
  const navigation = useNavigation();

  const fetchNotifications = () => {
    fetchExamNotifications(regNumber).then(data => {
      setNotifications(data);
      setHasFetched(true);
    }).catch(error => {
      Alert.alert('Error', 'Failed to fetch notifications');
    });
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

  const renderNotification = ({ item }: { item: ExamNotification }) => (
    <View style={styles.notification}>
      <Text style={styles.title}>{item.name}</Text>
      <Text>{`Date: ${item.date}`}</Text>
      <Text>{`Venue: ${item.venue}`}</Text>
      <Text>{`Time: ${item.time}`}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: 'https://png.pngtree.com/png-clipart/20211017/original/pngtree-school-logo-png-image_6851480.png' }} style={styles.logo} />
        <Text style={styles.headerText}>Exam Notifications</Text>
      </View>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.navigate('StudentDashboard')}>
          <Ionicons name="home" size={30} color="black" style={styles.iconLeft} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={styles.iconContainer}>
          <Ionicons name="person-circle" size={30} color="black" style={styles.iconRight} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Enter Registration Number"
        value={regNumber}
        onChangeText={setRegNumber}
      />
      <Button title="Search Available Exam" onPress={fetchNotifications} />
      {!hasFetched ? (
        <Text style={styles.noNotificationsText}>Enter your registration number to view exam notifications.</Text>
      ) : notifications.length === 0 ? (
        <Text style={styles.noNotificationsText}>No exams uploaded yet.</Text>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={item => item.id}
          renderItem={renderNotification}
        />
      )}
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
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 16, borderRadius: 4 },
  notification: { padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#ccc', borderRadius: 4 },
  title: { fontSize: 18, fontWeight: 'bold' },
  noNotificationsText: { flex: 1, justifyContent: 'center', alignItems: 'center', fontSize: 18, color: '#aaa', marginTop: 20 },
});

export default UploadedExamScreen;
