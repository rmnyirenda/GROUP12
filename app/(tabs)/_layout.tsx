import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Ensure that the imports are correct based on your actual file structure
import Login from '@/app/Auth/Login'; // Import Login screen
import LecturerDashboard from '@/app/LecturerDashboard/LectureDashboard'; // Lecturer Dashboard
import StudentDashboard from '@/app/StudentDashboard/StudentDashboard'; // Student Dashboard
import Events from '@/app/LecturerDashboard/Events'; // Events
import Attendance from '@/app/LecturerDashboard/Attendance'; // Attendance
import Report from '@/app/LecturerDashboard/Report'; // Report
import AdminDashboard from '@/app/AdminDashboard/AdminDashboard'
import CreateUser from '@/app/AdminDashboard/CreateUser';
import deleteUser from '@/app/AdminDashboard/deleteUser';
import updateUser from '@/app/AdminDashboard/updateUser';
import UpdateAttendance from '@/app/AdminDashboard/UpdateAttendance';
import Notification from '../StudentDashboard/Notification';
import Assigned from '../StudentDashboard/Assigned';
import Missed from '../StudentDashboard/Missed';
import Scan from '../LecturerDashboard/Scan';



// Create a stack navigator instance
const Stack = createStackNavigator();

const Layout = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }} // Hide header for the login screen if needed
        />
        <Stack.Screen 
          name="Scan" 
          component={Scan} 
          options={{ headerTitle: 'Scan ID' }} // Optional: Customize header
        />
        <Stack.Screen 
          name="LecturerDashboard" 
          component={LecturerDashboard} 
          options={{ headerTitle: 'Lecturer Dashboard' }} // Optional: Customize header
        />
        <Stack.Screen 
          name="AdminDashboard" 
          component={AdminDashboard} 
          options={{ headerTitle: 'Admin Dashboard' }} // Optional: Customize header
        />
        <Stack.Screen 
          name="StudentDashboard" 
          component={StudentDashboard} 
          options={{ headerTitle: 'Student Dashboard' }} // Optional: Customize header
        />
        <Stack.Screen 
          name="Events" 
          component={Events} 
          options={{ headerTitle: 'Events' }} // Optional: Customize header
        />
         <Stack.Screen 
          name="deleteUser" 
          component={deleteUser} 
          options={{ headerTitle: 'deleteuser' }} // Optional: Customize header
        />
         <Stack.Screen 
          name="updateUser" 
          component={updateUser} 
          options={{ headerTitle: 'UpdateUser' }} // Optional: Customize header
        />
         <Stack.Screen 
          name="UpdateAttendance" 
          component={UpdateAttendance} 
          options={{ headerTitle: 'UpdateAttendance' }} // Optional: Customize header
        />
        <Stack.Screen 
          name="Attendance" 
          component={Attendance} 
          options={{ headerTitle: 'Attendance' }} // Optional: Customize header
        />
        <Stack.Screen 
          name="Report" 
          component={Report} 
          options={{ headerTitle: 'Report' }} // Optional: Customize header
        />
        <Stack.Screen 
          name="CreateUser" 
          component={CreateUser} 
          options={{ headerTitle: 'CreateUser' }} // Optional: Customize header
        />
        <Stack.Screen 
          name="Notification" 
          component={Notification} 
          options={{ headerTitle: 'Notifications' }} // Optional: Customize header
        />
        <Stack.Screen 
          name="Missed" 
          component={Missed} 
          options={{ headerTitle: 'Missed' }} // Optional: Customize header
        />
        <Stack.Screen 
          name="Assigned" 
          component={Assigned} 
          options={{ headerTitle: 'Assigned' }} // Optional: Customize header
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Layout;
