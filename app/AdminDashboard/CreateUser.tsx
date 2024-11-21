import React from 'react';
import { DataGrid, GridColDef, GridValueGetter } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { View } from 'react-native';

interface Person {
  id: number;
  firstName: string | null;
  lastName: string | null;
  age: number | null;
}

const Events: React.FC = () => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
     
    },
  ];

  const rows = [
    { id: 1, lastName: 'Nyirenda', firstName: 'Rosemary', age: 35 },
    { id: 2, lastName: 'Chirambo', firstName: 'Tiwonge', age: 42 },
    { id: 3, lastName: 'Majawa', firstName: 'Philip', age: 45 },
    { id: 4, lastName: 'Kumwenda', firstName: 'Yohane', age: 16 },
    { id: 5, lastName: 'Sawasa', firstName: 'Martha', age: null },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <View>
      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
    </View>
  );
};

export default Events;