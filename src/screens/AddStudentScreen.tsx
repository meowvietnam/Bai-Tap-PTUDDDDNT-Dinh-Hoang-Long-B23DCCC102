import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/student';
import { useStudents } from '../context/StudentContext';
import { CustomInput } from '../components/CustomInput';
import { CustomButton } from '../components/CustomButton';
import { validateStudentForm, FormErrors } from '../utils/validation';

type Props = NativeStackScreenProps<RootStackParamList, 'AddStudent'>;

export const AddStudentScreen: React.FC<Props> = ({ navigation }) => {
  const { students, addStudent } = useStudents();

  // Form states
  const [studentCode, setStudentCode] = useState('');
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState<'Nam' | 'Nữ' | 'Khác'>('Nam');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [className, setClassName] = useState('');
  const [faculty, setFaculty] = useState('');
  const [gpa, setGpa] = useState('');

  // Errors state
  const [errors, setErrors] = useState<FormErrors>({});

  const handleGenderSelect = (selected: 'Nam' | 'Nữ' | 'Khác') => {
    setGender(selected);
    if (errors.gender) {
      setErrors((prev) => ({ ...prev, gender: undefined }));
    }
  };

  const handleSubmit = () => {
    const formData = {
      studentCode,
      fullName,
      birthDate,
      gender,
      email,
      phone,
      className,
      faculty,
      gpa,
    };

    // Kiểm tra dữ liệu hợp lệ theo yêu cầu
    const { isValid, errors: validationErrors } = validateStudentForm(
      formData,
      students
    );

    if (!isValid) {
      setErrors(validationErrors);
      Alert.alert('Lỗi nhập liệu', 'Vui lòng kiểm tra lại các trường thông tin');
      return;
    }

    // Thêm sinh viên vào danh sách
    addStudent({
      studentCode: studentCode.trim().toUpperCase(),
      fullName: fullName.trim(),
      birthDate: birthDate.trim(),
      gender,
      email: email.trim(),
      phone: phone.trim(),
      className: className.trim(),
      faculty: faculty.trim(),
      gpa: parseFloat(gpa.trim()),
    });

    Alert.alert('Thành công', 'Thêm sinh viên mới thành công!', [
      {
        text: 'OK',
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.keyboardContainer}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Nhập thông tin sinh viên</Text>
        <Text style={styles.subtitle}>
          Vui lòng điền đầy đủ các thông tin có dấu (*) bên dưới
        </Text>

        <CustomInput
          label="Mã sinh viên"
          required
          placeholder="Ví dụ: B21DCCN001"
          value={studentCode}
          onChangeText={(val) => {
            setStudentCode(val);
            if (errors.studentCode) {
              setErrors((prev) => ({ ...prev, studentCode: undefined }));
            }
          }}
          autoCapitalize="characters"
          error={errors.studentCode}
        />

        <CustomInput
          label="Họ và tên"
          required
          placeholder="Ví dụ: Nguyễn Văn A"
          value={fullName}
          onChangeText={(val) => {
            setFullName(val);
            if (errors.fullName) {
              setErrors((prev) => ({ ...prev, fullName: undefined }));
            }
          }}
          error={errors.fullName}
        />

        <CustomInput
          label="Ngày sinh"
          required
          placeholder="Ví dụ: 15/03/2003"
          value={birthDate}
          onChangeText={(val) => {
            setBirthDate(val);
            if (errors.birthDate) {
              setErrors((prev) => ({ ...prev, birthDate: undefined }));
            }
          }}
          error={errors.birthDate}
        />

        {/* Giới tính */}
        <View style={styles.genderSection}>
          <View style={styles.genderLabelRow}>
            <Text style={styles.label}>Giới tính</Text>
            <Text style={styles.requiredAsterisk}> *</Text>
          </View>
          <View style={styles.genderOptions}>
            {(['Nam', 'Nữ', 'Khác'] as const).map((g) => (
              <TouchableOpacity
                key={g}
                style={[
                  styles.genderOptionBtn,
                  gender === g && styles.genderOptionSelected,
                ]}
                onPress={() => handleGenderSelect(g)}
              >
                <Text
                  style={[
                    styles.genderOptionText,
                    gender === g && styles.genderOptionTextSelected,
                  ]}
                >
                  {g}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {!!errors.gender && (
            <Text style={styles.errorText}>{errors.gender}</Text>
          )}
        </View>

        <CustomInput
          label="Email"
          required
          placeholder="Ví dụ: nva@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(val) => {
            setEmail(val);
            if (errors.email) {
              setErrors((prev) => ({ ...prev, email: undefined }));
            }
          }}
          error={errors.email}
        />

        <CustomInput
          label="Số điện thoại"
          required
          placeholder="Ví dụ: 0912345678"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={(val) => {
            setPhone(val);
            if (errors.phone) {
              setErrors((prev) => ({ ...prev, phone: undefined }));
            }
          }}
          error={errors.phone}
        />

        <CustomInput
          label="Lớp"
          required
          placeholder="Ví dụ: D21CQCN01-N"
          value={className}
          onChangeText={(val) => {
            setClassName(val);
            if (errors.className) {
              setErrors((prev) => ({ ...prev, className: undefined }));
            }
          }}
          error={errors.className}
        />

        <CustomInput
          label="Khoa"
          required
          placeholder="Ví dụ: Công nghệ thông tin"
          value={faculty}
          onChangeText={(val) => {
            setFaculty(val);
            if (errors.faculty) {
              setErrors((prev) => ({ ...prev, faculty: undefined }));
            }
          }}
          error={errors.faculty}
        />

        <CustomInput
          label="Điểm GPA (Thang điểm 10)"
          required
          placeholder="Ví dụ: 8.5"
          keyboardType="decimal-pad"
          value={gpa}
          onChangeText={(val) => {
            setGpa(val);
            if (errors.gpa) {
              setErrors((prev) => ({ ...prev, gpa: undefined }));
            }
          }}
          helperText="Thang điểm từ 0.0 đến 10.0"
          error={errors.gpa}
        />

        <View style={styles.submitContainer}>
          <CustomButton
            title="Lưu sinh viên"
            onPress={handleSubmit}
            variant="primary"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212121',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#757575',
    marginBottom: 16,
  },
  genderSection: {
    marginBottom: 16,
  },
  genderLabelRow: {
    flexDirection: 'row',
    marginBottom: 6,
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
  },
  requiredAsterisk: {
    color: '#D32F2F',
    fontSize: 14,
    fontWeight: '700',
  },
  genderOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  genderOptionBtn: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  genderOptionSelected: {
    borderColor: '#1976D2',
    backgroundColor: '#E3F2FD',
  },
  genderOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#616161',
  },
  genderOptionTextSelected: {
    color: '#1976D2',
    fontWeight: '700',
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 2,
  },
  submitContainer: {
    marginTop: 12,
  },
});
