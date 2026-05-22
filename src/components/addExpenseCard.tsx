import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Category, CATEGORIES, CATEGORY_ICONS } from '../types/expense';
import { styles } from './appstyle';

type AddExpenseCardProps = {
  description: string;
  setDescription: (value: string) => void;
  amount: string;
  setAmount: (value: string) => void;
  selectedCategory: Category;
  setSelectedCategory: (value: Category) => void;
  addExpense: () => void;
  isAdding: boolean;
  addError: string;
  setAddError: (value: string) => void;
  addSuccess: boolean;
};

export default function AddExpenseCard({
  description,
  setDescription,
  amount,
  setAmount,
  selectedCategory,
  setSelectedCategory,
  addExpense,
  isAdding,
  addError,
  setAddError,
  addSuccess,
}: AddExpenseCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Add Expense</Text>

      <TextInput
        placeholder="Description"
        placeholderTextColor="#6B7FA3"
        value={description}
        onChangeText={(text) => {
          setDescription(text);
          setAddError('');
        }}
        style={styles.input}
      />

      <TextInput
        placeholder="Amount (₱)"
        placeholderTextColor="#6B7FA3"
        keyboardType="decimal-pad"
        value={amount}
        onChangeText={(text) => {
          const cleaned = text.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
          setAmount(cleaned);
          setAddError('');
        }}
        style={styles.input}
      />

      <Text style={styles.pickerLabel}>Category</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 14 }}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryPill,
              selectedCategory === cat && styles.categoryPillActive,
            ]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text
              style={[
                styles.categoryPillText,
                selectedCategory === cat && styles.categoryPillTextActive,
              ]}
            >
              {CATEGORY_ICONS[cat]} {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {addError ? (
        <View style={styles.formErrorBox}>
          <Text style={styles.formErrorText}>⚠ {addError}</Text>
        </View>
      ) : null}

      {addSuccess ? (
        <View style={styles.formSuccessBox}>
          <Text style={styles.formSuccessText}>✓ Expense added successfully!</Text>
        </View>
      ) : null}

      <TouchableOpacity
        style={[styles.addButton, isAdding && styles.addButtonDisabled]}
        onPress={addExpense}
        disabled={isAdding}
      >
        <Text style={styles.addButtonText}>
          {isAdding ? 'Saving...' : '+ Add Expense'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}