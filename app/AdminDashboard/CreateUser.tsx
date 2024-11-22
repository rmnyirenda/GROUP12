import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';

const Events: React.FC = () => {
  const rows = [
    { id: 1, firstName: 'Rosemary', lastName: 'Nyirenda', age: 35 },
    { id: 2, firstName: 'Tiwonge', lastName: 'Chirambo', age: 42 },
    { id: 3, firstName: 'Philip', lastName: 'Majawa', age: 45 },
    { id: 4, firstName: 'Yohane', lastName: 'Kumwenda', age: 16 },
    { id: 5, firstName: 'Martha', lastName: 'Sawasa', age: null },
  ];

  return (
    <View style={styles.container}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>ID</DataTable.Title>
          <DataTable.Title>First Name</DataTable.Title>
          <DataTable.Title>Last Name</DataTable.Title>
          <DataTable.Title numeric>Age</DataTable.Title>
        </DataTable.Header>

        {rows.map((row) => (
          <DataTable.Row key={row.id}>
            <DataTable.Cell>{row.id}</DataTable.Cell>
            <DataTable.Cell>{row.firstName}</DataTable.Cell>
            <DataTable.Cell>{row.lastName}</DataTable.Cell>
            <DataTable.Cell numeric>{row.age}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default Events;
