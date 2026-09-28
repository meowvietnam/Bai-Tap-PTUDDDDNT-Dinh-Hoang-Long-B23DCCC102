import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/student';
import { useStudents } from '../context/StudentContext';
import { getStudentRank } from '../utils/gradeHelper';
import { RankBadge } from '../components/RankBadge';
import { InfoRow } from '../components/InfoRow';
import { CustomButton } from '../components/CustomButton';

type Props = NativeStackScreenProps<RootStackParamList, 'StudentDetail'>;

export const StudentDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { studentId } = route.params;
  const { getStudentById, deleteStudent } = useStudents();

  const student = getStudentById(studentId);

  if (!student) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundIcon}>⚠️</Text>
        <Text style={styles.notFoundText}>Không tìm thấy thông tin sinh viên</Text>
        <CustomButton
          title="Quay lại danh sách"
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        />
      </View>
    );
  }

  const rank = getStudentRank(student.gpa);

  const handleDelete = () => {
    Alert.alert(
      'Xác nhận xóa',
      `Bạn có chắc chắn muốn xóa sinh viên "${student.fullName}" (Mã: ${student.studentCode}) không?`,
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: () => {
            deleteStudent(student.id);
            Alert.alert('Thành công', 'Đã xóa sinh viên khỏi danh sách', [
              {
                text: 'OK',
                onPress: () => navigation.goBack(),
              },
            ]);
          },
        },
      ]
    );
  };

  const handleEdit = () => {
    navigation.navigate('EditStudent', { studentId: student.id });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {student.fullName.trim().split(' ').slice(-1)[0]?.charAt(0).toUpperCase()}
          </Text>
        </View>
        <Text style={styles.fullName}>{student.fullName}</Text>
        <Text style={styles.codeText}>Mã sinh viên: {student.studentCode}</Text>
        <View style={styles.rankWrapper}>
          <RankBadge rank={rank} size="medium" />
        </View>
      </View>

      {/* Thông tin học tập */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Thông tin học tập</Text>
        <InfoRow icon="🏫" label="Khoa" value={student.faculty} />
        <InfoRow icon="👥" label="Lớp" value={student.className} />
        <InfoRow icon="📊" label="Điểm GPA" value={student.gpa.toFixed(2)} />
        <InfoRow icon="🎖️" label="Xếp loại học lực" value={rank} isLast />
      </View>

      {/* Thông tin cá nhân */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Thông tin cá nhân & Liên hệ</Text>
        <InfoRow icon="🎂" label="Ngày sinh" value={student.birthDate} />
        <InfoRow icon="⚧" label="Giới tính" value={student.gender} />
        <InfoRow icon="✉️" label="Email" value={student.email} />
        <InfoRow icon="📞" label="Số điện thoại" value={student.phone} isLast />
      </View>

      {/* Hành động Chỉnh sửa và Xóa */}
      <View style={styles.actionContainer}>
        <CustomButton
          title="Chỉnh sửa thông tin"
          onPress={handleEdit}
          variant="primary"
          style={styles.actionBtn}
        />
        <CustomButton
          title="Xóa sinh viên"
          onPress={handleDelete}
          variant="danger"
          style={styles.actionBtn}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  content: {
    padding: 16,
    paddingBottom: 36,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#F5F7FA',
  },
  notFoundIcon: {
    fontSize: 50,
    marginBottom: 12,
  },
  notFoundText: {
    fontSize: 16,
    color: '#616161',
    marginBottom: 20,
  },
  backBtn: {
    minWidth: 180,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#1976D2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  fullName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#212121',
    marginBottom: 4,
  },
  codeText: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 10,
  },
  rankWrapper: {
    marginTop: 2,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1976D2',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  actionContainer: {
    gap: 12,
    marginTop: 8,
  },
  actionBtn: {
    width: '100%',
  },
});
