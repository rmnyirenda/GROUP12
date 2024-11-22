import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity, Image, SafeAreaView } from 'react-native';
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

interface Props {
  studentId: string;
}

const fetchExamNotifications = async (studentId: string): Promise<ExamNotification[]> => {
  try {
    const response = await fetch(`https://script.google.com/macros/s/AKfycbyf-JsWdSOwIEq0ebnKEU-pw8xcslz9dWsv4m1Im-QH_yl0XsIKHu0Iej53FEtFOZDa/exec?studentId=${studentId}`, {
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

const UploadedExamScreen: React.FC<Props> = ({ studentId }) => {
  const [notifications, setNotifications] = useState<ExamNotification[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchExamNotifications(studentId).then(data => {
      setNotifications(data);
    }).catch(error => {
      Alert.alert('Error', 'Failed to fetch notifications');
    });
  }, [studentId]);

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
      {notifications.length === 0 ? (
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
  notification: { padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#ccc', borderRadius: 4 },
  title: { fontSize: 18, fontWeight: 'bold' },
  noNotificationsText: { flex: 1, justifyContent: 'center', alignItems: 'center', fontSize: 18, color: '#aaa', marginTop: 20 },
});

export default UploadedExamScreen;
