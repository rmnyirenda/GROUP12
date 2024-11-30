import React, { useState } from 'react'; //iportig
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';

const AddStudent: React.FC = () => {
  const [regNumber, setRegNumber] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [sex, setSex] = useState<string>('');
  const [type, setType] = useState<string>('');

  const handleAddStudent = async () => {
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbzeUuZEIig668NFnAAaApQWpXl49sphDBz_RslYApfLPbS_w6YhlMiA38XOdJX35rUH/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ regNumber, fullName, title, sex, type }),
      });
      const result = await response.json();
      if (result.status === 'success') {
        Alert.alert('Success', 'Student details added successfully');
        setRegNumber('');
        setFullName('');
        setTitle('');
        setSex('');
        setType('');
      } else {
        Alert.alert('Error', 'Failed to add student details');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Student Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Reg. Number"
        value={regNumber}
        onChangeText={setRegNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Sex"
        value={sex}
        onChangeText={setSex}
      />
      <TextInput
        style={styles.input}
        placeholder="Type"
        value={type}
        onChangeText={setType}
      />
      <Button title="Add Student" onPress={handleAddStudent} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 10, borderRadius: 5 },
});

export default AddStudent;
