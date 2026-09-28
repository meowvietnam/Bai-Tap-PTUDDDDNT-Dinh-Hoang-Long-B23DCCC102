import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface InfoRowProps {
  label: string;
  value: string;
  icon?: string;
  isLast?: boolean;
}

export const InfoRow: React.FC<InfoRowProps> = ({
  label,
  value,
  icon,
  isLast = false,
}) => {
  return (
    <View style={[styles.row, !isLast && styles.borderBottom]}>
      <View style={styles.labelContainer}>
        {icon && <Text style={styles.icon}>{icon}</Text>}
        <Text style={styles.label}>{label}</Text>
      </View>
      <Text style={styles.value} selectable>
        {value || '---'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 10,
  },
  icon: {
    fontSize: 16,
    marginRight: 8,
  },
  label: {
    fontSize: 14,
    color: '#616161',
    fontWeight: '500',
  },
  value: {
    fontSize: 15,
    color: '#212121',
    fontWeight: '600',
    textAlign: 'right',
    flex: 1.2,
  },
});
