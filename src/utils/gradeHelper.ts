import { StudentRank } from '../types/student';

/**
 * Xếp loại sinh viên dựa trên GPA:
 * - GPA >= 8.5: Giỏi
 * - GPA >= 7.0: Khá
 * - GPA >= 5.0: Trung bình
 * - GPA < 5.0: Yếu
 */
export const getStudentRank = (gpa: number): StudentRank => {
  if (gpa >= 8.5) {
    return 'Giỏi';
  }
  if (gpa >= 7.0) {
    return 'Khá';
  }
  if (gpa >= 5.0) {
    return 'Trung bình';
  }
  return 'Yếu';
};

export const getRankColor = (
  rank: StudentRank
): { bg: string; text: string; border: string } => {
  switch (rank) {
    case 'Giỏi':
      return { bg: '#E8F5E9', text: '#2E7D32', border: '#A5D6A7' }; // Green
    case 'Khá':
      return { bg: '#E3F2FD', text: '#1565C0', border: '#90CAF9' }; // Blue
    case 'Trung bình':
      return { bg: '#FFF8E1', text: '#F57F17', border: '#FFE082' }; // Amber/Orange
    case 'Yếu':
      return { bg: '#FFEBEE', text: '#C62828', border: '#EF9A9A' }; // Red
    default:
      return { bg: '#F5F5F5', text: '#616161', border: '#E0E0E0' };
  }
};
