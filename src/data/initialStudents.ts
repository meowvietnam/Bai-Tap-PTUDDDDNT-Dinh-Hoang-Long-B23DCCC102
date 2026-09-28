import { Student } from '../types/student';

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'sv-001',
    studentCode: 'B21DCCN001',
    fullName: 'Nguyễn Văn An',
    birthDate: '15/03/2003',
    gender: 'Nam',
    email: 'an.nguyen@example.com',
    phone: '0912345678',
    className: 'D21CQCN01-N',
    faculty: 'Công nghệ thông tin',
    gpa: 8.8, // Giỏi
  },
  {
    id: 'sv-002',
    studentCode: 'B21DCCN045',
    fullName: 'Trần Thị Mai',
    birthDate: '22/07/2003',
    gender: 'Nữ',
    email: 'mai.tran@example.com',
    phone: '0987654321',
    className: 'D21CQCN02-N',
    faculty: 'Công nghệ thông tin',
    gpa: 7.6, // Khá
  },
  {
    id: 'sv-003',
    studentCode: 'B21DCVT012',
    fullName: 'Lê Hoàng Nam',
    birthDate: '10/11/2003',
    gender: 'Nam',
    email: 'nam.le@example.com',
    phone: '0901234567',
    className: 'D21CQVT01-N',
    faculty: 'Viễn thông',
    gpa: 5.8, // Trung bình
  },
  {
    id: 'sv-004',
    studentCode: 'B21DCMR089',
    fullName: 'Phạm Thu Trang',
    birthDate: '05/09/2003',
    gender: 'Nữ',
    email: 'trang.pham@example.com',
    phone: '0934567890',
    className: 'D21CQMR01-N',
    faculty: 'Marketing',
    gpa: 9.2, // Giỏi
  },
  {
    id: 'sv-005',
    studentCode: 'B21DCKT034',
    fullName: 'Đỗ Tuấn Kiệt',
    birthDate: '18/04/2003',
    gender: 'Nam',
    email: 'kiet.do@example.com',
    phone: '0978901234',
    className: 'D21CQKT01-N',
    faculty: 'Kế toán',
    gpa: 4.2, // Yếu
  },
];
