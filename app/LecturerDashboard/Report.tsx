import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const Report = () => {
  const navigation = useNavigation();
  const handleClick = () => {
    alert("the student list is shown below heere");
  };

  return (
    <View style={styles.mainContainer}>
      {/* Header with Home Icon */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate("LecturerDashboard")}
        >
          <Icon name="home" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.heading}>ATTENDANCE REPORT</Text>
        <View style={{ width: 24 }} />{" "}
        {/* Placeholder to balance icon and center text */}
      </View>

      {/* Scrollable content container for attendance data */}
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.scrollView}
      >
        <View style={styles.row}>
          <Text style={styles.label}>TITLE:</Text>
          <Text>VIEWING</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Total Attended:</Text>
          <Text>attendees.length</Text>
          <Button
            title="View List"
            onPress={() => console.log("Show attendees")}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Not Attended:</Text>
          <Text>notAttended.length</Text>
          <Button title="View List" onPress={handleClick} />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Attendance Rate:</Text>
          <Text>attendanceRate</Text>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2024 Student Attendance. All Rights Reserved
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  label: {
    color: "black",
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#1c1cf0",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    flex: 1, // Center the text by giving it flexible space
    justifyContent: "center",
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: "whitish",
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginVertical: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    width: "90%",
    color: "black",
    fontWeight: "bold",
  },

  footer: {
    backgroundColor: "black",
    alignItems: "center",
    paddingVertical: 10,
  },
  footerText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});

export default Report;
