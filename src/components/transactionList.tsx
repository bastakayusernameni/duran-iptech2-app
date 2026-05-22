import React from 'react';
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Category, CATEGORIES, CATEGORY_ICONS, Expense } from '../types/expense';
import { styles } from './appstyle';

type TransactionListProps = {
  filteredExpenses: Expense[];
  filterCategory: Category | 'All';
  setFilterCategory: (value: Category | 'All') => void;
  deleteExpense: (id: string) => void;
  deletingId: string | null;
};

export default function TransactionList({
  filteredExpenses,
  filterCategory,
  setFilterCategory,
  deleteExpense,
  deletingId,
}: TransactionListProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Transactions</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 12 }}>
        {(['All', ...CATEGORIES] as (Category | 'All')[]).map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.filterTab, filterCategory === cat && styles.filterTabActive]}
            onPress={() => setFilterCategory(cat)}
          >
            <Text
              style={[
                styles.filterTabText,
                filterCategory === cat && styles.filterTabTextActive,
              ]}
            >
              {cat === 'All' ? '🗂 All' : `${CATEGORY_ICONS[cat]} ${cat}`}
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
          renderItem={({ item }) => {
            const isDeleting = deletingId === item.id;

            return (
              <View style={styles.expenseItem}>
                <View style={styles.expenseCategoryDot}>
                  <Text style={{ fontSize: 18 }}>{CATEGORY_ICONS[item.category]}</Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.expenseDescription}>{item.description}</Text>
                  <Text style={styles.expenseDate}>
                    {item.category} · {item.date.toLocaleDateString()}
                  </Text>
                </View>

                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.amountText}>₱{item.amount.toFixed(2)}</Text>

                  <TouchableOpacity
                    onPress={() => deleteExpense(item.id)}
                    disabled={isDeleting}
                    style={[styles.deleteBtn, isDeleting && styles.deleteBtnDisabled]}
                  >
                    <Text
                      style={[
                        styles.deleteText,
                        isDeleting && styles.deleteTextDeleting,
                      ]}
                    >
                      {isDeleting ? 'Deleting...' : 'Delete'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}