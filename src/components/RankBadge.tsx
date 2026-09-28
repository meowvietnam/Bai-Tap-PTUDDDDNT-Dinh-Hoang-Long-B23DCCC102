import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StudentRank } from '../types/student';
import { getRankColor } from '../utils/gradeHelper';

interface RankBadgeProps {
  rank: StudentRank;
  size?: 'small' | 'medium' | 'large';
}

export const RankBadge: React.FC<RankBadgeProps> = ({ rank, size = 'small' }) => {
  const colors = getRankColor(rank);

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: colors.bg, borderColor: colors.border },
        size === 'medium' && styles.badgeMedium,
        size === 'large' && styles.badgeLarge,
      ]}
    >
      <Text
        style={[
          styles.text,
          { color: colors.text },
          size === 'medium' && styles.textMedium,
          size === 'large' && styles.textLarge,
        ]}
      >
        {rank}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  badgeMedium: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
  },
  badgeLarge: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 10,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
  textMedium: {
    fontSize: 14,
    fontWeight: '700',
  },
  textLarge: {
    fontSize: 16,
    fontWeight: '700',
  },
});
