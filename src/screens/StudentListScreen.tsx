import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Student } from '../types/student';
import { useStudents } from '../context/StudentContext';
import { StudentCard } from '../components/StudentCard';

type Props = NativeStackScreenProps<RootStackParamList, 'StudentList'>;

export const StudentListScreen: React.FC<Props> = ({ navigation }) => {
  const { students } = useStudents();
  const [searchQuery, setSearchQuery] = useState('');

  // Lọc sinh viên theo mã sinh viên hoặc họ tên (không phân biệt chữ hoa, chữ thường)
  const filteredStudents = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return students;
    }
    return students.filter(
      (s) =>
        s.studentCode.toLowerCase().includes(query) ||
        s.fullName.toLowerCase().includes(query)
    );
  }, [students, searchQuery]);

  const renderItem = ({ item }: { item: Student }) => (
    <StudentCard
      student={item}
      onPress={() =>
        navigation.navigate('StudentDetail', { studentId: item.id })
      }
    />
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🔍</Text>
      <Text style={styles.emptyTitle}>Không tìm thấy sinh viên nào</Text>
      <Text style={styles.emptySubtitle}>
        {searchQuery
          ? `Không có kết quả nào khớp với "${searchQuery}"`
          : 'Hiện tại chưa có sinh viên nào trong danh sách'}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔎</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm theo mã SV hoặc họ tên..."
            placeholderTextColor="#9E9E9E"
            value={searchQuery}
            onChangeText={setSearchQuery}
            clearButtonMode="while-editing"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery('')}
              style={styles.clearSearchBtn}
            >
              <Text style={styles.clearSearchText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Thanh đếm số lượng */}
        <View style={styles.counterRow}>
          <Text style={styles.counterText}>
            Hiển thị:{' '}
            <Text style={styles.counterBold}>
              {filteredStudents.length} / {students.length} sinh viên
            </Text>
          </Text>
        </View>
      </View>

      {/* Danh sách sinh viên bằng FlatList theo yêu cầu đề bài */}
      <FlatList
        data={filteredStudents}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyComponent}
        showsVerticalScrollIndicator={false}
      />

      {/* Nút Floating Action Button để thêm sinh viên mới */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddStudent')}
        activeOpacity={0.85}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  searchSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F2F5',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#212121',
    paddingVertical: 0,
  },
  clearSearchBtn: {
    padding: 4,
  },
  clearSearchText: {
    fontSize: 14,
    color: '#757575',
    fontWeight: 'bold',
  },
  counterRow: {
    marginTop: 8,
    paddingHorizontal: 4,
  },
  counterText: {
    fontSize: 12,
    color: '#757575',
  },
  counterBold: {
    fontWeight: '700',
    color: '#1976D2',
  },
  listContent: {
    padding: 16,
    paddingBottom: 90, // tránh che khuất bởi nút FAB
  },
  emptyContainer: {
    paddingTop: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#424242',
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#9E9E9E',
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#1976D2',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  fabIcon: {
    fontSize: 32,
    color: '#FFFFFF',
    marginTop: -2,
    fontWeight: '300',
  },
});
