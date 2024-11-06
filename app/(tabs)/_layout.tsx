import { Tabs } from 'expo-router';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
     <Tabs.Screen
     name="index"
     options={{
        tabBarLabel: "Attendance",
        tabBarIcon: ({color})=>(
            <Ionicons name="school" 
            size={24} color={color} />
        ),
     }}
     />
      <Tabs.Screen
     name="LecturerDashboard"
     options={{
        tabBarLabel: "Dashboard",
        tabBarIcon: ({color})=>(
            <MaterialIcons name="dashboard" size={24} color={color} />
        ),
     }}
     />
    </Tabs>
  );
}