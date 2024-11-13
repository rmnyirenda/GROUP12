import React from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";

const Report = ({ route }) => {
  const { students } = route.params;

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.column}>{item.name}</Text>
      <Text style={styles.column}>{item.regNumber}</Text>
      <Text style={styles.column}>{item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendance Report</Text>
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Name</Text>
        <Text style={styles.headerText}>Reg. Number</Text>
        <Text style={styles.headerText}>Status</Text>
      </View>
      <FlatList
        data={students}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f8f8" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  headerText: { fontSize: 18, fontWeight: "bold", color: "#000" },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  column: { fontSize: 16, color: "#000", flex: 1 },
});

export default Report;
