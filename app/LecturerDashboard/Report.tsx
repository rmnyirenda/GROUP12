import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';

const Report = ({ route }: any) => {
  const { attendanceList } = route.params;

  const renderItem = ({ item }: { item: { regNumber: string; name: string; status: string } }) => (
    <View style={styles.item}>
      <Text style={styles.text}>{`Reg Number: ${item.regNumber}`}</Text>
      <Text style={styles.text}>{`Name: ${item.name}`}</Text>
      <Text style={styles.text}>{`Status: ${item.status}`}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Attendance Report</Text>
      <FlatList
        data={attendanceList}
        renderItem={renderItem}
        keyExtractor={(item) => item.regNumber}
        ListEmptyComponent={<Text style={styles.text}>No attendance records found</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f8f8' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  item: { backgroundColor: '#e8e8e8', padding: 15, marginVertical: 8, borderRadius: 8 },
  text: { fontSize: 16, color: '#333' },
});

export default Report;
