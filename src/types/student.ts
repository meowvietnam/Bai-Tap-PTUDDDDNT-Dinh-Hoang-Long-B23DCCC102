export interface Student {
  id: string; // unique id (hoặc dùng studentCode)
  studentCode: string; // Mã sinh viên
  fullName: string; // Họ và tên
  birthDate: string; // Ngày sinh
  gender: 'Nam' | 'Nữ' | 'Khác'; // Giới tính
  email: string; // Email
  phone: string; // Số điện thoại
  className: string; // Lớp
  faculty: string; // Khoa
  gpa: number; // Điểm GPA (0 - 10)
}

export type StudentRank = 'Giỏi' | 'Khá' | 'Trung bình' | 'Yếu';

export type RootStackParamList = {
  StudentList: undefined;
  StudentDetail: { studentId: string };
  AddStudent: undefined;
  EditStudent: { studentId: string };
};
