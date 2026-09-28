import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Student } from '../types/student';
import { getStudentRank } from '../utils/gradeHelper';
import { RankBadge } from './RankBadge';

interface StudentCardProps {
  student: Student;
  onPress: () => void;
}

export const StudentCard: React.FC<StudentCardProps> = ({ student, onPress }) => {
  const rank = getStudentRank(student.gpa);

  // Lấy chữ cái đầu của tên làm avatar
  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length > 0) {
      return parts[parts.length - 1].charAt(0).toUpperCase();
    }
    return 'S';
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{getInitials(student.fullName)}</Text>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.name} numberOfLines={1}>
            {student.fullName}
          </Text>
          <RankBadge rank={rank} size="small" />
        </View>

        <View style={styles.detailsRow}>
          <Text style={styles.codeText}>Mã SV: {student.studentCode}</Text>
          <Text style={styles.separator}>•</Text>
          <Text style={styles.classText} numberOfLines={1}>
            Lớp: {student.className}
          </Text>
        </View>

        <View style={styles.gpaRow}>
          <Text style={styles.gpaLabel}>GPA: </Text>
          <Text style={styles.gpaValue}>{student.gpa.toFixed(1)}</Text>
          <Text style={styles.arrowIcon}>›</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    borderWidth: 1,
    borderColor: '#BBDEFB',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1976D2',
  },
  infoContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#212121',
    flex: 1,
    marginRight: 8,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  codeText: {
    fontSize: 13,
    color: '#616161',
    fontWeight: '500',
  },
  separator: {
    marginHorizontal: 6,
    color: '#BDBDBD',
    fontSize: 12,
  },
  classText: {
    fontSize: 13,
    color: '#616161',
    flex: 1,
  },
  gpaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gpaLabel: {
    fontSize: 13,
    color: '#757575',
  },
  gpaValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#D32F2F',
    flex: 1,
  },
  arrowIcon: {
    fontSize: 20,
    color: '#BDBDBD',
    fontWeight: 'bold',
  },
});
