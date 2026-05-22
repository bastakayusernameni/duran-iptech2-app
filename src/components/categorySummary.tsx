import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { CATEGORIES, CATEGORY_ICONS } from '../types/expense';
import { styles } from './appstyle';

type CategorySummaryProps = {
  categoryTotals: Record<string, number>;
};

export default function CategorySummary({ categoryTotals }: CategorySummaryProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.categoryScrollRow}
    >
      {CATEGORIES.map((cat) => (
        <View key={cat} style={styles.categoryChip}>
          <Text style={styles.categoryChipIcon}>{CATEGORY_ICONS[cat]}</Text>
          <Text style={styles.categoryChipLabel}>{cat}</Text>
          <Text style={styles.categoryChipAmount}>
            ₱{(categoryTotals[cat] || 0).toFixed(0)}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}