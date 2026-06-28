import React from 'react';
import { ScrollView, View, Text } from 'react-native';

import { CATEGORIES, CATEGORY_ICONS } from '../types/expense';
import { useTheme } from '../context/themeContext';

type CategorySummaryProps = {
  categoryTotals: Record<string, number>;
};

export default function CategorySummary({ categoryTotals }: CategorySummaryProps) {
  const { styles } = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.categoryScrollRow}
    >
      {CATEGORIES.map((category) => (
        <View key={category} style={styles.categoryChip}>
          <Text style={styles.categoryChipIcon}>{CATEGORY_ICONS[category]}</Text>
          <Text style={styles.categoryChipLabel}>{category}</Text>
          <Text style={styles.categoryChipAmount}>
            ₱{(categoryTotals[category] || 0).toFixed(0)}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}