import { Student } from '../types/student';

export interface FormErrors {
  studentCode?: string;
  fullName?: string;
  birthDate?: string;
  gender?: string;
  email?: string;
  phone?: string;
  className?: string;
  faculty?: string;
  gpa?: string;
}

export const validateStudentForm = (
  data: {
    studentCode: string;
    fullName: string;
    birthDate: string;
    gender: string;
    email: string;
    phone: string;
    className: string;
    faculty: string;
    gpa: string;
  },
  existingStudents: Student[],
  currentStudentId?: string
): { isValid: boolean; errors: FormErrors } => {
  const errors: FormErrors = {};

  // Mã sinh viên
  if (!data.studentCode.trim()) {
    errors.studentCode = 'Mã sinh viên không được để trống';
  } else {
    const isDuplicate = existingStudents.some(
      (s) =>
        s.studentCode.trim().toLowerCase() === data.studentCode.trim().toLowerCase() &&
        s.id !== currentStudentId
    );
    if (isDuplicate) {
      errors.studentCode = 'Mã sinh viên đã tồn tại trong hệ thống';
    }
  }

  // Họ và tên
  if (!data.fullName.trim()) {
    errors.fullName = 'Họ tên không được để trống';
  } else if (data.fullName.trim().length < 2) {
    errors.fullName = 'Họ tên phải có ít nhất 2 ký tự';
  }

  // Ngày sinh
  if (!data.birthDate.trim()) {
    errors.birthDate = 'Ngày sinh không được để trống';
  }

  // Giới tính
  if (!data.gender.trim()) {
    errors.gender = 'Vui lòng chọn giới tính';
  }

  // Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email.trim()) {
    errors.email = 'Email không được để trống';
  } else if (!emailRegex.test(data.email.trim())) {
    errors.email = 'Email không đúng định dạng (VD: example@domain.com)';
  }

  // Số điện thoại
  const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
  if (!data.phone.trim()) {
    errors.phone = 'Số điện thoại không được để trống';
  } else if (!phoneRegex.test(data.phone.trim().replace(/\s/g, ''))) {
    errors.phone = 'Số điện thoại không hợp lệ (gồm 10 số, bắt đầu bằng 03, 05, 07, 08, 09)';
  }

  // Lớp
  if (!data.className.trim()) {
    errors.className = 'Lớp không được để trống';
  }

  // Khoa
  if (!data.faculty.trim()) {
    errors.faculty = 'Khoa không được để trống';
  }

  // GPA
  if (!data.gpa.trim()) {
    errors.gpa = 'Điểm GPA không được để trống';
  } else {
    const gpaNum = parseFloat(data.gpa);
    if (isNaN(gpaNum)) {
      errors.gpa = 'Điểm GPA phải là một số';
    } else if (gpaNum < 0 || gpaNum > 10) {
      errors.gpa = 'Điểm GPA phải nằm trong khoảng từ 0.0 đến 10.0';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
