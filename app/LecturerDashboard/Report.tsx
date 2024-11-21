import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Attendance: undefined;
  Report: { students: { name: string; status: string; }[] };
};

type ReportScreenRouteProp = RouteProp<RootStackParamList, 'Report'>;

type Props = {
  route: ReportScreenRouteProp;
};

const Report: React.FC<Props> = ({ route }) => {
  const { students } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Attendance Report</Text>
      {students.length === 0 ? (
        <Text style={styles.noStudentsText}>No student attended the exam yet!</Text>
      ) : (
        <FlatList
          data={students}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>Name: {item.name}</Text>
              <Text>Status: {item.status}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  noStudentsText: { fontSize: 18, fontStyle: 'italic', color: '#666' },
  item: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
});

export default Report;
