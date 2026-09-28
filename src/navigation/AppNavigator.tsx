import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/student';
import { StudentListScreen } from '../screens/StudentListScreen';
import { StudentDetailScreen } from '../screens/StudentDetailScreen';
import { AddStudentScreen } from '../screens/AddStudentScreen';
import { EditStudentScreen } from '../screens/EditStudentScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="StudentList"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1976D2',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: '700',
            fontSize: 18,
          },
          headerTitleAlign: 'center',
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen
          name="StudentList"
          component={StudentListScreen}
          options={{
            title: 'Quản Lý Sinh Viên',
          }}
        />
        <Stack.Screen
          name="StudentDetail"
          component={StudentDetailScreen}
          options={{
            title: 'Chi Tiết Sinh Viên',
          }}
        />
        <Stack.Screen
          name="AddStudent"
          component={AddStudentScreen}
          options={{
            title: 'Thêm Sinh Viên Mới',
          }}
        />
        <Stack.Screen
          name="EditStudent"
          component={EditStudentScreen}
          options={{
            title: 'Chỉnh Sửa Sinh Viên',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
