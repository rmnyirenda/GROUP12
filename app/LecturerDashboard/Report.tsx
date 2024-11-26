import React from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView } from "react-native";
import { RouteProp } from "@react-navigation/native";

type RootStackParamList = {
  Attendance: undefined;
  Report: { students: { name: string; status: string }[] };
};

type ReportScreenRouteProp = RouteProp<RootStackParamList, "Report">;

type Props = {
  route: ReportScreenRouteProp;
};

const Report: React.FC<Props> = ({ route }) => {
  const { students } = route.params;

  const renderItem = ({ item }: { item: { name: string; status: string } }) => (
    <View style={styles.item}>
      <Text>Name: {item.name}</Text>
      <Text>Status: {item.status}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>ATTENDANCE REPORT</Text>
        {students.length === 0 ? (
          <Text style={styles.noStudentsText}>
            No student attended the exam yet!
          </Text>
        ) : (
          <FlatList
            data={students}
            keyExtractor={(item) => item.name}
            renderItem={renderItem}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f8f8" },
  box: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  noStudentsText: { fontSize: 18, fontStyle: "italic", color: "#666" },
  item: {
    backgroundColor: "#e8e8e8",
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
  },
  text: { fontSize: 16, color: "#333" },
});

export default Report;
