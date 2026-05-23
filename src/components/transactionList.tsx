import React from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  Category,
  CATEGORIES,
  CATEGORY_ICONS,
  Expense,
} from '../types/expense';

import { useTheme } from '../context/themeContext';

type TransactionListProps = {
  filteredExpenses: Expense[];
  filterCategory: Category | 'All';
  setFilterCategory: (value: Category | 'All') => void;
};

export default function TransactionList({
  filteredExpenses,
  filterCategory,
  setFilterCategory,
}: TransactionListProps) {
  const { styles } = useTheme();

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Transactions</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 12 }}
      >
        {(['All', ...CATEGORIES] as (Category | 'All')[]).map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.filterTab,
              filterCategory === category && styles.filterTabActive,
            ]}
            onPress={() => setFilterCategory(category)}
          >
            <Text
              style={[
                styles.filterTabText,
                filterCategory === category && styles.filterTabTextActive,
              ]}
            >
              {category === 'All'
                ? '🗂 All'
                : `${CATEGORY_ICONS[category]} ${category}`}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {filteredExpenses.length === 0 ? (
        <Text style={styles.emptyText}>No expenses here yet.</Text>
      ) : (
        <FlatList
          data={filteredExpenses}
          scrollEnabled={false}
          nestedScrollEnabled
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.expenseItem}>
              <View style={styles.expenseCategoryDot}>
                <Text style={{ fontSize: 18 }}>
                  {CATEGORY_ICONS[item.category]}
                </Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.expenseDescription}>{item.description}</Text>
                <Text style={styles.expenseDate}>
                  {item.category} · {item.date.toLocaleDateString()}
                </Text>
              </View>

              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.amountText}>
                  ₱{item.amount.toFixed(2)}
                </Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}