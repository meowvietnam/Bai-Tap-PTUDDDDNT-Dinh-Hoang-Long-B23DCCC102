import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Student } from '../types/student';
import { INITIAL_STUDENTS } from '../data/initialStudents';

interface StudentContextType {
  students: Student[];
  addStudent: (studentData: Omit<Student, 'id'>) => boolean;
  updateStudent: (student: Student) => boolean;
  deleteStudent: (id: string) => void;
  getStudentById: (id: string) => Student | undefined;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Quản lý danh sách sinh viên bằng useState theo đúng yêu cầu đề bài
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);

  const addStudent = (studentData: Omit<Student, 'id'>): boolean => {
    const newStudent: Student = {
      ...studentData,
      id: Date.now().toString(),
    };
    setStudents((prev) => [newStudent, ...prev]);
    return true;
  };

  const updateStudent = (updatedStudent: Student): boolean => {
    setStudents((prev) =>
      prev.map((s) => (s.id === updatedStudent.id ? updatedStudent : s))
    );
    return true;
  };

  const deleteStudent = (id: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  const getStudentById = (id: string): Student | undefined => {
    return students.find((s) => s.id === id);
  };

  return (
    <StudentContext.Provider
      value={{
        students,
        addStudent,
        updateStudent,
        deleteStudent,
        getStudentById,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudents = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudents must be used within a StudentProvider');
  }
  return context;
};
